import { Routes, Route, Navigate, useNavigate, useLocation, BrowserRouter as Router } from 'react-router-dom';

import { history } from './helpers';
import { Nav, Header, Footer, PrivateRoute, AdminRoute } from './components';
import {
  // Public pages
  Home,
  Login,
  Register,
  ReduxCounter,
  PageNotFound,
  // Application Pages
  MyBooks,
  MyBooksNew,
  MyBooksEdit,
  Books,
  // Account Pages
  MyProfile,
  // Admin Pages
  Dashboard,
  Users,
  Functions,
  FunctionsEdit,
  // NASA Thing
  SearchPage,
  AssetViewPage,
} from './pages';

function App() {
  return (
    <Router>
      <Header />
      <div className="main_content">
        <Nav />
        <div className="content">
          <AppRoutes />
        </div>
      </div>
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
      <Route path="/my-books/new" element={<PrivateRoute><MyBooksNew /></PrivateRoute>} />
      <Route path="/my-books/edit/:book_id" element={<PrivateRoute><MyBooksEdit /></PrivateRoute>} />
      <Route path="/my-profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />


      <Route path="/dashboard" element={<PrivateRoute><AdminRoute><Dashboard /></AdminRoute></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><AdminRoute><Users /></AdminRoute></PrivateRoute>} />
      <Route path="/functions" element={<PrivateRoute><AdminRoute> <Functions /> </AdminRoute></PrivateRoute>} />
      <Route path="/functions/:func_id" element={<PrivateRoute><AdminRoute> <FunctionsEdit /> </AdminRoute></PrivateRoute>} />


      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      <Route path="*" element={<PageNotFound />} />

    </Routes>
  )
}

export default App;
