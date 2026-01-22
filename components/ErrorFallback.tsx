"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function ErrorFallback({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return <div>Something went wrong: {error.message}</div>;
}

export default ErrorFallback;
