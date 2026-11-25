import PostList from "@/app/blog/PostList";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="relative -top-2.5 flex flex-col gap-y-4">
      <PostList posts={posts} />
    </div>
  );
}
