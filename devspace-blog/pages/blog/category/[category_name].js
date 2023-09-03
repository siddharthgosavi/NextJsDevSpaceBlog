import Layout from "@/components/Layout";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Post from "@/components/Post";
import { getPosts } from "@/lib/posts";
import matter from "gray-matter";
import CategoryList from "@/components/CategoryList";

export default function CategoryBlogPage({ posts, category_name, uniqueCategories }) {
  return (
    <Layout title={category_name.toUpperCase() + " Posts"}>
      <div className="flex justify-between">
        <div className="w-full  md:w-3/4 mr-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 pt-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>

        <div className="hidden md:block w-1/4 mt-4">
          <CategoryList categories={uniqueCategories} />
        </div>
      </div>
      <Link href="/blog" className="block bg-black text-center border border-gray-100 text-white font-bold rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-black hover:bg-gray-100 focus:outline-none hover:shadow-md hover:shadow-gray-500 focus:shadow-outline w-full">
        All Posts
      </Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const categories = files.map(filename => {
    const markdownWIthMeta = fs.readFileSync(path.join("posts", filename), "utf-8");

    const { data: frontmatter } = matter(markdownWIthMeta);

    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map(category => ({
    params: {
      category_name: category
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { category_name } }) {
  const files = fs.readdirSync(path.join("posts"));

  const posts = getPosts();

  //Get categories for sidebar
  const categories = posts.map(post => post.frontmatter.category);

  const uniqueCategories = [...new Set(categories)];

  //Filter Posts by category
  const categoryPosts = posts.filter(post => post.frontmatter.category.toLowerCase() === category_name);

  return {
    props: { posts: categoryPosts, category_name, uniqueCategories }
  };
}
