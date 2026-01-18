import PostList from "@/app/blog/PostList";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import trim from "lodash-es/trim";

export interface Post {
  date: Date;
  spoiler: string;
  slug: string;
  title: string;
  tags: string[];
}

export function refineTags(tags: string): string[] {
  return tags
    .split(",")
    .map(trim)
    .filter((tag) => tag.length > 0);
}

export async function getPosts(): Promise<Post[]> {
  const entries = await readdir("./public/", { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory() && entry.name !== "_fonts")
    .map((entry) => entry.name);
  const fileContents = await Promise.all(
    dirs.map((dir) => readFile("./public/" + dir + "/index.mdx", "utf8"))
  );
  const posts = dirs.map((slug, i) => {
    const fileContent = fileContents[i];
    const data = matter(fileContent).data as Record<
      keyof Omit<Post, "slug">,
      string
    >;
    return {
      ...data,
      slug,
      date: new Date(data.date),
      tags: refineTags(data.tags),
    };
  });
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="relative -top-2.5 flex flex-col gap-y-4">
      <PostList posts={posts} />
    </div>
  );
}
