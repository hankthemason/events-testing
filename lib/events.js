import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import moment from "moment";
import { isCurrent } from "./dateUtilities";

const currentEventsDirectory = path.join(process.cwd(), "events/current");
const pastEventsDirectory = path.join(process.cwd(), "events/past");

const getEventDataFromDirectory = (directory) => {
  const fileNames = fs.readdirSync(directory);
  const data = fileNames.map((fileName) => {
    //remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    //read markdown file as string
    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    //use grey0matter to parse the metadata section
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });
  return data;
};

export const getSortedEvents = (filter = "all", limit = null) => {
  let allEventsData;
  if (filter === "all") {
    allEventsData = [
      ...getEventDataFromDirectory(currentEventsDirectory),
      ...getEventDataFromDirectory(pastEventsDirectory),
    ];
  } else if (filter === "current") {
    allEventsData = [...getEventDataFromDirectory(currentEventsDirectory)];
  } else if (filter === "past") {
    allEventsData = [...getEventDataFromDirectory(pastEventsDirectory)];
  }

  //sort each events' dates in ascending order
  allEventsData.forEach((event) => {
    event.dates = event.dates.sort();
  });
  //sort all events by date
  if (filter === "all") {
    allEventsData = allEventsData.sort((a, b) => {
      if (a.dates[0] < b.dates[0]) {
        return -1;
      } else {
        return 1;
      }
    });
  } else if (filter === "current") {
    allEventsData = allEventsData
      .sort((a, b) => {
        if (a.dates[0] < b.dates[0]) {
          return -1;
        } else {
          return 1;
        }
      })
      .filter((event) => {
        return isCurrent(event.dates[event.dates.length - 1]);
      });
  } else {
    // past events
    allEventsData = allEventsData
      .sort((a, b) => {
        if (a.dates[0] < b.dates[0]) {
          return -1;
        } else {
          return 1;
        }
      })
      .filter((event) => {
        return !isCurrent(event.dates[0]);
      });
  }

  //truncate the list if there is a limit
  if (limit) {
    allEventsData = allEventsData.slice(0, limit);
  }

  return allEventsData;
};

export const getAllEventIds = () => {
  const currentEventNames = fs
    .readdirSync(currentEventsDirectory)
    .map((fileName) => {
      return {
        fileName: fileName,
        isCurrent: true,
      };
    });
  const pastEventNames = fs.readdirSync(pastEventsDirectory).map((fileName) => {
    return {
      fileName: fileName,
      isCurrent: false,
    };
  });
  const allEvents = [...currentEventNames, ...pastEventNames];
  return allEvents.map((eventObj) => {
    return {
      params: {
        id: eventObj.fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getCurrentEventIds = () => {
  const currentEventNames = fs.readdirSync(currentEventsDirectory);

  return currentEventNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getPastEventIds = () => {
  const pastEventNames = fs.readdirSync(pastEventsDirectory);

  return pastEventNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getEventData = async (id, current = true) => {
  const directory = current ? currentEventsDirectory : pastEventsDirectory;
  const fullPath = path.join(directory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
};

//get the events which occur closest to "today"
export const getNextEvents = (filter = "all", limit = null) => {
  const fileNames = fs.readdirSync(currentEventsDirectory);
  let allEventsData = fileNames.map((fileName) => {
    //remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    //read markdown file as string
    const fullPath = path.join(currentEventsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    //use grey matter to parse the metadata section
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  let eventsBySortedDates = {};
  allEventsData.forEach((event) => {
    event.dates.forEach((date) => {
      if (isCurrent(date)) {
        if (eventsBySortedDates[date]) {
          eventsBySortedDates[date].push(event);
        } else {
          eventsBySortedDates[date] = [event];
        }
      }
    });
  });

  const sortedDates = Object.entries(eventsBySortedDates).sort((a, b) => {
    if (moment(a[0]) < moment(b[0])) {
      return -1;
    } else {
      return 1;
    }
  });

  //num === limit
  let nextNumEvents = [];
  let index = 0;

  while (nextNumEvents.length < limit) {
    const eventsOnDate = sortedDates[index][1];
    eventsOnDate.forEach((event) => {
      if (!nextNumEvents.includes(event)) {
        nextNumEvents.push(event);
      }
      index++;
    });
  }
  return nextNumEvents;
};
