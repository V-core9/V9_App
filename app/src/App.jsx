import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from './helpers';
import { Nav, Footer, PrivateRoute, PrivateRouteAdmin } from './components';
import { Home, Login, MyBooks, Register, Books, Users, Functions, Dashboard, ReduxCounter, SearchPage, AssetViewPage, MyProfile } from './pages';



function App() {
  // init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <div className="app-container">
      <Nav />
      <div className="container pt-4 pb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/redux-counter" element={<ReduxCounter />} />


          <Route path="/nasa-search" element={<SearchPage />} />
          <Route path="/nasa-asset/:nasa_id" element={<AssetViewPage />} />


          <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
          <Route path="/my-books" element={<PrivateRoute><MyBooks /></PrivateRoute>} />
          <Route path="/my-profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />


          <Route path="/dashboard" element={<PrivateRouteAdmin><Dashboard /></PrivateRouteAdmin>} />
          <Route path="/users" element={<PrivateRouteAdmin><Users /></PrivateRouteAdmin>} />
          <Route path="/functions" element={<PrivateRouteAdmin> <Functions /> </PrivateRouteAdmin>} />


          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
