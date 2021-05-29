import { Row, Container, Jumbotron } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import { Accordion, Box } from "@material-ui/core";

const Mod = ({ mod, onDelete, deleteState, onAdd, searchState }) => {
  return (
    <h3>
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
    </h3>
  );
};

export default Mod;
