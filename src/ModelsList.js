import { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Model from "./Model";

function ModelsList() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/Models")
      .then((response) => response.json())
      .then(setModels)
      .catch(console.error);
  }, []);

  const handleDelete = (model) => {
    if (window.confirm("Delete model?")) {
      fetch(`http://localhost:3000/Models/${model.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      })
        .then((response) => response.json())
        .then(() => setModels((models) => models.filter((m) => m.id !== model.id)))
        .catch(console.error);
    }
  };

  return (
    <div>
      <h1>Models List</h1>
      <ul>
        {models.map((model) => (
          <li key={model.id}>
            <Link to={`/models/${model.id}`}>{model.name}</Link>
            <button onClick={() => handleDelete(model)}>Delete</button>
          </li>
        ))}
      </ul>
      <Switch>
        <Route path="/models/:id">
          <Model />
        </Route>
      </Switch>
    </div>
  );
}

export default ModelsList;
