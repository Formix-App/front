// src/components/StatisticsSection/StatisticsSection.jsx

import React, { useState } from 'react';
import {
  ArrowUpRight, ChevronLeft, ChevronRight, ArrowUp, UserPlus, FileText, CheckCircle
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register the components you need
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

// Import styles
import "../assets/styles/ComponentStyles/statistics.css"

function StatisticsSection({ revenueChartData = [] }) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth()));
  const [activeDay, setActiveDay] = useState(today.getDate());

  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);

    const isCurrentMonth = newDate.getFullYear() === today.getFullYear() && newDate.getMonth() === today.getMonth();
    setActiveDay(isCurrentMonth ? today.getDate() : "");
  };

  const getDaysInMonth = (year, month) => {
    const days = [];
    const totalDays = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();

    const startingOffset = startDay === 0 ? 6 : startDay - 1;

    for (let i = 0; i < startingOffset; i++) {
        days.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(day);
    }
    return days;
  };
  
  const growthPercentage = 65;
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const chartData = {
    labels: revenueChartData.map(data => data.label),
    datasets: [
      {
        type: 'line',
        label: 'Line Data',
        data: revenueChartData.map(data => data.value),
        borderColor: '#957DAD',
        borderWidth: 3,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(149, 125, 173, 0.0)');
          gradient.addColorStop(1, 'rgba(149, 125, 173, 0.5)');
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBackgroundColor: '#957DAD',
      },
      {
        type: 'bar',
        label: 'Bar Data',
        data: revenueChartData.map(data => data.value),
        backgroundColor: 'rgba(149, 125, 173, 0.3)',
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#bbb',
          font: {
            size: 12
          }
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#bbb',
          callback: function(value) {
            return `${value / 1000}K`;
          },
          stepSize: 1000,
          font: {
            size: 12
          }
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#2e2e4a',
        titleColor: '#fff',
        bodyColor: '#bbb'
      },
    },
  };
  
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

  const recentUsers = [
    { id: 1, name: 'John Doe', status: 'Online', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' },
    { id: 2, name: 'Jane Smith', status: 'Offline', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' },
    { id: 3, name: 'Alex Johnson', status: 'Online', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f52b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' },
  ];

  return (
    <div className="homePageStatisticsSection">
      <div className="leftSideContent">
        {/* Total Revenue Qrafiki */}
        <div className="totalRevenueChartCard">
          <div className="chartCardHeader">
            <h2 className="chartCardTitle">Total Revenue</h2>
            <button className="chartCardActionButton">
              <ArrowUpRight size={20} />
            </button>
          </div>
          <div className="chartContainer">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* New Recent Users Card */}
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
      </div>

      {/* Sağ Tərəf Kartları */}
      <div className="rightSideCards">
        {/* Təqvim Kartı */}
        <div className="calendarCard">
          <div className="calendarHeader">
            <button className="calendarArrowButton" onClick={() => handleMonthChange(-1)}>
              <ChevronLeft size={18} />
            </button>
            <span className="calendarMonthYear">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button className="calendarArrowButton" onClick={() => handleMonthChange(1)}>
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="calendarDaysOfWeek">
            {daysOfWeek.map(day => <span key={day}>{day}</span>)}
          </div>
          <div className="calendarDates">
            {getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()).map((day, index) => (
              <span
                key={index}
                className={`calendarDate ${activeDay === day ? 'calendarDateActive' : ''}`}
                onClick={() => day !== null && setActiveDay(day)}
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Community Growth Kartı */}
        <div className="communityGrowthCard">
          <h3 className="communityGrowthTitle">Community growth</h3>
          <div className="communityGrowthContent">
            <div className="growthIndicator">
              <ArrowUp size={16} className="growthArrowIcon" />
              <span className="growthPercentage">0.9%</span>
              <span className="growthText">from last month</span>
            </div>
            <div className="growthCircleChart" style={{ '--progress': `${growthPercentage}%` }}>
              <div className="circleChartInner">
                <span className="circleChartPercentage">{growthPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities Card */}
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
      </div>
    </div>
  );
}

export default StatisticsSection;