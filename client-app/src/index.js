import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import axios from 'axios'
import jwtDecode from 'jwt-decode';

axios.interceptors.request.use(request => {
        const token = localStorage.getItem('token')
        const isApiUrl = request.url.startsWith("http://localhost:9091")
        // console.log(token)

        try {
          // const isLoggedIn = jwtDecode(token).email ? true : false;

          // if (isLoggedIn) {
              request.headers.common.Authorization = `Bearer ${token}`;
          // }
  
          return request;
        } catch {
          return request;
        }
        
        
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
