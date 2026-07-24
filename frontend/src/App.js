import './App.css';
import Login from "./components/login/Login";
import Landing from "./components/landing/Landing";
import Index from "./components/landing/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './context/authProvider';
import FactsList from './components/landing/FactsList';
import CreateAccount from './components/login/CreateAccount';
import Likes from './components/landing/Likes';
import Popular from './components/landing/Popular';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<CreateAccount/>}/>
          <Route path="/index" element={<Index/>}>
            <Route path="facts" element={<FactsList/>}/>
            <Route path="likes" element={<Likes/>}/>
            <Route path="popular" element={<Popular/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
