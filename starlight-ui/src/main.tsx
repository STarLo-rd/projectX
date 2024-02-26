import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/auth-context.tsx';
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
)
