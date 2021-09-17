import MainPage from "./Pages/MainPage";
import ResultPage from "./Pages/ResultPage";
import FruitTable from "./Pages/FruitTable";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/home">
            <MainPage />
          </Route>
          
          <Route path="/monitor_result">
            <ResultPage />
          </Route>

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route path="/fruit_table">
            <FruitTable />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
