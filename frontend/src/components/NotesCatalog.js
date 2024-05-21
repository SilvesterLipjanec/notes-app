
import Note from "./Note"
import { Box } from "@mui/material"


export default function NotesCatalog({ notes }) {

    return <Box sx={NotesCatalogStyle}>
        {notes.map(note => <Note key={note.id} note={note}></Note>)}
    </Box>
}

const NotesCatalogStyle = {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    p: 1,
    m: 1,
    marginRight: '24px',
    bgcolor: 'background.paper',
    borderRadius: 1,
    overflowY: 'scroll',
    height: 'calc(100vh - var(--header-height))',
    gap: '30px',
    justifyContent: "center"

}