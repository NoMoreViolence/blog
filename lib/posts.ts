import { existsSync } from "fs";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import trim from "lodash-es/trim";
import path from "path";

const POSTS_DIR = "./public";

export interface Post {
  date: Date;
  spoiler: string;
  slug: string;
  title: string;
  tags: string[];
}

export function refineTags(tags: unknown): string[] {
  if (typeof tags !== "string") {
    return [];
  }
  return tags
    .split(",")
    .map(trim)
    .filter((tag) => tag.length > 0);
}

function postFile(slug: string) {
  return path.join(POSTS_DIR, slug, "index.mdx");
}

function toText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** A post is a non-underscored folder in `public/` that holds an `index.mdx`. */
export async function getPostSlugs(): Promise<string[]> {
  const entries = await readdir(POSTS_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .filter((slug) => existsSync(postFile(slug)));
}

export async function getPostSource(slug: string) {
  const file = await readFile(postFile(slug), "utf8");
  const { content, data } = matter(file);
  const post: Post = {
    slug,
    title: toText(data.title),
    spoiler: toText(data.spoiler),
    date: new Date(toText(data.date)),
    tags: refineTags(data.tags),
  };
  return { post, content };
}

export async function getPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => (await getPostSource(slug)).post),
  );
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}
