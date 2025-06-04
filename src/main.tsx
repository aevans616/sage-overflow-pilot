import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Contact from './pages/Contact.tsx';
import Articles from './pages/Articles.tsx';
import Categories from './pages/Categories.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import Navigation from './components/Navigation.tsx';
import Sidebar from './components/Sidebar.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Navigation />
    <div className='side-bar-wrapper d-flex flex-row'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  </BrowserRouter>
);
