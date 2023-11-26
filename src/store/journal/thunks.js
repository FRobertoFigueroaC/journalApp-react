import { collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore/lite"
import { firebaseDB } from "../../firebase/config"

import { 
  isCreatingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNoteById
} from "./"
import { fileUpload, loadNotes } from "../../helpers"


export const startNewNote = () => {
  return async(dispatch,  getState) => {
    
    // user uid
    const { uid } = getState().auth;
    
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    }
    dispatch(isCreatingNewNote());
    const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`) );
    const result = await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;
    // dispatch new note
    dispatch(addNewEmptyNote(newNote));
    //dispatch activar nota 
    dispatch(setActiveNote(newNote));
  }
}

export const startLoadingNotes = () => {
 return async (dispatch, getState) => {
    // user uid
    const { uid } = getState().auth;
    const result = await loadNotes(uid);
    dispatch(setNotes(result));
 }
}


export const startSaveNote = () => {
 return async (dispatch, getState) => {
  dispatch(setSaving());
  const { uid } = getState().auth;
  const { active:note } = getState().journal;
  const noteToFirestore = { ... note };
  delete noteToFirestore.id;
  
  const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}` );
  const result = await setDoc(docRef, noteToFirestore, true);
  dispatch(updateNote(note));

 }
}

export const startUploadingFiles  = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photoUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote({files: photoUrls}));
    
  }
}

export const startDeletingNote = () => {
  return async(dispatch, getState) => {
    dispatch(setSaving());
    const { active:note } = getState().journal;
    const { uid } = getState().auth;
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}` );
    const result = await deleteDoc(docRef);
    dispatch(deleteNoteById(note));
  }
}
