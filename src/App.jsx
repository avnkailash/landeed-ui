import React from "react";
import { useSelector } from "react-redux";
import FormList from "./components/FormList";
import Form from "./components/Form";

const App = () => {
  const currentForm = useSelector((state) => state.forms.currentForm);

  console.log("currentForm", currentForm);
  return (
    <div className="App">
      {!currentForm && <FormList />}
      {currentForm && <Form />}
    </div>
  );
};

export default App;
