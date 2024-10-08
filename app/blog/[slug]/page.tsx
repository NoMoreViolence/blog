import "./markdown.css";

import PostTag from "@/app/blog/[slug]/PostTag";
import { refineTags } from "@/app/blog/page";
import Link from "@/components/Link";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import overnight from "overnight/themes/Overnight-Slumber.json";
import rehypePrettyCode from "rehype-pretty-code";
import remarkSmartpants from "remark-smartypants";
import { remarkMdxEvalCodeBlock } from "./mdx";

overnight.colors["editor.background"] = "var(--code-bg)";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const filename = "./public/" + params.slug + "/index.mdx";
  const file = await readFile(filename, "utf8");
  let postComponents = {};
  try {
    postComponents = await import(
      "../../../public/" + params.slug + "/components.js"
    );
  } catch (e) {
    if (!e || e?.code !== "MODULE_NOT_FOUND") {
      throw e;
    }
  }

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
            ...postComponents,
          }}
          options={{
            mdxOptions: {
              useDynamicImport: true,
              remarkPlugins: [
                remarkSmartpants,
                [remarkMdxEvalCodeBlock, filename],
              ],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: overnight,
                  },
                ],
              ],
            },
          }}
        />
      </div>
      <div className="mt-2 text-[13px] text-charcoal-grey gap-x-2 flex">
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
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  return dirs.map((dir) => ({ slug: dir }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const file = await readFile("./public/" + params.slug + "/index.mdx", "utf8");
  let { data } = matter(file);
  return {
    title: data.title + " — Jihoon Lee",
    description: data.spoiler,
    alternates: { types: {} },
  };
}
