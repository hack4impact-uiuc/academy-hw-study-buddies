import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Classes from './pages/Classes';
import Login from './pages/Login';
import { getUserInfo } from './utils/apiWrapper';
import 'semantic-ui-css/semantic.min.css';

import './styles/styles.scss';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const resp = await getUserInfo();

      if (resp.status === 200) {
        setUser(resp.data.result);
      }
    };

    fetchUserInfo();
  }, [setUser]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home user={user} /> : <Login setUser={setUser} />}
        ></Route>
        <Route
          exact
          path="/profile"
          element={
            user ? (
              <Profile user={user} setUser={setUser} />
            ) : (
              <Login setUser={setUser} />
            )
          }
        ></Route>
        <Route
          exact
          path="/classes"
          element={user ? <Classes user={user} /> : <Login setUser={setUser} />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
