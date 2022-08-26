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
        <Routes>
          <Route path="/" element={<Layout><AllProducts /></Layout>} />
          <Route path="/users" element={<Layout><UserTable /></Layout>} />
          <Route path="/users/edit/:id" element={<Layout><UserForm /></Layout>} />
          <Route path="/users/new" element={<Layout><UserForm /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
          <Route path="/products" element={<Layout><ProductTable /></Layout>} />
          <Route path="/products/edit/:id" element={<Layout><ProductForm /></Layout>} />
          <Route path="/products/new" element={<Layout><ProductForm /></Layout>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </CurrentUserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
