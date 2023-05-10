import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import './App.css';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/alert";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
 useEffect(() => {
 store.dispatch(loadUser())
}, []);
  return (
    <Provider store={store}>
     <Router>
      <Fragment>
       <Navbar />
       <Alert />
       <Routes>
         <Route exact path ='/' element={ <Landing />} />
           <Route path ='/register' element={  <Register />  } />
           <Route path ='/login' element={ <Login /> } />
           <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
       </Routes>
     </Fragment>
     </Router>
    </Provider>
  );
}

export default App;
