import "./markdown.css";

import PostTag from "@/app/blog/[slug]/PostTag";
import { refineTags } from "@/app/blog/page";
import Link from "@/components/Link";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkSmartpants from "remark-smartypants";
import { Metadata } from "next";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filename = "./public/" + slug + "/index.mdx";
  const file = await readFile(filename, "utf8");

  const { content, data } = matter(file);
  const replacedContent = content
    .replaceAll("\b", "")
    .replaceAll(String.fromCharCode(29), "");

  return (
    <article>
      <h1 className="text-4xl font-black text-charcoal-grey">{data.title}</h1>
      <p className="mt-2 text-md text-charcoal-grey">
        {new Date(data.date).toLocaleDateString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="markdown mt-10">
        <MDXRemote
          source={replacedContent}
          components={{
            a: Link,
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkSmartpants],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark",
                  },
                ],
              ],
            },
          }}
        />
      </div>
      <div className="mt-2 text-caption text-charcoal-grey gap-x-2 flex">
        {refineTags(data.tags).map((tag) => (
          <PostTag key={tag} tag={tag} />
        ))}
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const entries = await readdir("./public/", { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name);
  return dirs.map((dir) => ({ slug: dir }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const file = await readFile("./public/" + slug + "/index.mdx", "utf8");
  let { data } = matter(file);
  return {
    title: data.title + " — Jihoon Lee",
    description: data.spoiler,
    alternates: { types: {} },
  };
}
