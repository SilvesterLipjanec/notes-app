import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NoteEditDialog from "./NoteEditDialog";
import { useState } from "react";
import { Chip } from '@mui/material';


export default function Note({ note }) {

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleClickOpen = () => {
        setIsEditDialogOpen(true);
    };

    const handleClose = () => {
        setIsEditDialogOpen(false);
    };


    return (
        <>
            <Box sx={noteCardStyle}>
                <Card onClick={handleClickOpen} variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                            {note.title}
                        </Typography>
                        <Typography variant="body2">
                            {note.text}
                        </Typography>
                        <Chip label={note.category}></Chip>
                        <Typography variant="body2">{new Date(note.timestamp).toLocaleString()}</Typography>
                    </CardContent>
                </Card>
            </Box>
            <NoteEditDialog noteObj={note} isOpened={isEditDialogOpen} handleClose={handleClose} ></NoteEditDialog>
        </>


    );
}

const noteCardStyle = {
    minWidth: 275,
    cursor: 'pointer'
}