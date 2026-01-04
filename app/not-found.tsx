"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div>
      <h1>404 - 페이지를 찾을 수 없습니다.</h1>
      <p>홈으로 이동합니다...</p>
    </div>
  );
}
