import MainPage from "./Pages/MainPage";
import ResultPage from "./Pages/ResultPage";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/home">
            <MainPage />
          </Route>
          
          <Route path="/monitor_result">
            <ResultPage />
          </Route>

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
