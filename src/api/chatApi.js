import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const fetchConversations = async () => {
  const { data, error } = await supabase.from("conversations").select("*").order("updated_at", { ascending: false })
  if (error) throw error
  return data
}

export const fetchMessages = async (conversationId) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
  if (error) throw error
  return data
}

export const sendMessage = async ({ conversation_id, sender, content }) => {
  const { data, error } = await supabase.from("messages").insert([{ conversation_id, sender, content }])
  if (error) throw error
  return data[0]
}

export const subscribeToMessages = (conversationId, onNewMessage) => {
  return supabase
    .channel("realtime-messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        onNewMessage(payload.new)
      }
    )
    .subscribe()
}
