'use client'

import { useEffect, useState } from "react";
import { supabase } from "@/supabase-client";
import SigninForm from "./components/SigninForm";
import SignoutButton from "@/app/components/SignoutButton";
import Vibeform from "@/app/components/Vibeform";
import VibeList from "./components/Vibelist";
import { AnimatedText } from "@/components/ui/animated-text";
import Pattern from "@/components/ui/Bg";

export default function Home() {
  const [session, setSession] = useState<any>(null)
  const [displayName, setDisplayName] = useState<string>("")

  // Get session
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      if (data.session?.user) {
        // Get display name from user_metadata
        setDisplayName(data.session.user.user_metadata.full_name || "")
      }
    }
    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess)
      if (sess?.user) setDisplayName(sess.user.user_metadata.full_name || "")
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  if (!session) return <SigninForm />

  return (
    <div className="w-full relative">
        <Pattern/>
      <div className="mt-5">
        <AnimatedText text="Vibe Wall"/>
      </div>
    
      <div className="fixed bottom-10 right-8 z-50">
        <SignoutButton />
      </div>   
      <div className="mt-20">
        <Vibeform userId={session.user.id} name={displayName} />
      </div>
      <VibeList userId={session.user.id} />
    </div>
  )
}
