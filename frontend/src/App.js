import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import PrivateRoutes from "./components/PrivateRoutes";
import ConfirmEmail from "./pages/Login/ConfirmEmail";
import Discussions from "./pages/Discussions";
import Notifications from "./pages/Notifications";
import Contacts from "./pages/Contacts";
import Profil from "./pages/Profil";
import FriendRequest from "./pages/Contacts/components/FriendRequest";
import FriendList from "./pages/Contacts/components/FriendList";
import FriendSuggestions from "./pages/Contacts/components/FriendSuggestions";
import DicussionBox from "./pages/Discussions/components/DicussionBox";
import Settings from "./pages/settings/";
import ModeratorRoutes from "./components/ModeratorRoutes";
import AdminRoutes from "./components/AdminRoutes";
import UserManage from "./pages/Moderator/UserManage";
import ArticleManage from "./pages/Moderator/ArticleManage";
import ModeratorManagement from "./pages/Admin/ModeratorManagement";
import Statistiques from "./pages/Admin/Statistiques";
import CommonRoutes from "./components/CommonRoutes";
import Loader from "./components/Loader";

function App() {
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (isLoading)
    return (
      <div className='min-h-[100vh] overflow-x-auto place-content-center'>
          <Loader message={"Votre application se charge"} />
      </div>
    );

  return (
    <>
      <Router>
        <Routes>
          {/* Routes for simple logged in users */}
          <Route element={<PrivateRoutes />}>
            <Route path='/' Component={Home} />
            <Route path='/discussions' Component={Discussions}>
              <Route path=':discussionid' index Component={DicussionBox} />
            </Route>
            <Route path='/notifications' Component={Notifications} />
            <Route path='/contacts' Component={Contacts}>
              <Route path='' Component={FriendSuggestions} index />
              <Route path='list' Component={FriendList} />
              <Route path='request' index Component={FriendRequest} />
            </Route>
          </Route>

          {/* Routes for both admin,moderator  and simple logged in users */}
          <Route element={<CommonRoutes />}>
            <Route path='/profile/:userid' Component={Profil} />
            <Route path='/settings' Component={Settings} />
          </Route>

          {/* Routes for moderators roles */}
          <Route element={<ModeratorRoutes />}>
            <Route path='/moderator/users' Component={UserManage} />
            <Route path='/moderator/posts' Component={ArticleManage} />
            <Route path='/profile/:userid' Component={Profil} />
          </Route>

          {/* Routes for admin */}
          <Route element={<AdminRoutes />}>
            <Route path='/admin/moderators' Component={ModeratorManagement} />
            <Route path='/admin/statistics' Component={Statistiques} />
          </Route>

          {/* Routes for everyone who is not logged in */}
          <Route path='/login' Component={Login} />
          <Route path='/confirm-email' Component={ConfirmEmail} />
          <Route path='/register' Component={Register} />
        </Routes>
      </Router>
      <Toaster position='top-right' />
    </>
  );
}

export default App;
