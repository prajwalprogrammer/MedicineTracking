import './App.css';
import AssignRoles from './AssignRoles';
import Home from './Home';
import AddMed from './AddMed';
import Supply from './Supply'
import Track from './Track'
import QR from './QR'
import Last from './Last'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SocialFollow from "./SocialFollow"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/roles" component={AssignRoles} />
          <Route path="/addmed" component={AddMed} />
          <Route path="/supply" component={Supply} />
          <Route path="/track" component={Track} />
          <Route path="/QR" component={QR} />
          <Route path="/last" component={Last} />
          <Route path="/socialmedia" component={SocialFollow} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
