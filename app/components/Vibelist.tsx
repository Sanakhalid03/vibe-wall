'use client'
import { useEffect, useState } from "react";
import { supabase } from "@/supabase-client";
import { deleteVibe } from "@/app/actions/vibeActions";
import Card from "@/components/Cards";

interface Vibe {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  name: string;
}

export default function VibeList({ userId }: { userId: string }) {
  const [vibes, setVibes] = useState<Vibe[]>([]);

  useEffect(() => {
    const fetchVibes = async () => {
      const { data, error } = await supabase
        .from("vibes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) return console.error(error);
      if (data) setVibes(data as Vibe[]);
    }

    fetchVibes();

    const subscription = supabase
      .channel("vibes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "vibes" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setVibes(prev => [payload.new as Vibe, ...prev])
          }
          if (payload.eventType === "DELETE") {
            setVibes(prev => prev.filter(v => v.id !== payload.old.id))
          }
        }
      )
      .subscribe();

    return () =>{ supabase.removeChannel(subscription)}
  }, [])

  function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); 

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    return date.toLocaleDateString();
  }

  return (
    <div className=" mt-10 px-5 w-full grid gap-6 grid-cols-1  sm:grid-cols-2 sm:justify-items-stretch md:grid-cols-3 lg:grid-cols-4 ">
      {vibes.map((vibe) => (
        <Card id={vibe.id} name={vibe.name} time={timeAgo(vibe.created_at)} content={vibe.content} canDelete={vibe.user_id === userId} onDelete={() => deleteVibe(vibe.id)}/>
      ))}
    </div>
  )
}
