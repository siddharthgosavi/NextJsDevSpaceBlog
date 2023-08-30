import Layout from "@/components/Layout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Post from "@/components/Post";
import { sortByDate } from "utils";

export default function HomePage({ posts }) {
  return (
    <Layout>
      <h1 className="text-5xl pb-5 border-b-4 b-5 font-bold">Latest Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pt-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <Link href="/blog" className="block bg-black text-center border border-gray-100 text-white font-bold rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-black hover:bg-gray-100 focus:outline-none hover:shadow-md hover:shadow-gray-500 focus:shadow-outline w-full">
        All Posts
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map(filename => {
    const slug = filename.replace(".md", "");

    const markdownWIthMeta = fs.readFileSync(path.join("posts", filename), "utf-8");

    const { data: frontmatter } = matter(markdownWIthMeta);
    return {
      slug,
      frontmatter
    };
  });

  return {
    props: { posts: posts.sort(sortByDate).slice(0, 6) }
  };
}
