import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import Dog_Form from "./components/Dog_Form/Dog_Form.jsx"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/newDog" component={Dog_Form} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
