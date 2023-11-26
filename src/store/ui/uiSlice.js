import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
      isMenuOpen: false,
      drawerWidth: 240,
      variant: 'temporary' //temporary | permanent
    },
    reducers: {
        toggleMenu: (state,) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        setMenuFromSize: (state, { payload}) => {
            if (payload < 900) {
                state.isMenuOpen = false;
                state.drawerWidth = 240;
                state.variant = 'temporary';
            } else {
                state.isMenuOpen = true;
                state.drawerWidth = 240;
                state.variant = 'permanent';
            }
        }
    }
});
export const { toggleMenu, setMenuFromSize } = uiSlice.actions;
// export default uiSlice.reducer