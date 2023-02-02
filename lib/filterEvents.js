const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { isCurrent } = require("./dateUtilities");

// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import { isCurrent } from "./dateUtilities";

const pastEventsDirectory = path.join(process.cwd(), "events/past");
const currentEventsDirectory = path.join(process.cwd(), "events/current");

//check all current events; if they are no longer current, move them into "past" folder
const filterCurrentEvents = () => {
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

  //sort each events' dates in ascending order
  allEventsData.forEach((event) => {
    event.dates = event.dates.sort();
  });

  //look at the last date for each event in 'current' folder
  //if it's not current, move it to the 'past' folder
  allEventsData.forEach((event) => {
    if (!isCurrent(event.dates[event.dates.length - 1])) {
      const oldPath = path.join(currentEventsDirectory, `${event.id}.md`);
      const newPath = path.join(pastEventsDirectory, `${event.id}.md`);

      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log("Rename complete!");
      });
    }
  });

  console.log("Events have been filtered!");
};
