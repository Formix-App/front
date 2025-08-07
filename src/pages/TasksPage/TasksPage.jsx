"use client"

import { useState } from "react"
import { Plus, Check, X, MessageSquare, Calendar, MoreVertical } from "lucide-react"
import "../../assets/styles/PageStyles/TasksPage/taskspage.css"

const TasksPage = () => {
  // Users data (6 istifadəçiyə artırıldı)
  const users = [
    {
      id: 1,
      name: "Kenan Qafarov",
      status: "active",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: 2,
      name: "Aynur Memmedova",
      status: "passive",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: 3,
      name: "Ramin Quliyev",
      status: "active",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f52b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: 4,
      name: "Nigar Abdullayeva",
      status: "passive",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654958?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: 5,
      name: "Orxan Ismayilov",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: 6,
      name: "Aysel Qurbanova",
      status: "passive",
      avatar: "https://images.unsplash.com/photo-1542155099-6e545464c8d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    },
  ]

  const [generalTasks, setGeneralTasks] = useState([
    {
      id: 1,
      text: "Yeni səhifə yazasan @kenanqafarov",
      assignedTo: "kenanqafarov",
      completed: false,
      author: "Aynur Məmmədova",
      createdAt: "2 hours ago",
    },
    {
      id: 2,
      text: "API dokumentasiyasını yoxla @raminquliyev",
      assignedTo: "raminquliyev",
      completed: false,
      author: "Kənan Qafarov",
      createdAt: "1 day ago",
    },
    {
      id: 3,
      text: "Dərsə hazırlaş @aynurmemmedova",
      assignedTo: "aynurmemmedova",
      completed: false,
      author: "Kənan Qafarov",
      createdAt: "5 hours ago",
    },
    {
      id: 4,
      text: "Dizaynı yoxla @nigarabdullayeva",
      assignedTo: "nigarabdullayeva",
      completed: true,
      author: "Ramin Quliyev",
      createdAt: "10 hours ago",
    },
  ])
  const [newGeneralTask, setNewGeneralTask] = useState("")

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Building a modern e-commerce solution",
      members: ["kenanqafarov", "aynurmemmedova", "raminquliyev", "orxanisgmayilov", "ayselqurbanova"],
      tasksCount: 12,
      completedTasks: 8,
      status: "active",
      dueDate: "2024-02-15",
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Cross-platform mobile application",
      members: ["raminquliyev", "kenanqafarov", "nigarabdullayeva"],
      tasksCount: 8,
      completedTasks: 3,
      status: "active",
      dueDate: "2024-03-01",
    },
  ])

  // Tasks state for each user
  const [userTasks, setUserTasks] = useState({
    1: [
      { id: 1, text: "Frontend üçün yeni komponentlər yarat", completed: false },
      { id: 2, text: "API inteqrasiyasını yoxla", completed: true },
    ],
    2: [{ id: 1, text: "Müştəri ilə görüş təşkil et", completed: false }],
    3: [
      { id: 1, text: "Hesabatı yekunlaşdır", completed: false },
      { id: 2, text: "Təlim materiallarını hazırla", completed: false },
      { id: 3, text: "Team iclasının protokolunu yaz", completed: true },
    ],
    4: [
      { id: 1, text: "Dizayn elementlərini yenilə", completed: false },
      { id: 2, text: "Sketch sənədlərini yoxla", completed: true },
    ],
    5: [
      { id: 1, text: "Database miqrasiyası et", completed: false },
      { id: 2, text: "Yeni API endpointləri yarat", completed: false },
    ],
    6: [
      { id: 1, text: "UX araşdırmasını tamamla", completed: false },
      { id: 2, text: "Feedback topla", completed: false },
    ],
  })

  const [newTaskInputs, setNewTaskInputs] = useState({
    1: "", 2: "", 3: "", 4: "", 5: "", 6: ""
  })

  const addGeneralTask = () => {
    if (newGeneralTask.trim() === "") return
    const mentionMatch = newGeneralTask.match(/@(\w+)/)
    const newTask = {
      id: Date.now(),
      text: newGeneralTask,
      assignedTo: mentionMatch ? mentionMatch[1] : null,
      completed: false,
      author: "You",
      createdAt: "just now",
    }
    setGeneralTasks([...generalTasks, newTask])
    setNewGeneralTask("")
  }

  const toggleGeneralTask = (taskId) => {
    setGeneralTasks(generalTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const deleteGeneralTask = (taskId) => {
    setGeneralTasks(generalTasks.filter((task) => task.id !== taskId))
  }

  const getMemberByUsername = (username) => {
    return users.find(
      (user) => user.name.toLowerCase().replace(" ", "") === username.toLowerCase(),
    )
  }
  const formatTaskText = (text) => {
    return text.replace(/@(\w+)/g, '<span class="mention">@$1</span>')
  }

  const addTask = (userId) => {
    const newTaskText = newTaskInputs[userId]
    if (newTaskText.trim() === "") return

    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    }

    setUserTasks((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), newTask],
    }))

    setNewTaskInputs((prev) => ({
      ...prev,
      [userId]: "",
    }))
  }

  const toggleTask = (userId, taskId) => {
    setUserTasks((prev) => ({
      ...prev,
      [userId]: (prev[userId] || []).map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    }))
  }

  const deleteTask = (userId, taskId) => {
    setUserTasks((prev) => ({
      ...prev,
      [userId]: (prev[userId] || []).filter((task) => task.id !== taskId),
    }))
  }

  return (
    <div className="tasks-page">
      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-column">
            <div className="user-header">
              <div className="user-avatar-container">
                <div className={`user-avatar ${user.status}`}>
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} />
                </div>
                <span className={`status-dot ${user.status}`}></span>
              </div>
              <div className="user-info">
                <h3 className="user-name">{user.name}</h3>
              </div>
            </div>
            <div className="task-input-section">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTaskInputs[user.id]}
                onChange={(e) =>
                  setNewTaskInputs((prev) => ({
                    ...prev,
                    [user.id]: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTask(user.id)
                }}
                className="task-input"
              />
              <button onClick={() => addTask(user.id)} className="add-task-btn">
                <Plus size={16} />
                Add
              </button>
            </div>
            <div className="tasks-list">
              {(userTasks[user.id] || []).map((task) => (
                <div key={task.id} className={`task-item generalTask ${task.completed ? "completed" : ""}`}>
                  <span className="task-text">{task.text}</span>
                  <div className="task-actions">
                    <button
                      onClick={() => toggleTask(user.id, task.id)}
                      className={`task-btn complete-btn ${task.completed ? "completed" : ""}`}
                    >
                      <Check size={16} />
                    </button>
                    <button onClick={() => deleteTask(user.id, task.id)} className="task-btn delete-btn">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="section-divider"></div>
      <section className="general-tasks-section">
        <div className="section-header">
          <h2>Ümumi Tapşırıqlar</h2>
          <span className="task-count">{generalTasks.length}</span>
        </div>
        <div className="task-input-container">
          <input
            type="text"
            placeholder="Tapşırıq əlavə edin və @username ilə təyin edin..."
            value={newGeneralTask}
            onChange={(e) => setNewGeneralTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addGeneralTask()}
            className="task-input"
          />
          <button onClick={addGeneralTask} className="add-button">
            <MessageSquare size={20} />
            Göndər
          </button>
        </div>
        <div className="tasks-list generalTasksList">
          {generalTasks.map((task) => (
            <div key={task.id} className={`task-item general ${task.completed ? "completed" : ""} generalTaskItem`}>
              <div className="task-content">
                <div className="task-header">
                  <span className="task-author">{task.author}</span>
                  <span className="task-time">{task.createdAt}</span>
                </div>
                <div className="task-text" dangerouslySetInnerHTML={{ __html: formatTaskText(task.text) }} />
                {task.assignedTo && (
                  <div className="assigned-to">
                    <div className="assignee">
                      <img
                        src={getMemberByUsername(task.assignedTo)?.avatar || "/placeholder.svg"}
                        alt={getMemberByUsername(task.assignedTo)?.name}
                        className="assignee-avatar"
                      />
                      <span>{getMemberByUsername(task.assignedTo)?.name}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="task-actions">
                <button onClick={() => toggleGeneralTask(task.id)} className="action-button complete">
                  <Check size={16} />
                </button>
                <button onClick={() => deleteGeneralTask(task.id)} className="action-button delete">
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="section-divider"></div>
      <section className="projects-section">
        <div className="section-header">
          <h2>Layihələr</h2>
          <button className="new-project-button">
            <Plus size={20} />
            Yeni Layihə
          </button>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <button className="project-menu">
                  <MoreVertical size={16} />
                </button>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-progress">
                <div className="progress-info">
                  <span>
                    {project.completedTasks}/{project.tasksCount} tapşırıq
                  </span>
                  <span>{Math.round((project.completedTasks / project.tasksCount) * 100)}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(project.completedTasks / project.tasksCount) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="project-footer">
                <div className="project-members">
                  {project.members.slice(0, 3).map((memberId) => {
                    const member = getMemberByUsername(memberId)
                    return (
                      <img
                        key={memberId}
                        src={member?.avatar || "/placeholder.svg"}
                        alt={member?.name}
                        className="member-avatar"
                        title={member?.name}
                      />
                    )
                  })}
                  {project.members.length > 3 && (
                    <span className="more-members">+{project.members.length - 3}</span>
                  )}
                </div>
                <div className="project-due">
                  <Calendar size={14} />
                  <span>{project.dueDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default TasksPage