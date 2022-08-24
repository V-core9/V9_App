import { Routes, Route, Navigate, useNavigate, useLocation, BrowserRouter as Router } from 'react-router-dom';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { history } from './helpers';
import { Nav, Header, Footer, PrivateRoute } from './components';
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
  UsersNew,
  Functions,
  FunctionsNew,
  FunctionsEdit,
  AdminAppInfo,
  // NASA Thing
  SearchPage,
  AssetViewPage,
  // Demos
  ComponentsExample,
  // FreeTools,
  FreeTools,
  CodeMinifier,
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
      <ToastContainer position="bottom-right" theme="dark" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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


      <Route path="/nasa-assets" element={<SearchPage />} />
      <Route path="/nasa-assets/view/:nasa_id" element={<AssetViewPage />} />


      <Route path="/free-tools" element={<FreeTools />} />
      <Route path="/free-tools/code-minifier" element={<CodeMinifier />} />

      <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />

      <Route path="/my-books" element={<PrivateRoute><MyBooks /></PrivateRoute>} />
      <Route path="/my-books/new" element={<PrivateRoute><MyBooksNew /></PrivateRoute>} />
      <Route path="/my-books/edit/:book_id" element={<PrivateRoute><MyBooksEdit /></PrivateRoute>} />

      <Route path="/my-profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />


      <Route path="/dashboard" element={<PrivateRoute adminRoute={true}><Dashboard /></PrivateRoute>} />

      <Route path="/users" element={<PrivateRoute adminRoute={true}><Users /></PrivateRoute>} />
      <Route path="/users/new" element={<PrivateRoute adminRoute={true}><UsersNew /></PrivateRoute>} />
      <Route path="/users/edit/:user_id" element={<PrivateRoute adminRoute={true}><Users /></PrivateRoute>} />


      <Route path="/functions" element={<PrivateRoute adminRoute={true}><Functions /> </PrivateRoute>} />
      <Route path="/functions/new" element={<PrivateRoute adminRoute={true}><FunctionsNew /> </PrivateRoute>} />
      <Route path="/functions/:func_id" element={<PrivateRoute adminRoute={true}><FunctionsEdit /> </PrivateRoute>} />

      <Route path="/admin-app-info" element={<PrivateRoute adminRoute={true}><AdminAppInfo /></PrivateRoute>} />
      <Route path="/components-examples" element={<PrivateRoute adminRoute={true}><ComponentsExample /></PrivateRoute>} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      <Route path="*" element={<PageNotFound />} />

    </Routes>
  )
}

export default App;
