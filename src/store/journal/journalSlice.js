import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
      isSaving: false,
      savedMessage: '',
      notes: [],
      active: null
      // active: {
      //   id: '',
      //   title: '',
      //   body: '',
      //   date: 12345,
      //   imageUrls: [],
      // }
    },
    reducers: {
        isCreatingNewNote: (state) => {
         state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
          state.notes.push(action.payload);
          state.isSaving = false;
        },
        setActiveNote: (state, action) => {
          state.savedMessage = '';
          state.active = action.payload;
        },
        setNotes: (state, action) => {
          state.notes = action.payload
        },
        setSaving: (state) => {
          state.isSaving = true;
          state.savedMessage = '';
        },
        updateNote: (state, {payload}) => {
          const index = state.notes.findIndex(note => note.id === payload.id);
          if (index !== -1) {
            state.notes[index] = { ...state.notes[index], ...payload };
          }
          state.isSaving = false;
          state.savedMessage = `${payload.title} has been updated successfully.`;
        },
        setPhotosToActiveNote: (state, {payload}) => {
          state.active.imageUrls = [... state.active.imageUrls, ...payload.files];
          state.isSaving = false;
        },
        deleteNoteById: (state) => {

        },

    }
});
export const {
  addNewEmptyNote,
  deleteNoteById,
  isCreatingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
// export default journalSlice.reducer