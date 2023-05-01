import'./App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ModelsList from "./ModelsList";
import Model from "./Model";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ModelsList />
        </Route>
        <Route path="/models/:id">
          <Model />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;