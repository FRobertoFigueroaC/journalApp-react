import { useDispatch, useSelector } from 'react-redux';
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography, Button } from "@mui/material"
import { startLogout } from "../../store/auth";
import { toggleMenu } from "../../store/ui";

// const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);


export const NavBar = () => {
    const dispatch = useDispatch();
    const { drawerWidth } = useSelector(state => state.ui);
    const onLogout = () => {
        dispatch(startLogout());
    }
    const onMenuClick = () => {
     dispatch(toggleMenu())
    }
  return (
    <>
      <AppBar component='header'
          position='fixed'
          sx={{ 
              width: { md: `calc(100% - ${ drawerWidth }px)` },
              ml: { sm: `${ drawerWidth }px` }
          }}>
          <Toolbar>
              <IconButton
                  color='inherit'
                  edge="start"
                  sx={{ mr: 2}}
                  onClick={onMenuClick}
                  >
                  <MenuOutlined />
              </IconButton>

              <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                  <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                  <IconButton color='error' onClick={onLogout}>
                      <LogoutOutlined />
                  </IconButton>
              </Grid>

          </Toolbar>
      </AppBar>
      {/* <Offset/> */}
    </>
  )
}
