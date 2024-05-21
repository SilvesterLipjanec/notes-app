import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, MenuItem, Select, Box, InputLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { API_ENDPOINT_BASE } from "../serverConfig"
import { useDispatch } from 'react-redux';
import { add, edit, remove } from '../store/notesSlice';

export const CATEGORY = ['Personal', 'Work', 'School'];

export default function NoteEditDialog({ isOpened, handleClose, noteObj }) {
    const [note, setNote] = useState(noteObj || {});

    const dispatch = useDispatch();

    const httpRequest = (note, httpMthod, stateChangeMethod) => {
        const bodyParams = httpMthod != "DELETE" ? {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        } : {};

        fetch(API_ENDPOINT_BASE + "/notes" +
            ((httpMthod === "PUT" || httpMthod === "DELETE") ? "/" + note.id : ""), {
            method: httpMthod,
            ...bodyParams
        }).then(response => response.json())
            .then((data) => {
                dispatch(stateChangeMethod(data))
                onClose()
            })
    }


    const handleSave = () => {
        if (!note.id) {
            /* eslint-disable-next-line no-restricted-globals */
            note.id = self.crypto.randomUUID();
            note.timestamp = Date.now();
            httpRequest(note, "POST", add)
        } else {
            httpRequest(note, "PUT", edit)
        }
        onClose();
    }
    const handleDelete = () => {
        httpRequest(note, "DELETE", remove);
        onClose();
    }

    const onClose = () => {
        setNote(noteObj || {});
        handleClose();
    }


    useEffect(() => {
        if (!noteObj) {
            return;
        }
        setNote(noteObj)
    }, [noteObj])

    const inputChangeHandler = function (e) {
        setNote(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const isFormValid = () => note.title && note.title != '' &&
        note.text && note.text != '' &&
        note.category && note.category != '';

    return (
        <React.Fragment>
            <Dialog
                open={isOpened}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.text;
                        console.log(email);
                        onClose();
                    },
                }}
            >
                <DialogTitle>Note</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={note.title}
                        onChange={inputChangeHandler}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="text"
                        name="text"
                        label="text"
                        type="text"
                        fullWidth
                        multiline
                        variant="outlined"
                        value={note.text}
                        onChange={inputChangeHandler}

                    />
                    <Box >
                        <FormControl fullWidth>
                            <InputLabel id="category">category  </InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                name="category"
                                value={note.category}
                                label="category"
                                onChange={inputChangeHandler}
                            >
                                {CATEGORY.map(cat => <MenuItem value={cat}>{cat}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    {!!note.id && <Button type="submit" color="error" onClick={handleDelete}>Delete</Button>}
                    <Button type="submit" disabled={!isFormValid()} onClick={handleSave}
                    >Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
