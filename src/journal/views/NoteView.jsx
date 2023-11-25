import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography, IconButton } from "@mui/material"
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { ImageGallery } from "../components"

import { useForm } from '../../hooks/useForm';
import { setActiveNote, startSaveNote, startUploadingFiles } from "../../store/journal";



const formValidations = {
  // title: [
  //   (value) => value.length > 3,
  //   "The title must be at least 3 characters."
  // ],
  // password: [
  //   (value) => value.length > 20,
  //   'The body must be at least 20 characters.'
  // ]
}

export const NoteView = () => {

  const dispatch = useDispatch();

  const { active:note, savedMessage, isSaving } = useSelector(state => state.journal);

  const {title, body, date, formState, onInputChange} = useForm(note,formValidations);

  const dateString = useMemo(() => {
   const newDate = new Date(date);
   return newDate.toUTCString();
  }, [date]);

  // updates the form when a new note is selected
  useEffect(() => {
   dispatch(setActiveNote(formState));
  }, [formState]);
  // shows message
  useEffect(() => {
   if (savedMessage.length > 0) {
    Swal.fire(
      { 
        title: "Updated!",
        text: savedMessage,
        icon: "success",
      }
    );
   }
   
  }, [savedMessage]);

  const onSaveNote = () => {
   dispatch(startSaveNote())
  }

  const onFileInputChange = ({target}) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
    Swal.fire(
      { 
        title: "Files attached!",
        text: 'Save the note to confirm',
        icon: "success",
      }
    );
  }

  const fileInputRef = useRef();

  return (
    <Grid container
          className="animate__animated animate__fadeIn animate__faster"  
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{mb:1}}>
          <Grid item>
            <Typography fontWeight='light'fontSize={39}>{dateString}</Typography>
          </Grid>
          <Grid item>
            <input type="file" multiple 
                    onChange={onFileInputChange} 
                    ref={fileInputRef}
                    style={{display: 'none'}}/>

            <IconButton color="primary" 
                        onClick={() => fileInputRef.current.click()}
                        disabled={isSaving}>
              <UploadOutlined/>
            </IconButton>

            <Button color="primary" sx={{padding:2}} disabled={isSaving} onClick={onSaveNote}>
              <SaveOutlined sx={{fontSize: 30, mr:1}}/>
              Save
            </Button>
          </Grid>

          <Grid container>
            <TextField type="text"
                        variant="filled"
                        fullWidth
                        placeholder="Write a title"
                        label="Title"
                        sx={{border: 'none', mb: 1}}
                        value={title}
                        onChange={onInputChange}
                        name="title"
                        />
            <TextField type="text"
                        variant="filled"
                        fullWidth
                        multiline
                        placeholder="Write something interesting"
                        minRows={5}
                        label="What's up?"
                        sx={{border: 'none', mb: 1}}
                        value={body}
                        onChange={onInputChange}
                        name="body"
                        />

          </Grid>

          <ImageGallery images={note.imageUrls}/>

    </Grid>
  )
}
