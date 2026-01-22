"use client";

import { Post } from "@/app/blog/page";
import Link from "@/components/Link";
import { groupBy, map, mapValues } from "lodash-es";
import { useRouter, useSearchParams } from "next/navigation";

export default function PostList({ posts }: { posts: Post[] }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag");
  const countsByTag = mapValues(
    groupBy(posts.flatMap((post) => post.tags)),
    (tags) => tags.length
  );

  return (
    <div>
      <div className="flex gap-x-4 py-4">
        {map(countsByTag, (count, tag) => (
          <a
            key={tag}
            className={`text-sm underline cursor-pointer ${
              selectedTag === tag ? " font-bold" : ""
            }`}
            onClick={(e) => {
              if (tag === selectedTag) {
                router.push(`?`);
              } else {
                router.push(`?tag=${tag}`);
              }
            }}
          >
            {tag}({count})
          </a>
        ))}
      </div>
      <div>
        {posts
          .filter((post) => !selectedTag || post.tags.includes(selectedTag))
          .map((post) => {
            return (
              <Link
                style={{}}
                key={post.slug}
                className="block py-8 hover:scale-[1.005] border-b border-gray-200"
                href={"/blog/" + post.slug + "/"}
              >
                <article>
                  <h2 className="text-3xl text-charcoal-grey font-black">
                    {post.title}
                  </h2>
                  <p className="text-caption text-charcoal-grey">
                    {new Date(post.date).toLocaleDateString("en", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="mt-1">{post.spoiler}</p>
                </article>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
