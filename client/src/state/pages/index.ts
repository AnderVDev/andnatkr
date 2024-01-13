import { createSlice } from "@reduxjs/toolkit";

interface pageState {
  mode: string;
  modalType: string;
}

const initialState: pageState = {
  mode: "dark",
  modalType: "update",
};

export const pageSlice = createSlice({
  name: "pageState",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setModalType: (state, action) => {
        state.modalType = action.payload.modalType;
    },
  },
});

export const { setMode, setModalType } = pageSlice.actions;
export default pageSlice.reducer;
