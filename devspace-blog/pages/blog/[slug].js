import CategoryLabel from "@/components/CategoryLabel";
import Layout from "@/components/Layout";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import path from "path";

export default function PostPage({ frontmatter: { author, author_image, category, cover_image, date, excerpt, title }, content, slug }) {
  console.log(author);

  return (
    <Layout title={title}>
      <Link className="text-sm font-bold text-blue-500" href={"/blog"}>
        {"> "}Go Back
      </Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-4xl md:font-bold mb-2 md:text-5xl">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <img src={cover_image} alt="coverImage" className="w-full rounded" />

        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <img src={author_image} alt="" className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" />
            <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>
        <div className="blog-text" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace(".md", "")
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWIthMeta = fs.readFileSync(path.join("posts", slug + ".md"), "utf-8");

  const { data: frontmatter, content } = matter(markdownWIthMeta);

  return {
    props: { frontmatter, content, slug }
  };
}
