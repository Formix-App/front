import { create } from 'zustand'

const useChatStore = create((set) => ({
  conversations: [],
  activeConversationId: null,
  messages: [],
  setConversations: (conversations) => set({ conversations }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),
  setActiveConversation: (id) => set({ activeConversationId: id }),
}))

export default useChatStore
