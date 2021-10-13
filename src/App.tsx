import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Playground from "./Components/Playground";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Playground}/>
      </Switch>
    </Router>
  );
}

export default App;
