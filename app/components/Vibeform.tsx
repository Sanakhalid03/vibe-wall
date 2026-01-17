'use client'
import { useState } from "react";
import { addVibe } from "@/app/actions/vibeActions"
import Button from "@/components/ui/ButtonForm"
import Input from "@/components/ui/InputButton"
import { useRouter } from "next/navigation"

const Vibeform = ({ userId, name }: { userId: string; name: string }) => {
  const [content, setContent] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content) return
    await addVibe(content, userId, name)
    setContent("")
    router.refresh()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5">
          <Input content={content} setContent={setContent} />
          <Button />
        </div>
      </form>
    </div>
  )
}

export default Vibeform
