import React, { useEffect, useState   } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const SearchResults = ({searchTerm, setMods, mods, time}) => {

    const [allMods, setAllMods] = useState([])

    const link = 'https://api.nusmods.com/v2/' + time.year + '/moduleList.json'
    useEffect(() => {
        axios
          .get(link)
          .then(response => {
            setAllMods(response.data)
          })
      }, [])


    const filterModsSearchTerm = allMods.filter(x => x.moduleCode.toUpperCase().includes(searchTerm.toUpperCase()));

    const filterModsSem = filterModsSearchTerm.filter(mod => mod.semesters.findIndex(y => y === parseInt(time.sem)) !== -1)
    const furtherFilteredMods = filterModsSem.filter(x => mods.findIndex(y => y === x) === -1)

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
                <ListGroup.Item key={mod.moduleCode}>
                    {mod.moduleCode} {mod.title}
                    <AddButton setMods={setMods} mods={mods} mod={mod}/>
                </ListGroup.Item>
            );
        }

const AddButton = ({setMods, mods, mod}) => {
    return (
        <AddIcon onClick={() => addMod(setMods, mods)(mod)} style={{cursor: "pointer"}}/>
    );
}

const addMod = (setMods, mods) => 
        mod => {
                const newMods = [...mods, mod]
                setMods(newMods)
            }



export default SearchResults