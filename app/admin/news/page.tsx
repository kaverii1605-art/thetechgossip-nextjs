
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getImageUrl } from "@/lib/imageUrl";

export const dynamic = "force-dynamic";

async function deleteNews(formData: FormData) {
  "use server";

  

  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid news ID");
  }

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/admin/news");
  revalidatePath("/news");

  redirect("/admin/news");
}

export default async function AdminNewsPage() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 p-5 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage News
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              View, edit and delete your news articles.
            </p>
          </div>

          <Link
            href="/admin/add-news"
            className="rounded-lg bg-[#078B8D] px-5 py-3 font-semibold text-white hover:bg-[#067476]"
          >
            + Add News
          </Link>
        </div>

        {/* NEWS COUNT */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total News Articles</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">
            {posts.length}
          </p>
        </div>

        {/* NEWS TABLE */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-5 py-4 font-semibold">News</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Author</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">

                    {/* TITLE AND IMAGE */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {post.image ? (
                          <img
                            src={getImageUrl(post.image)}
                            alt=""
                            className="h-14 w-20 rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex h-14 w-20 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">
                            No image
                          </div>
                        )}

                        <div className="max-w-xs">
                          <p className="font-semibold text-gray-900">
                            {post.heading}
                          </p>
                          <p className="mt-1 truncate text-xs text-gray-500">
                            {post.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {post.category || "—"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {post.author || "—"}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      {new Date(post.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    {/* PUBLISHED STATUS */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          post.published
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-3">

                        <Link
                          href={`/admin/news/${post.id}/edit`}
                          className="rounded-md bg-blue-50 px-3 py-2 font-medium text-blue-700 hover:bg-blue-100"
                        >
                          Edit
                        </Link>

                        <form action={deleteNews}>
                          <input
                            type="hidden"
                            name="id"
                            value={post.id}
                          />

                          <button
                            type="submit"
                            className="rounded-md bg-red-50 px-3 py-2 font-medium text-red-700 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </form>

                      </div>
                    </td>
                  </tr>
                ))}

                {posts.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-16 text-center text-gray-500"
                    >
                      No news articles found. Add your first news article.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
