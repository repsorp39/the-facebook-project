import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from './pages/Register/Register';
import PrivateRoutes from './components/PrivateRoutes';
import ConfirmEmail from './pages/Login/ConfirmEmail';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Discussions from "./pages/Discussions";
import Notifications from "./pages/Notifications";
import Contacts from "./pages/Contacts";
import Profil from './pages/Profil';


function App() {

  const isLoading = useSelector((state) => state.auth.isLoading);
  if(isLoading) return <div></div>;
  return (
    <>
      <Router>
          <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path='/' Component={Home}> </Route>
                <Route path='/discussions' Component={Discussions}></Route>
                <Route path='/notifications' Component={Notifications}></Route>
                <Route path='/contacts' Component={Contacts}></Route>
                <Route path='/profile/:userid' Component={Profil}></Route>
              </Route>
              <Route path='/login' Component={Login}> </Route>
              <Route path='/confirm-email' Component={ConfirmEmail}> </Route>
              <Route path='/register' Component={Register}> </Route>
          </Routes>
      </Router>
      <Toaster position='top-center' />
    </>
  );
}

export default App;