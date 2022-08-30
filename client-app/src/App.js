import './App.css';
import Layout from './components/layout/Layout';
import AllProducts from './components/product/AllProducts';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/user/SignUp';
import SignIn from './components/user/SignIn';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductTable from './components/product/ProductTable';
import UserTable from './components/user/UserTable';
import ProductForm from './components/product/ProductForm';
import UserForm from './components/user/UserForm';
import ProductDetails from './components/product/ProductDetails';
import RequireAuthAdmin from './contexts/RequireAuthAdmin';
import ReviewTable from './components/review/ReviewTable';
import { WishlistProvider } from './contexts/WishListContext';
import CanvasV3D from './components/v3d/CanvasV3D';
import EditImages from './components/image-upload/EditImages';
import Statistics from './components/statistics/Statistics';

const theme = createTheme({palette: {
  type: 'light',
  primary: {
    main: '#512da8',
  },
  secondary: {
    main: '#7986cb',
  },
  error: {
    main: '#b71c1c',
  },
  warning: {
    main: '#ff5722',
  },
  info: {
    main: '#448aff',
  },
  success: {
    main: '#66bb6a',
  },
},});

function App() {
  return (
    <div className="App" style={{
      minHeight: '100%', 
      height: '100%', 
      minWidth: '100%', 
      width: '100%', 
      position: 'absolute'
      }}>
      {/* <Layout /> */}
      <ThemeProvider theme={theme}>
      <CurrentUserProvider>
        <WishlistProvider>
        <Routes>
          <Route path="/" element={<Layout><AllProducts /></Layout>} />
          <Route path="/users" element={<RequireAuthAdmin><Layout><UserTable /></Layout></RequireAuthAdmin>} />
          <Route path="/users/edit/:id" element={<RequireAuthAdmin><Layout><UserForm /></Layout></RequireAuthAdmin>} />
          <Route path="/users/new" element={<RequireAuthAdmin><Layout><UserForm /></Layout></RequireAuthAdmin>} />
          <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
          <Route path="/products" element={<RequireAuthAdmin><Layout><ProductTable /></Layout></RequireAuthAdmin>} />
          <Route path="/products/edit/:id" element={<RequireAuthAdmin><Layout><ProductForm /></Layout></RequireAuthAdmin>} />
          <Route path="/products/edit/images/:id" element={<RequireAuthAdmin><Layout><EditImages /></Layout></RequireAuthAdmin>} />
          <Route path="/products/new" element={<RequireAuthAdmin><Layout><ProductForm /></Layout></RequireAuthAdmin>} />
          <Route path="/reviews" element={<RequireAuthAdmin><Layout><ReviewTable /></Layout></RequireAuthAdmin>} />
          <Route path="/statistics" element={<RequireAuthAdmin><Layout><Statistics /></Layout></RequireAuthAdmin>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/v3d" element={<Layout><CanvasV3D /></Layout>} />
        </Routes>
        </WishlistProvider>
      </CurrentUserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
