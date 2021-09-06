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

import styles from './App.module.css'


function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/reservation-view" component={ReservationView} />
          <Route path="/reservation-summary" component={ReservationSummary} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
