import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchResults = ({searchTerm, setMods, mods}) => {

    const dummyMods = ["EC2101", "CS2040S", "CS2030S", "CS2100"]

    const filterMods = dummyMods.filter(x => x.toUpperCase().includes(searchTerm.toUpperCase()));
    const furtherFilteredMods = filterMods.filter(x => mods.findIndex(y => y === x) === -1)

    return (
        <Col>
            <ListGroup>
                {
                    furtherFilteredMods.map(DisplayMod(setMods, mods))
                }
            </ListGroup>    
        </Col>
    );
}

const DisplayMod = (setMods, mods) => 
        mod => {
            return (
                <ListGroup.Item key={mod}>
                    {mod}
                    <AddButton setMods={setMods} mods={mods} mod={mod}/>
                </ListGroup.Item>
            );
        }

const AddButton = ({setMods, mods, mod}) => {
    return (
        // <IconButton >
            <AddIcon onClick={() => addMod(setMods, mods)(mod)} style={{cursor: "pointer"}}/>
        // </IconButton>
    );
}

const addMod = (setMods, mods) => 
        mod => {
                const newMods = [...mods, mod]
                setMods(newMods)
            }



export default SearchResults