import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// STATE MANAGEMENT
import StateContext from './contextsProviders/StateContext';
import DispatchContext from './contextsProviders/DispatchContext';
//COMPONENTS
import Homepage from './pages/Homepage';
import ProfilePage from './pages/profile/ProfilePage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Header from './components/shared/Header';
import { useImmerReducer } from 'use-immer';
import LandingPage from './pages/LandingPage';

function Main() {
  const initialState = {
    url: '',
  };
  function appReducer(draft, action) {
    switch (action.type) {
      case 'updateUrl':
        draft.url = action.value;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(appReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          {/* SHOW HEADER TO CERTAIN PAGES https://codelikethis.com/lessons/react/routing-in-react-going-further*/}
          <Route path="(/profile)">
            <Header />
          </Route>
          <Switch>
            <Route path="/home">
              <Homepage />
            </Route>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route>
              <div>Not found</div>
            </Route>
          </Switch>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

ReactDOM.render(<Main />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
