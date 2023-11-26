import { useMemo,useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom"

import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material"
import { AuthLayouth } from "../layout/AuthLayouth"
import { useForm } from "../../hooks";
import {startGoogleSignIn, startLogIn} from "../../store/auth";

const formValidations = {
  email: [
    (value) => Boolean(value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)),
    'The email must be a valid email address.'
  ],
  password: [
    (value) => Boolean(value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/)),
    "The password must be at least 8 characters and must contain at least un number and one special character!@#$%^&*)."
  ]
};
const formData = {
  email: 'journal-test-usera@mail.com',
  password:'Ab12345!',
  // email: '',
  // password:'',
};

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);



  const {
     email, password, onInputChange,
    isFormValid, emailValid, passwordValid
  } = useForm(formData,formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startLogIn({email, password}));
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }


  return (
    <AuthLayouth title="Login">
      <form onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster" >
        <Grid container>
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
            <Grid item xs={12} sm={6}>
              <Button  type="submit" variant="contained" fullWidth
                      disabled={isAuthenticating}>
                Log in
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button  variant="contained" fullWidth 
                      disabled={isAuthenticating} onClick={onGoogleSignIn}>
                <Google/>
                <Typography sx={{ml:1}}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container
            direction="row"
            justifyContent="end"
            >
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Crear una cuenta
              </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayouth>


  )
}
