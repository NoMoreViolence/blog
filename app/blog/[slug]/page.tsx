import "./markdown.css";

import PostTag from "@/app/blog/[slug]/PostTag";
import Link from "@/components/Link";
import { getPostSlugs, getPostSource } from "@/lib/posts";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkSmartpants from "remark-smartypants";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { post, content } = await getPostSource(slug);
  const replacedContent = content
    .replaceAll("\b", "")
    .replaceAll(String.fromCharCode(29), "");

  return (
    <article>
      <h1 className="text-4xl font-black text-charcoal-grey">{post.title}</h1>
      <p className="mt-2 text-md text-charcoal-grey">
        {post.date.toLocaleDateString("en", {
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
        {post.tags.map((tag) => (
          <PostTag key={tag} tag={tag} />
        ))}
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getPostSource(slug);
  return {
    title: post.title + " — Jihoon Lee",
    description: post.spoiler,
    alternates: { types: {} },
  };
}
