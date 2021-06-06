import React, { useState } from "react";
import { Dropdown, DropdownButton, Row, Col } from "react-bootstrap";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { FormControl, NativeSelect, InputBase } from "@material-ui/core";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

const TimeForm = ({ setTime, setMods, setDisplaySearchResults }) => {
  //time = tentativeTime, setTime = setTentative time
  return (
    <div className="btn-group" id="TimeForm">
      <YearandSemForm
        setTime={setTime}
        setMods={setMods}
        setDisplaySearchResults={setDisplaySearchResults}
      />
    </div>
  );
};

const YearandSemForm = ({ setTime, setMods, setDisplaySearchResults }) => {
  const [title, setTitle] = useState("Sem 1 2020/21");
  const classes = useStyles();

  const handleChange = (event) => {
    setMods([]);
    setDisplaySearchResults(false);
    const time = event.target.value;
    setTitle(time);
    const sem = Number(time.charAt(4));
    const year = Number(time.substring(6, 10));
    if (sem === 1) {
      const yearEnd = year + 1; //ie if 2020, then 2021 so 2020-2021
      const yearRange = year.toString() + "-" + yearEnd.toString();
      setTime({
        year: yearRange,
        sem: sem.toString(),
      });
    }

    if (sem == 2) {
      const yearStart = year - 1; //ie if 2020, then 2019 so 2019-2020
      const yearRange = yearStart.toString() + "-" + year.toString();
      setTime({
        year: yearRange,
        sem: sem.toString(),
      });
    }
  };

  return (
    <div>
      <FormControl className={classes.margin}>
        <NativeSelect
          id="demo-customized-select-native"
          value={title}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <InputLabel>{title}</InputLabel>
          <option aria-label="None" value="" />
          <option value={"Sem 1 2020/21"}>Sem 1 2020/21</option>
          <option value={"Sem 2 2020/21"}>Sem 2 2020/21</option>
          <option value={"Sem 1 2019/20"}>Sem 1 2019/20</option>
          <option value={"Sem 2 2019/20"}>Sem 2 2019/20</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default TimeForm;
