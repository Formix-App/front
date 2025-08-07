"use client"

import { useState, useEffect } from "react"
import "../../assets/styles/PageStyles/ChatPage/chatpage.css"
import {
  Search,
  Plus,
  ChevronDown,
  Users,
  Phone,
  Video,
  Info,
  Paperclip,
  Smile,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Edit3,
  Smartphone,
  Mail,
  Calendar,
  User,
  MessageSquare,
} from "lucide-react"

// Custom hook to detect if the screen is mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)") // Using 1024px as the breakpoint for profile sidebar
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    setIsMobile(mediaQuery.matches) // Set initial state
    mediaQuery.addEventListener("change", handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
    }
  }, [])

  return isMobile
}

// A helper function to generate the avatar URL using the iran.liara.run API
const getAvatarUrl = (entity) => {
  if (entity.avatar && !entity.avatar.includes("placeholder.svg")) {
    return entity.avatar
  }
  if (entity.name === "You" || entity.name === "System") {
    return "/placeholder.svg?height=48&width=48"
  }
  const names = entity.name.split(" ")
  const firstName = names[0] || ""
  const lastName = names.length > 1 ? names[names.length - 1] : ""
  const username = `${encodeURIComponent(firstName)}+${encodeURIComponent(lastName)}`
  return `https://avatar.iran.liara.run/username?username=${username}`
}

const ChatPage = () => {
  const isMobile = useIsMobile()
  const [activeConversationId, setActiveConversationId] = useState(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  useEffect(() => {
    if (!isMobile) {
      setIsProfileOpen(true)
    } else {
      setIsProfileOpen(false)
    }
  }, [isMobile])

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Art Williams",
      preview: "Hey man, I wanted to ask...",
      time: "Now",
      avatar: "",
      unread: 2,
      online: false,
      title: "Frontend Developer",
      phone: "+430 555 1234",
      email: "art.williams@email.com",
      birthDate: "15/08/1988",
      gender: "Male",
      messages: [
        {
          id: 1,
          sender: "Art Williams",
          content: "Hey man, I wanted to ask about the new project requirements.",
          time: "2:15 PM",
          type: "received",
          avatar: "",
        },
        {
          id: 2,
          sender: "Art Williams",
          content: "Do you have time for a quick call?",
          time: "2:16 PM",
          type: "received",
          avatar: "",
        },
      ],
    },
    {
      id: 2,
      name: "Nick Blanche",
      preview: "Nice Job!!",
      time: "Today",
      avatar: "",
      unread: 0,
      online: true,
      title: "Backend Developer",
      phone: "+430 555 5678",
      email: "nick.blanche@email.com",
      birthDate: "22/03/1992",
      gender: "Male",
      messages: [
        {
          id: 1,
          sender: "You",
          content: "Just finished the authentication module",
          time: "1:30 PM",
          type: "sent",
          avatar: getAvatarUrl({ name: "You" }),
        },
        {
          id: 2,
          sender: "Nick Blanche",
          content: "Nice Job!! That was quick work.",
          time: "1:45 PM",
          type: "received",
          avatar: "",
        },
      ],
    },
    {
      id: 3,
      name: "Richard McMasters",
      preview: "Welcome to the group.",
      time: "Tuesday",
      avatar: "",
      unread: 0,
      online: false,
      title: "Project Manager",
      phone: "+430 555 9012",
      email: "richard.mcmasters@email.com",
      birthDate: "10/11/1985",
      gender: "Male",
      messages: [
        {
          id: 1,
          sender: "Richard McMasters",
          content: "Welcome to the group. Looking forward to working with you!",
          time: "Tuesday",
          type: "received",
          avatar: "",
        },
      ],
    },
    {
      id: 5,
      name: "Art Williams, Nick B...",
      preview: "Richard Joined!",
      time: "Yesterday",
      avatar: "",
      unread: 0,
      online: true,
      title: "Group Chat",
      phone: "Group",
      email: "group@email.com",
      birthDate: "N/A",
      gender: "N/A",
      messages: [
        {
          id: 1,
          sender: "Art Williams",
          content: "Hey everyone!",
          time: "Yesterday",
          type: "received",
          avatar: getAvatarUrl({ name: "Art Williams" }),
        },
        {
          id: 2,
          sender: "System",
          content: "Richard Joined!",
          time: "Yesterday",
          type: "system",
          avatar: "",
        },
      ],
    },
  ])

  const activeConversation = conversations.find((conv) => conv.id === activeConversationId)
  const [message, setMessage] = useState("")

  const handleConversationClick = (conversationId) => {
    setActiveConversationId(conversationId)
    const conversation = conversations.find((conv) => conv.id === conversationId)
    if (conversation) {
      setConversations((prevConversations) =>
        prevConversations.map((conv) => (conv.id === conversationId ? { ...conv, unread: 0 } : conv)),
      )
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = {
        id: activeConversation.messages.length + 1,
        sender: "You",
        content: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "sent",
        avatar: getAvatarUrl({ name: "You" }),
      }
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                preview: message,
                time: "Now",
              }
            : conv,
        ),
      )
      setMessage("")
    }
  }

  const toggleProfileSidebar = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const renderMessages = () => {
    if (!activeConversation) return null

    const messages = activeConversation.messages
    return messages.map((msg, index) => {
      const isSystemMessage = msg.type === "system"
      const isLastMessageBySender = index === messages.length - 1 || messages[index + 1].sender !== msg.sender
      const showTime = isLastMessageBySender && !isSystemMessage

      return (
        <div key={msg.id} className={`message ${msg.type}`}>
          <div className="message-content">
            <div className="message-bubble">
              {msg.content}
              {msg.image && (
                <img src={msg.image || "/placeholder.svg"} alt="Shared" className="message-image" />
              )}
            </div>
            {showTime && <div className="message-time">{msg.time}</div>}
          </div>
        </div>
      )
    })
  }

  return (
    <div className="chat-container">
      {/* Left Sidebar - Conversations */}
      <div className="conversations-sidebar">
        <div className="search-header">
          <div className="search-container">
            <span className="search-icon">
              <Search size={16} />
            </span>
            <input type="text" placeholder="Search Conversations" className="search-input" />
            <button className="add-conversation">
              <Plus size={20} />
            </button>
          </div>
        </div>
        <div className="conversations-list">
          <div className="recent-label">
            Recent <ChevronDown size={12} />
          </div>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item ${conversation.id === activeConversationId ? "active" : ""}`}
              onClick={() => handleConversationClick(conversation.id)}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={getAvatarUrl(conversation)}
                  alt={conversation.name}
                  className="conversation-avatar"
                />
                {conversation.online && <div className="online-indicator"></div>}
              </div>
              <div className="conversation-info">
                <div className="conversation-name">{conversation.name}</div>
                <div className="conversation-preview">{conversation.preview}</div>
              </div>
              <div className="conversation-meta">
                <div className="conversation-time">{conversation.time}</div>
                {conversation.unread > 0 && <div className="unread-badge">{conversation.unread}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {activeConversation ? (
          <>
            <div className="chat-header">
              <div className="chat-user-info">
                <img
                  src={getAvatarUrl(activeConversation)}
                  alt={activeConversation.name}
                  className="chat-avatar"
                />
                <div className="chat-user-details">
                  <h3>{activeConversation.name}</h3>
                  <div className="chat-user-status">
                    {activeConversation.online && <span className="status-dot"></span>}
                    {activeConversation.online ? "Online" : "Offline"}
                  </div>
                </div>
              </div>
              <div className="chat-actions">
                <button className="chat-action-btn">
                  <Users size={20} />
                </button>
                <button className="chat-action-btn">
                  <Phone size={20} />
                </button>
                <button className="chat-action-btn">
                  <Video size={20} />
                </button>
                <button className="chat-action-btn" onClick={toggleProfileSidebar}>
                  <Info size={20} />
                </button>
              </div>
            </div>
            <div className="chat-messages">
              <div className="date-divider">
                <span className="date-text">Today</span>
              </div>
              {renderMessages()}
            </div>
          </>
        ) : (
          <div className="no-conversation-selected-container">
            <MessageSquare size={64} className="no-conversation-selected-icon" />
            <h2 className="no-conversation-selected-title">Select a conversation to start chatting</h2>
            <p className="no-conversation-selected-text">Your messages will appear here.</p>
          </div>
        )}
        <div className="message-input-container">
          <form onSubmit={handleSendMessage}>
            <div className="message-input-wrapper">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="message-input"
              />
              <div className="input-actions">
                <button type="button" className="input-action-btn">
                  <Paperclip size={18} />
                </button>
                <button type="button" className="input-action-btn">
                  <Smile size={18} />
                </button>
                <button type="submit" className="input-action-btn send-btn">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right Sidebar - Profile */}
      <div className={`profile-sidebar ${isProfileOpen ? "open" : ""}`}>
        {activeConversation && (
          <>
            <div className="profile-header">
              <img
                src={getAvatarUrl(activeConversation)}
                alt={activeConversation.name}
                className="profile-avatar"
              />
              <h2 className="profile-name">{activeConversation.name}</h2>
              <p className="profile-title">{activeConversation.title}</p>
              <div className="profile-social">
                <button className="social-btn">
                  <Facebook size={16} />
                </button>
                <button className="social-btn">
                  <Twitter size={16} />
                </button>
                <button className="social-btn">
                  <Linkedin size={16} />
                </button>
              </div>
              <button className="edit-profile-btn">
                <Edit3 size={16} /> EDIT PROFILE
              </button>
            </div>
            <div className="profile-details">
              <div className="detail-item">
                <div className="detail-label">Mobile</div>
                <div className="detail-value">
                  <span className="detail-icon">
                    <Smartphone size={16} />
                  </span>
                  {activeConversation.phone}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Email</div>
                <div className="detail-value">
                  <span className="detail-icon">
                    <Mail size={16} />
                  </span>
                  {activeConversation.email}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Date of Birth</div>
                <div className="detail-value">
                  <span className="detail-icon">
                    <Calendar size={16} />
                  </span>
                  {activeConversation.birthDate}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Gender</div>
                <div className="detail-value">
                  <span className="detail-icon">
                    <User size={16} />
                  </span>
                  {activeConversation.gender}
                </div>
              </div>
              <div className="detail-item">
                <div className="shared-media-header">
                  <div className="detail-label">Shared Media</div>
                  <a href="#" className="see-all-btn">
                    See All
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ChatPage