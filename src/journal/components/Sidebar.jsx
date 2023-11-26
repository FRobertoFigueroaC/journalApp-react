import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Box, Divider, Drawer, List, Toolbar, Typography, Button} from '@mui/material'
import { CloseOutlined } from '@mui/icons-material';
import { SideBarItem } from './';
import { toggleMenu } from '../../store/ui/';



export const Sidebar = () => {
    const dispatch = useDispatch();

    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);
    const { isMenuOpen, drawerWidth, variant } = useSelector(state => state.ui);

    useEffect(() => {
       
    }, [isMenuOpen]);

    const toggleDrawer = () => {
        dispatch(toggleMenu())
    }
    
  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        
        >
        <Drawer
            anchor='left'
            variant={variant}
            open={isMenuOpen}
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
            >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'> {displayName}</Typography>
            </Toolbar>
            <Button
                  color='inherit'
                  edge="start"
                  sx={{ mr: 2}}
                  onClick={toggleDrawer}
                  >
                <CloseOutlined />    
            </Button>
            <Divider />

            <List>
                {
                    notes.map( note => (
                        <SideBarItem key={ note.id } { ...note }  />
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}