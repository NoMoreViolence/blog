import Link from "@/components/Link";

export interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: "이지훈의 블로그",
  description: "A personal blog by Jihoon LEE",
};

export default async function Home() {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="w-full text-md font-light text-charcoal-grey">
        <p>소프트웨어 개발자 입니다.</p>
        <p>
          개발을 즐거워하고 개발을 통해서 세상에 가치를 주는 일을 하려고 합니다.
        </p>
        <p>취미는 러닝입니다. 꾸준히 달린지 3년정도 된 것 같아요.</p>
      </div>

      <div className="flex flex-col">
        <Link
          href="/blog"
          className="text-xl font-bold underline text-charcoal-grey"
        >
          블로그
        </Link>
      </div>
    </div>
  );
}
