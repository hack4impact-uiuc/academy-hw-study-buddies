import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Classes from './pages/Classes';

import './styles/styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/classes" element={<Classes />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
