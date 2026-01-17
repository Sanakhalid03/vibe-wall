import { supabase } from "@/supabase-client"

export async function addVibe(content: string, userId: string, name: string) {
  if (!content || !userId) return
  await supabase.from("vibes").insert({ content, user_id: userId, name })
}


export async function deleteVibe(vibeId: string) {
  if (!vibeId) return
  await supabase.from("vibes").delete().eq("id", vibeId)
}
