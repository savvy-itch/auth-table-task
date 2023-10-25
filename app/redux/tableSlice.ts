import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../globals';

interface TableState {
  dataOnPage: Person[],
  currPage: number
}

const initialState: TableState = {
  dataOnPage: [],
  currPage: 1,
}

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    updateData: (state, action:PayloadAction<any[]>) => {
      state.dataOnPage = action.payload;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      state.currPage = action.payload;
    }
  }
})

export const { updateData, updatePage } = tableSlice.actions;
export default tableSlice.reducer;