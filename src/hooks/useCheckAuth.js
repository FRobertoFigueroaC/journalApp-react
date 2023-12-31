
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase/config';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/auth';
import { startLoadingNotes } from '../store/journal';
import { startMeasurinScreen } from '../store/ui';

export const useCheckAuth = () => {
  const { status } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async(user) => {
      if (!user) return dispatch(logout());
      const {uid, email, displayName, photoURL } = user;
      dispatch(login({uid, email, displayName, photoURL }));
      dispatch(startMeasurinScreen())
      dispatch(startLoadingNotes());
    })
  }, []);

  return status;
}
