'use client'

import AuthForm from "@/components/ui/auth-form"
import { supabase } from "@/supabase-client"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "react-hot-toast"

const SigninForm = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name,setName] = useState("")
  const router = useRouter()

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) {
      router.refresh()
    } else {
      toast.error("Wrong email or password")
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    // store name in user_metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }  // <-- store name here
      }
    })
    if (!error) {
      toast.success("Check your email for confirmation link!")
    } else {
      toast.error("Signup failed")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <AuthForm 
        name={name}
        setName={setName}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSignin={handleSignin}
        handleSignup={handleSignup}
      />
    </div>
  )
}

export default SigninForm
