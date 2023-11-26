import { Link as RouterLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography, Alert} from "@mui/material"

import { AuthLayouth } from "../layout/AuthLayouth"
import { useForm } from "../../hooks"
import {startCreatingEmailUser} from "../../store/auth";
import { useMemo, useState } from "react"

const formValidations = {
  email: [
    (value) => Boolean(value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)),
    'The email must be a valid email address.'
  ],
  password: [
    (value) => Boolean(value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/)),
    "The password must be at least 8 characters and must contain at least un number and one special character!@#$%^&*)."
  ],
  displayName: [
    value => value.length >= 2,
    "The displayName must be at least 20 characters."
  ],
};

const formData ={
  email: 'journal-test-usera@mail.com',
  displayName: 'Tester',
  password:'Ab12345!',
};

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);


  const {
    formState, email, password, displayName, onInputChange,
    isFormValid, emailValid, displayNameValid, passwordValid
  } = useForm(formData, formValidations);


  const { status, errorMessage } = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingEmailUser({email, password, displayName}));
  }

  return (
    <AuthLayouth title="Register">
      <form onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster" >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2}}>
            <TextField label="Name"
              type="text"
              placeholder="Your name"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
              />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2}}>
            <TextField label="Email"
              type="email"
              placeholder="something@somewhere.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
              />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2}} >
            <TextField label="Password"
              type="password"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
              />
          </Grid>

          <Grid container spacing={2} sx={{mb:2, mt:2}}>
            <Grid 
              display={!!errorMessage ? '' : 'none'}
              item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" disabled={isCheckingAuthentication}
                variant="contained" fullWidth>
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container
            direction="row"
            justifyContent="end">
              <Typography sx={{mr:1}}>¿Ya tienes una cuenta?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login">
                Ingresar
              </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayouth>
  )
}
