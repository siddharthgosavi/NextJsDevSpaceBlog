import Layout from "../components/Layout";

export default function about() {
  return (
    <Layout title="About DevSpace">
      <h1 className="text-5xl border-b-4 pb-5 font-bold">About</h1>
      <div className="w-full px-10 py-6 bg-gray-100 border-gray-100  rounded-lg shadow-md shadow-gray-400  mt-6">
        <h3 className="text-3xl mb-5">DevSpace Blog</h3>
        <p className="mb-3">This is a blog build with NextJs/MarkDown and TailwindCss</p>
        <p>
          <span className="font-bold">Version1.0.0</span>
        </p>
      </div>
    </Layout>
  );
}
