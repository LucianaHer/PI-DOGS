import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import Dog_Form from "./components/Dog_Form/Dog_Form.jsx"
import Dog_Detail from "./components/Dog_Detail/Dog_Detail.jsx"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/newDog" component={Dog_Form} />
          <Route path="/dogDetail/:id" component={Dog_Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
