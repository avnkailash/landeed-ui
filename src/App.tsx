import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import FormList from "./components/FormList";
import Form from "./components/Form";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const App: React.FC = () => {
  const currentForm = useSelector(
    (state: RootState) => state.forms.currentForm
  );

  console.log("currentForm", currentForm);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/forms">
            <FormList />
          </Route>
          <Route path="/form/:formId">
            <Form />
          </Route>
          <Route path="/">
            <Redirect to="/forms" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
