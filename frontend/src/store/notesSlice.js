import { createSelector, createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        value: []
    },
    reducers: {
        add: (state, action) => {
            state.value.push(action.payload);
        },
        addMultiple: (state, action) => {
            state.value.push(...action.payload);
        },
        remove: (state, action) => {
            var idx = state.value.findIndex(note => note.id === action.payload.id);
            state.value.splice(idx, 1);
        },
        removeAll: (state) => {
            state.value = [];
        },
        edit: (state, action) => {
            var idx = state.value.findIndex(note => note.id === action.payload.id);
            state.value.splice(idx, 1, action.payload)
        }
    }
})

export const { add, addMultiple, remove, edit, removeAll } = notesSlice.actions;

export const noteSelector = (id) => createSelector(
    (state) => state.notes.value,
    (notes) => notes.find(note => note.id === id)
)

export const notesSelector = state => {
    return state.notes.value;
}

export default notesSlice.reducer;