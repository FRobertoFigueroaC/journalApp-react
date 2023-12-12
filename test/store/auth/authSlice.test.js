import { 
  authSlice,
  checkingCredentials,
  login,
  logout
} from "../../../src/store/auth/authSlice";
import {
  initialState,
  demoUser,
  authenticatedState,
  notAuthenticatedState,
  defaultErrorMessage
} from "../../fixtures/authFixtures";

describe('tests for authSlice store', () => { 
  test('should return initial state', () => { 
    // authSlice
    const state = authSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);
   });

   test('should login', () => {
      const state = authSlice.reducer(initialState, login(demoUser));
      expect(state).toEqual(authenticatedState);
    });

    test('should logout without error', () => {
      const state = authSlice.reducer(initialState, logout());
      expect(state).toEqual(notAuthenticatedState);
    });

    test('should logout with error', () => {
      const state = authSlice.reducer(initialState, logout({error: defaultErrorMessage}));
      expect(state).toEqual({
        ...notAuthenticatedState,
        errorMessage: defaultErrorMessage
      });
    });

    test('should check the creentials when login', () => {
      const state = authSlice.reducer(authenticatedState, checkingCredentials());
      expect(state).toEqual({
        ...authenticatedState,
          status: 'checking',
      });
    });
 });