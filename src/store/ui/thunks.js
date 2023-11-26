import { setMenuFromSize } from "./uiSlice";


export const startMeasurinScreen = () => {
  const width = window.innerWidth;
  return async (dispatch) => {
    dispatch(setMenuFromSize(width));
  }
}