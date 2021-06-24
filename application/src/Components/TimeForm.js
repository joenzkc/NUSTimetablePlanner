import React, { useState } from "react";
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

const TimeForm = ({ setTime, restart }) => {
  //time = tentativeTime, setTime = setTentative time
  return (
    <div className="btn-group" id="TimeForm">
      <YearandSemForm setTime={setTime} restart={restart} />
    </div>
  );
};

const YearandSemForm = ({ setTime, restart }) => {
  const [title, setTitle] = useState("Sem 1 2021/22");
  const classes = useStyles();

  const handleChange = (event) => {
    restart();
    const time = event.target.value;
    setTitle(time);
    const sem = Number(time.charAt(4));
    const year = Number(time.substring(6, 10));
    const finalYear = Number("20" + time.substring(11, 13));
    setTime({
      year: year.toString() + "-" + finalYear.toString(),
      sem: sem.toString(),
    });
  };

  const cYear = new Date().getUTCFullYear();
  // const cMonth = new Date().getMonth();
  const cMonth = 11;
  const earliestYear = 2019;

  const yearStore = [];
  for (let i = earliestYear; i < cYear; i++) {
    yearStore.push("Sem 1 " + i + "/" + ((i + 1) % 100).toString());
    yearStore.push("Sem 2 " + i + "/" + ((i + 1) % 100).toString());
  }

  if (cMonth > 6) {
    yearStore.push("Sem 1 " + cYear + "/" + ((cYear + 1) % 100).toString());
  }

  if (cMonth > 11) {
    yearStore.push("Sem 2 " + cYear + "/" + ((cYear + 1) % 100).toString());
  }

  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel>{title}</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={title}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          {yearStore.map((x) => (
            <option value={x} key={x}>{x}</option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default TimeForm;
