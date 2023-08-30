import Layout from "@/components/Layout";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export default function PostPage({ frontmatter: { author, author_image, category, cover_image, date, excerpt, title }, content, slug }) {
  return <Layout>PostPage</Layout>;
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace(".md", "")
    }
  }));

  console.log(paths);

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
