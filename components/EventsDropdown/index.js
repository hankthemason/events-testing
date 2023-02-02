import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styles from "./EventsDropdown.module.scss";

const EventsDropdown = ({
  handleFilterSelection,
  menuItems,
  currentEventSelection,
}) => {
  return (
    <Box
      className={styles.dropdownContainer}
      sx={{ minWidth: 120, maxWidth: 150 }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Event Type</InputLabel>
        <Select
          //labelId="demo-simple-select-label"
          value={currentEventSelection}
          label="event-selection"
          onChange={(event) => handleFilterSelection(event.target.value)}
          //sx={{ height: 20 }}
          className={styles.muiSelect}
        >
          {menuItems.map((menuItem) => (
            <MenuItem value={menuItem} key={menuItem}>
              {menuItem}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default EventsDropdown;
