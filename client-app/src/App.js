import './App.css';
import Layout from './components/layout/Layout';
import AllProducts from './components/product/AllProducts';
import { Routes, Route } from "react-router-dom";
import AllUsers from './components/user/AllUsers'
import Register from './components/user/Register';
import Login from './components/user/Login';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProductTable from './components/product/ProductTable';
import UserTable from './components/user/UserTable';
import ProductForm from './components/product/ProductForm';

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
          <Route path="/products" element={<Layout><ProductTable /></Layout>} />
          <Route path="/products/edit/:id" element={<Layout><ProductForm /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </CurrentUserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
