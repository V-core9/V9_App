import { Routes, Route, Navigate, useNavigate, useLocation, BrowserRouter as Router } from 'react-router-dom';

import { history } from './helpers';
import { Nav, Header, Footer, PrivateRoute, PrivateRouteAdmin } from './components';
import { Home, Login, MyBooks, Register, Books, Users, Functions, Dashboard, ReduxCounter, SearchPage, AssetViewPage, MyProfile } from './pages';

function App() {
  return (
    <Router>
      <Header />
      <div className="main_content">
        <Nav />
        <AppRoutes />
      </div>
      <Footer />
    </Router>
  )
}

function AppRoutes() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
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
  )
}

export default App;
