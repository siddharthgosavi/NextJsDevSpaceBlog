const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { error } = require("console");

function postData() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map(filename => {
    const slug = filename.replace(".md", "");

    const metaData = fs.readFileSync(path.join("posts", filename), "utf-8");

    const { data: frontmatter } = matter(metaData);

    return {
      frontmatter,
      slug
    };
  });

  return `export const posts = ${JSON.stringify(posts)}`;
}

try {
  fs.readdirSync("cache");
} catch (error) {
  fs.mkdirSync("cache");
}

fs.writeFile("cache/data.js", postData(), function (error) {
  if (error) return console.log(error);
  console.log("Posts Chached...");
});
