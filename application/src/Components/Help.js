import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Card,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    width: "100%",
    marginRight: theme.spacing(10),
  },
  text: {
    marginRight: theme.spacing(7),
  },
  subtitle: {
    color: "#7c898e",
    marginRight: theme.spacing(7),
  },
  details: {
    fontWeight: theme.typography.fontWeightLight,
  },
  headers: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const Help = () => {
  const classes = useStyles();
  return (
    <Card>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h2" align="center" className={classes.text}>
            How can we help you?
          </Typography>
          <Typography variant="h4" align="center" className={classes.subtitle}>
            Choose a category
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.root}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5" className={classes.headers}>
                What is this application for?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.details}>
                This application is meant to be a simple to use platform for NUS
                students to plan their timetables.
                <br />
                <br />
                At the start of every semester, because we are given the liberty
                to pick our mods and classes, we find the need to "perfect" our
                timetables. We want everything to be optimised, e.g. avoid early
                classes, end as early as possible, have free days etc. But due
                to the sheer amount of classes available to us, sometimes we
                find it difficult decide which classes are optimal. As a
                students, we find this module registration process extremely
                stressful, listing out all the different possible classes we can
                take and write it on a sticky note.
                <br />
                <br />
                As such, this application serves as a tool to help students
                "perfect" their timetables. Simply add in whatever constraints
                they need, and with the click of a button, one possibility will
                be provided for them. If this generated timetable does not
                satisfy the user, they can generate another one and compare them
                with the other timetable generated.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5" className={classes.headers}>
                How do I use the application?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.details}>
                <ol>
                  <li>
                    Start by selecting the semester and academic year. We
                    provide this option so students can see mods offered in the
                    previous semesters
                  </li>
                  <li>
                    Search for a module by entering the module code in the
                    search box. Example of module codes are CS1010, GER1000 and
                    MA1521. If your mod is not found, it will not be displayed
                  </li>
                  <li>
                    Click the plus icon at the right side of the module
                    displayed after finding the module you wish to take. Repeat
                    this until you have added all the modules you wish to take
                    this semester.
                  </li>
                  <li>
                    Click on submit mods, afterwhich a list of constraints will
                    show up. Select which ever constraint you wish to apply and
                    press add constraint. Repeat this until you have added all
                    the constraints you wish to apply.
                  </li>
                  <li>
                    Click submit constraints. A timetable will be generated for
                    you if possible. If not possible, it will suggest which
                    constraint to remove.
                  </li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5" className={classes.headers}>
                What are constraints?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.details}>
                Constraints refer to the "filter" which we apply on all the
                possible lessons:
                <br />
                <ol>
                  <li>
                    Fix a class: This is intended for students who have already
                    pre-planned to take certain lessons. For example, they wish
                    to take a class with another student, so they fix that
                    tutorial slot, and the timetable generator will not shift
                    that lesson.
                  </li>
                  <li>
                    No lessons before: Have no lessons before a certain timing.
                  </li>
                  <li>No lessons on: Have no lessons on a certain day.</li>
                  <li>
                    No lessons on _ from _ to _: This is intended for students
                    who wish to block out a period of time on a certain day. For
                    example, some students want to have lunch breaks with
                    friends on a certain day, so they will block out that time
                    period of the day. Or some students may have certain things
                    they wish to use the time for i.e. part time jobs, so they
                    block out that part of the day.
                  </li>
                  <li>
                    End as early as possible: End classes as early as possible.
                  </li>
                  <li>
                    Start as late as possible: Start classes as late as possible
                    (for the sleepers and night owls).
                  </li>
                  <li>
                    Maximise online classes: This is intended for the students
                    who do not wish to come to campus when both online and
                    offline lessons are offered.
                  </li>
                  <li>
                    Maximise offline classes: This is intended for students who
                    want to come to school as often as possible.
                  </li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5" className={classes.headers}>
                What are the toggle buttons by the side of the timetable?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.details}>
                The intent of this button was more for module registration. I
                found it annoying that when I was only bidding for lectures, all
                the tutorial choices would appear as well. The intent of the
                toggle button is to remove these lectures and classes, so that
                it is easier to focus on the timeslots we wish to see.
                <br />
                <br />
                Alternatively, some might want to see their timetables without
                lectures (because they are pre-recorded).
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5" className={classes.headers}>
                What front-end framework did you use for this website?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.details}>
                This website was developed using ReactJS and Material UI (and a
                bit of Bootstrap).
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5" className={classes.headers}>
                Who are you?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.details}>
                We are a pair of NUS CS students. This web application was
                created as a project for Orbital 2021, under the team name "Team
                wildCard".
                <br />
                <br />
                <a href="https://github.com/joenzkimchan/NUSTimetablePlanner">
                  Git repository
                </a>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Card>
  );
};

export default Help;
