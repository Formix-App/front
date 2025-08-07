import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../assets/styles/ComponentStyles/sidebar.css";
import {
  LayoutDashboard, ClipboardList, Briefcase, Users, BarChart2,
  DollarSign, Receipt, Settings, MessageSquare, HelpCircle,
  ChevronLeft, ChevronRight, Sun, Moon, LogOut
} from 'lucide-react';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <aside className={`dashboardSidebar ${isCollapsed ? 'dashboardSidebarCollapsed' : ''}`}>
      <div className="sidebarHeader">
        {!isCollapsed && (
          <div className="sidebarLogoContainer">
            <img src="https://placehold.co/30x30/E0BBE4/FFFFFF?text=F" alt="Formix" className="sidebarLogo" />
            <h2 className="sidebarTitle">Formix</h2>
          </div>
        )}
        <button onClick={toggleSidebar} className="sidebarToggleButton">
          {isCollapsed ? (
            <ChevronRight size={20} className="sidebarToggleIcon" />
          ) : (
            <ChevronLeft size={20} className="sidebarToggleIcon" />
          )}
        </button>
      </div>

      <nav className="sidebarNav">
        <h3 className="sidebarSectionTitle">Menyu</h3>
        <ul className="sidebarNavList">
          <li className="sidebarNavItem">
            <NavLink to="/" className={({ isActive }) => isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"}>
              <LayoutDashboard className="sidebarIcon" size={20} />
              {!isCollapsed && <span className="sidebarLinkText">Panel</span>}
            </NavLink>
          </li>
          <li className="sidebarNavItem">
            <NavLink to="/tasks" className={({ isActive }) => isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"}>
              <ClipboardList className="sidebarIcon" size={20} />
              {!isCollapsed && <span className="sidebarLinkText">Tapşırıqlar</span>}
            </NavLink>
          </li>
          <li className="sidebarNavItem">
            <NavLink to="/projects" className={({ isActive }) => isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"}>
              <Briefcase className="sidebarIcon" size={20} />
              {!isCollapsed && <span className="sidebarLinkText">Layihələr</span>}
            </NavLink>
          </li>
          <li className="sidebarNavItem">
            <NavLink to="/clients" className={({ isActive }) => isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"}>
              <Users className="sidebarIcon" size={20} />
              {!isCollapsed && <span className="sidebarLinkText">Müştərilər</span>}
            </NavLink>
          </li>
          <li className="sidebarNavItem">
            <NavLink to="/employee" className={({ isActive }) => isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"}>
              <Users className="sidebarIcon" size={20} />
              {!isCollapsed && <span className="sidebarLinkText">İşçilər</span>}
            </NavLink>
          </li>
          <li className="sidebarNavItem">
            <NavLink to="/reports" className={({ isActive }) => isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"}>
              <BarChart2 className="sidebarIcon" size={20} />
              {!isCollapsed && <span className="sidebarLinkText">Hesabatlar</span>}
            </NavLink>
          </li>
        </ul>

        <h3 className="sidebarSectionTitle">Maliyyə</h3>
        <ul className="sidebarNavList">
          <li className="sidebarNavItem">
            <NavLink to="/transactions" className={({ isActive }) => isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"}>
              <DollarSign className="sidebarIcon" size={20} />
              {!isCollapsed && <span className="sidebarLinkText">Əməliyyatlar</span>}
            </NavLink>
          </li>
          <li className="sidebarNavItem">
            <NavLink to="/invoices" className={({ isActive }) => isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"}>
              <Receipt className="sidebarIcon" size={20} />
              {!isCollapsed && <span className="sidebarLinkText">Qaimələr</span>}
            </NavLink>
          </li>
        </ul>

        <h3 className="sidebarSectionTitle">Alətlər</h3>
        <ul className="sidebarNavList">
          <li className="sidebarNavItem">
            <NavLink to="/settings" className={({ isActive }) => isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"}>
              <Settings className="sidebarIcon" size={20} />
              {!isCollapsed && <span className="sidebarLinkText">Ayarlar</span>}
            </NavLink>
          </li>
          <li className="sidebarNavItem">
            <NavLink to="/chat" className={({ isActive }) => isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"}>
              <MessageSquare className="sidebarIcon" size={20} />
              {!isCollapsed && <span className="sidebarLinkText">Chat</span>}
            </NavLink>
          </li>
          <li className="sidebarNavItem">
            <NavLink to="/help" className={({ isActive }) => isActive ? "sidebarLink sidebarLinkActive" : "sidebarLink"}>
              <HelpCircle className="sidebarIcon" size={20} />
              {!isCollapsed && <span className="sidebarLinkText">Kömək</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebarBottom">
        <li className={`sidebarNavItem sidebarLogout ${isCollapsed ? 'sidebarLogoutCollapsed' : ''}`}>
          <NavLink to="/logout" className="sidebarLink">
            <LogOut className="sidebarIcon" size={20} />
            {!isCollapsed && <span className="sidebarLinkText">Çıxış</span>}
          </NavLink>
        </li>

        <div className={`themeToggleWrapper ${isCollapsed ? 'themeToggleWrapperCollapsed' : ''}`}>
          {isCollapsed ? (
            <button
              onClick={toggleTheme}
              className="themeToggleIconButton"
              title="Mövzunu dəyiş"
            >
              {isDarkMode ? (
                <Sun size={20} className="themeToggleIcon" />
              ) : (
                <Moon size={20} className="themeToggleIcon" />
              )}
            </button>
          ) : (
            <div className="themeToggleContainer">
              <button
                onClick={toggleTheme}
                className={`themeToggleButton ${isDarkMode ? 'themeToggleButtonDark' : ''}`}
              >
                <div className="themeToggleSlider"></div>
                <Sun size={18} className="themeIcon themeIconSun" />
                <Moon size={18} className="themeIcon themeIconMoon" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
