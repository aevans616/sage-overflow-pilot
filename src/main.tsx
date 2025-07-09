import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Contact from './pages/Contact.tsx';
import Articles from './pages/Articles.tsx';
import SingleArticle from './pages/SingleArticle.tsx';
import Categories from './pages/Categories.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import Navigation from './components/Navigation.tsx';
import Sidebar from './components/Sidebar.tsx';
import Admin from './pages/Admin.tsx';
import NotFound from './pages/NotFound.tsx';
import ArticleForm from './pages/ArticleForm.tsx';
import PublishNewArticle from './pages/PublishNewArticle.tsx';

import '../custom-theme.scss';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Navigation />
    <div className='side-bar-wrapper d-flex flex-row '>
      <Sidebar />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/singlearticle/:id' element={<SingleArticle />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/form' element={<ArticleForm />} />
        <Route path='/publish' element={<PublishNewArticle />} />
        {/* //^ 404 page must be the last link */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  </BrowserRouter>
);
