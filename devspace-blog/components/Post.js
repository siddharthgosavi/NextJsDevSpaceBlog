import Image from "next/image";
import Link from "next/link";
import CategoryLabel from "./CategoryLabel";

export default function Post({ post, compact }) {
  return (
    <div className=" w-full px-10 py-6 bg-white border-gray-100  rounded-lg shadow-md shadow-gray-400  mt-6">
      <div className="overflow-hidden">{!compact && <Image src={post.frontmatter.cover_image} alt="post image" height={420} width={600} className="overflow-hidden mb-4 rounded  hover:rounded hover:scale-105 duration-200" />}</div>

      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">{post.frontmatter.date}</span>
        <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
      </div>

      <div className="mt-2">
        <Link href={`/blog/${post.slug}`} className="text-2xl text-gray-700 font-bold hover:underline duration-200 hover:text-slate-800">
          {post.frontmatter.title}
        </Link>

        <p className="mt-2 text-gray-600">{post.frontmatter.excerpt}</p>
      </div>

      {!compact && (
        <div className="flex justify-between items-center mt-6">
          <Link href={`/blog/${post.slug}`} className="text-gray-900 hover:text-blue-600 font-bold">
            Read More..
          </Link>

          <div className="flex items-center">
            <img className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src={post.frontmatter.author_image}></img>
            <h3 className="text-gray-700 font-bold">{post.frontmatter.author}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
