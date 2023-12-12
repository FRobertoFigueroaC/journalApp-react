
import { demoUser} from '../../fixtures/authFixtures'
import { signInWithGoogle, registerEmailUser, logoutUser } from '../../../src/firebase/providers';

import { checkingCredentials, login, logout } from '../../../src/store/auth';
import { clearNotesLogout } from '../../../src/store/journal';
import { 
  checkingAuthentication,
  startCreatingEmailUser,
  startGoogleSignIn,
  startLogout
} from '../../../src/store/auth/thunks';


jest.mock('../../../src/firebase/providers')


describe('tests for auth/thunks', () => {
  const dispatch = jest.fn();
  beforeEach (() => jest.clearAllMocks());

  test('should invoke checkingAuthentication', async () => {
    
    await checkingAuthentication()(dispatch);
    // checkingCredentials - { type: 'auth/checkingCredentials', payload: undefined }
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  });

  test('should call checkingCredentials and signInWithGoogle', async() => {

    const loginData = {ok: true, ...demoUser};
    await signInWithGoogle.mockResolvedValue(loginData);
    // thunk
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('should not call login when signInWithGoogle fails', async () => {
    const loginData = {ok: false, error: 'Error'};
    await signInWithGoogle.mockResolvedValue(loginData);
    // thunk
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test('should call checkingCredentials and registerEmailUser and login succesfully', async() => {
    const loginData = {ok: true, ...demoUser};
    const formData = {password: '123Abc!', email: demoUser.email, diaplayName: demoUser.diaplayName}
    await registerEmailUser.mockResolvedValue(loginData);

    await startCreatingEmailUser(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('should call clearNotesLogout and logout when startLogout', async() => { 
    await logoutUser.mockResolvedValue();
    await startLogout()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
   });
});