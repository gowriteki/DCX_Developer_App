import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/shared/header';
import Navbar from './components/shared/navbar';
import Sidebar from './components/shared/sideBar';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/shared/footer';
import LoginContext from './context/loginContext';
import { NotFound } from './pages/notFound';

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const layoutPaths = user
    ? ['/', '/about', '/register', '/browse', '/contact', '/myprofile']
    : ['/', '/about', '/register', '/browse', '/contact'];

  const isLayoutPage = layoutPaths.includes(location.pathname); 
  return (
    <LoginContext.Provider value={{ user, updateUser:setUser }}><>
    {isLayoutPage ? (
      
      <div className="row align-items-start">
        
        <Header />
        <Navbar />
        <div className="row" id="body">
          <Sidebar />
          <AppRoutes />
        </div>
        <Footer />
      </div>
    ) : (
      <NotFound />
    )}
  </> </LoginContext.Provider>

  );
}

export default App;
