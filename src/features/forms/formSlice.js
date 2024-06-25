import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: [],
  currentForm: null,
  formData: {},
  submissionTimeout: null,
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setForms(state, action) {
      state.forms = action.payload;
    },
    setCurrentForm(state, action) {
      state.currentForm = action.payload;
    },
    setFormData(state, action) {
      state.formData = action.payload;
    },
    setSubmissionTimeout(state, action) {
      state.submissionTimeout = action.payload;
    },
  },
});

export const { setForms, setCurrentForm, setFormData, setSubmissionTimeout } =
  formSlice.actions;
export default formSlice.reducer;
