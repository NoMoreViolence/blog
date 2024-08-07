import { Metadata } from "@/app/page";
import { Post } from "@/app/blog/page";
import { Feed, FeedOptions } from "feed";

export function generateFeed(posts: Post[], metadata: Metadata) {
  const site_url = "https://nomoreviolence.me/";

  const feedOptions: FeedOptions = {
    copyright: "All rights reserved 2024, Jihoon LEE",
    author: {
      name: "Jihoon Lee",
      email: "ljh86029926@gmail.com",
      link: site_url,
    },
    description: metadata.description,
    favicon: `${site_url}/icon.png`,
    feedLinks: { atom: `${site_url}atom.xml`, rss: `${site_url}rss.xml` },
    generator: "Feed for Node.js",
    id: site_url,
    image: "https://github.com/NoMoreViolence.png",
    link: site_url,
    title: metadata.title,
  };

  const feed = new Feed(feedOptions);

  for (const post of posts) {
    feed.addItem({
      date: new Date(post.date),
      description: post.spoiler,
      id: `${site_url}${post.slug}/`,
      link: `${site_url}${post.slug}/`,
      title: post.title,
    });
  }

  return feed;
}
