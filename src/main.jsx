// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Komponentləri import edin
// Header komponenti artıq istifadə edilmir
import Sidebar from "./components/Sidebar.jsx"

// Səhifələri import edin
import HomePage from './pages/HomePage/HomePage.jsx';
// Gələcəkdə əlavə edəcəyiniz digər səhifələr
// import TasksPage from './pages/TasksPage/TasksPage.jsx';
// import ProjectsPage from './pages/ProjectsPage/ProjectsPage.jsx';

// Global CSS faylını import edin
import './assets/styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Əsas Dashboard Konteyneri */}
      <div className="dashboardContainer">
        {/* Header komponenti çıxarıldı */}

        {/* Əsas Məzmun Sahəsi: Sidebar və Səhifə Məzmununu Ehtiva edir */}
        <div className="mainContentArea">
          {/* Sidebar komponenti - Bütün səhifələrdə görünəcək */}
          <Sidebar />

          {/* Səhifə Məzmunu üçün Qablaşdırıcı */}
          <div className="pageContentWrapper">
            {/* React Router Routes - URL-ə əsasən səhifələri render edir */}
            <Routes>
              {/* Əsas (Home) Səhifə */}
              <Route path="/" element={<HomePage />} />

              {/* Əlavə Səhifə Yolları (Gələcək üçün nümunələr) */}
              {/* <Route path="/tasks" element={<TasksPage />} /> */}
              {/* <Route path="/projects" element={<ProjectsPage />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>,
);