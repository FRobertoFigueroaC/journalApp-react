import { configureStore } from '@reduxjs/toolkit'
import {authSlice} from './auth'
import { journalSlice } from './journal';
import { uiSlice } from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
    ui: uiSlice.reducer,
  },
})