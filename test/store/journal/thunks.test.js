import { startNewNote } from '../../../src/store/journal/thunks';

describe('tests for journal/thunks', () => {
  
  const dispatch = jest.fn();

  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should create a new note', async () => { 
    getState.mockReturnValue({auth: {uid: 'test'}});

    // await startNewNote()(dispatch, getState);
   });
});