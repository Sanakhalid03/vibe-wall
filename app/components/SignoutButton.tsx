'use client'
import LogOutButton from "@/components/ui/LogoutButton"
import { supabase } from "@/supabase-client"
import { useRouter } from "next/navigation"


const SignoutButton =() => {
const router=useRouter()
const handleSignout=async()=>{
await supabase.auth.signOut();
router.refresh()
}

  return (
    <>
  <LogOutButton onClick={handleSignout}/>
    </>
  )
}

export default SignoutButton