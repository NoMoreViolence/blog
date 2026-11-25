"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ErrorPage({ error }: { error: unknown }) {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  const message = error instanceof Error ? error.message : String(error);

  return <div>Something went wrong: {message}</div>;
}
