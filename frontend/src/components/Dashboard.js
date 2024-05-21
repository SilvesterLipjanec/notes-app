

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notesSelector } from "../store/notesSlice";
import { addMultiple, removeAll } from "../store/notesSlice";
import NotesCatalog from "./NotesCatalog";
import { Button, Box, TextField } from "@mui/material";
import NoteEditDialog from "./NoteEditDialog";
import { useState } from "react";
import { API_ENDPOINT_BASE } from "../serverConfig"
export default function Dashboard() {

    const dispatch = useDispatch();

    const notes = useSelector(notesSelector)

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNotes, setFilteredNotes] = useState(notes)

    useEffect(() => {
        fetch(API_ENDPOINT_BASE + '/notes')
            .then(response => response.json())
            .then(response => {
                dispatch(removeAll());
                dispatch(addMultiple(response));
            });
    }, []);

    const handleClickOpen = () => {
        setIsEditDialogOpen(true);
    };

    const handleClose = () => {
        setIsEditDialogOpen(false);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)

        const filteredNotes = notes.filter((note) => {
            var searchTermLowered = e.target.value.toLowerCase();
            return note.title.toLowerCase().includes(searchTermLowered) ||
                note.text.toLowerCase().includes(searchTermLowered);

        }
        );

        setFilteredNotes(filteredNotes);
    }

    useEffect(() => setFilteredNotes(notes), [notes]);


    return (
        <Box sx={dashboardBoxStyle}>…
            <div className={"app-header"}>
                <TextField id="outlined-basic" label="Search" variant="outlined" value={searchTerm} onChange={handleInputChange} />
                <Button variant="contained" onClick={handleClickOpen}>Add note</Button>
            </div>
            <NotesCatalog notes={filteredNotes} ></NotesCatalog>
            <NoteEditDialog isOpened={isEditDialogOpen} handleClose={handleClose} ></NoteEditDialog>
        </Box>
    )
}

const dashboardBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center'
};