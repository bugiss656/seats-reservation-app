import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Homepage from './pages/Homepage/Homepage'
import ReservationView from './pages/ReservationView/ReservationView'
import ReservationSummary from './pages/ReservationSummary/ReservationSummary'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/reservation-view">
            <ReservationView />
          </Route>
          <Route path="/reservation-summary">
            <ReservationSummary />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
