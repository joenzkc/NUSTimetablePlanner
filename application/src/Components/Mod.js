import { Row, Container, Jumbotron } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Accordion, Box } from "@material-ui/core";

const Mod = ({ mod, onDelete, deleteState, onAdd, searchState }) => {
  return (
    <div>
      <Typography component="div">
        <Box fontWeight={550} m={1}>
          {mod.moduleCode}
          {deleteState && (
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={() => onDelete(mod.moduleCode)}
            />
          )}

          {searchState && (
            <AddIcon
              style={{ cursor: "pointer" }}
              onClick={() => onAdd(mod.moduleCode)}
            />
          )}
        </Box>
      </Typography>
    </div>
  );
};

export default Mod;
