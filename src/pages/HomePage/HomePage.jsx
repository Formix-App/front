// src/pages/HomePage/HomePage.jsx
import React, { useState } from 'react';
import { UserPlus, FileText, CheckCircle } from 'lucide-react';
import "../../assets/styles/PageStyles/HomePage/homepage.css";

// Import the new components
import SummaryCards from '../../components/SummaryCard';
import TodoApp from '../../components/TodoApp';
import UsersTable from '../../components/UsersTable';
import StatisticsSection from '../../components/StatisticsSection';

function HomePage() {
  const summaryData = [
    { label: 'Total Projects', value: 125, icon: 'Briefcase' },
    { label: 'Pending Tasks', value: 48, icon: 'ClipboardX' },
    { label: 'Completed Tasks', value: 77, icon: 'ClipboardCheck' },
  ];

  const revenueChartData = [
    { label: 'Jan', value: 7000 },
    { label: 'Feb', value: 5000 },
    { label: 'Mar', value: 8500, highlight: true },
    { label: 'Apr', value: 4500 },
    { label: 'May', value: 8300 },
    { label: 'Jun', value: 2500 },
  ];

  const ourUsers = [
    { id: 1, firstName: 'Əli', lastName: 'Əliyev', fatherName: 'Həsən Oğlu', email: 'ali.aliyev@example.com', img: 'https://placehold.co/40x40/957DAD/FFFFFF?text=ƏA' },
    { id: 2, firstName: 'Aynur', lastName: 'Məmmədova', fatherName: 'Elçin Qızı', email: 'aynur.m@example.com', img: 'https://placehold.co/40x40/E0BBE4/6A5ACD?text=AM' },
    { id: 3, firstName: 'Ramin', lastName: 'Quliyev', fatherName: 'Fərid Oğlu', email: 'ramin.q@example.com', img: 'https://placehold.co/40x40/6A5ACD/FFFFFF?text=RQ' },
    { id: 4, firstName: 'Nigar', lastName: 'Hüseynova', fatherName: 'Tural Qızı', email: 'nigar.h@example.com', img: 'https://placehold.co/40x40/957DAD/FFFFFF?text=NH' },
    { id: 5, firstName: 'Elvin', lastName: 'Cəfərov', fatherName: 'Murad Oğlu', email: 'elvin.c@example.com', img: 'https://placehold.co/40x40/E0BBE4/6A5ACD?text=EC' },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', status: 'Online', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' },
    { id: 2, name: 'Jane Smith', status: 'Offline', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' },
    { id: 3, name: 'Alex Johnson', status: 'Online', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f52b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' },
  ];

  const activities = [
    {
      id: 1,
      icon: <UserPlus size={20} />,
      title: 'New user registered',
      description: 'A new member has joined the community.',
      time: 'Just now'
    },
    {
      id: 2,
      icon: <FileText size={20} />,
      title: 'Report generated',
      description: 'Monthly revenue report has been created.',
      time: '15 min ago'
    },
    {
      id: 3,
      icon: <CheckCircle size={20} />,
      title: 'Task completed',
      description: 'The dashboard redesign task is finished.',
      time: '1 hour ago'
    },
  ];

  const [todos, setTodos] = useState([
    { id: 1, text: 'Müştəri görüşü üçün hazırlıq', completed: false },
    { id: 2, text: 'Yeni layihə təklifini nəzərdən keçir', completed: true },
    { id: 3, text: 'Komanda iclasını planlaşdır', completed: false },
  ]);

  const addTodo = (newTodoText) => {
    if (newTodoText.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="homePageContainer">
      <SummaryCards data={summaryData} />

      <div className="mainDashboardGrid">
        <div className="leftPanel">
          <StatisticsSection revenueChartData={revenueChartData} />
          <div className="recentUsersCard">
            <h3 className="recentUsersTitle">Recent Users</h3>
            <ul className="recentUsersList">
              {recentUsers.map(user => (
                <li key={user.id} className="recentUserItem">
                  <img src={user.avatar} alt={user.name} className="userAvatar" />
                  <div className="userDetails">
                    <span className="userName">{user.name}</span>
                    <span className={`userStatus ${user.status.toLowerCase()}`}>{user.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <UsersTable users={ourUsers} />
        </div>

        <div className="rightPanel">
          <div className="recentActivitiesCard">
            <h3 className="recentActivitiesTitle">Recent Activities</h3>
            <ul className="activitiesList">
              {activities.map(activity => (
                <li key={activity.id} className="activityItem">
                  <div className="activityIconContainer">{activity.icon}</div>
                  <div className="activityDetails">
                    <span className="activityTitle">{activity.title}</span>
                    <p className="activityDescription">{activity.description}</p>
                  </div>
                  <span className="activityTime">{activity.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <TodoApp
            todos={todos}
            addTodo={addTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;