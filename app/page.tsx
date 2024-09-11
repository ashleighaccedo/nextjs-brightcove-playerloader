"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/vod")}>Go to Player</button>
    </div>
  );
}
