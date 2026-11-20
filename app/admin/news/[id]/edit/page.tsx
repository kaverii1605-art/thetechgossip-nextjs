
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

async function updateNews(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid news ID");
  }

  const heading = String(formData.get("heading") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const subHeading = String(formData.get("subHeading") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const image = String(formData.get("image") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const published = formData.get("published") === "on";

  if (!heading || !slug) {
    throw new Error("Heading and slug are required.");
  }

  await prisma.post.update({
    where: { id },
    data: {
      heading,
      slug,
      category,
      subHeading,
      content,
      image,
      author,
      published,
    },
  });

  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath(`/news/${slug}`);

  redirect("/admin/news");
}

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId) || postId <= 0) {
    notFound();
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-5 md:p-8">
      <div className="mx-auto max-w-4xl">

        <div className="mb-6">
          <Link
            href="/admin/news"
            className="text-sm font-medium text-[#078B8D] hover:underline"
          >
            ← Back to News
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Edit News
          </h1>
        </div>

        <form
          action={updateNews}
          className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <input type="hidden" name="id" value={post.id} />

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Heading *
            </label>
            <input
              name="heading"
              defaultValue={post.heading}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#078B8D]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Slug *
            </label>
            <input
              name="slug"
              defaultValue={post.slug}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#078B8D]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
            </label>
            <input
              name="category"
              defaultValue={post.category ?? ""}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#078B8D]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Subheading
            </label>
            <textarea
              name="subHeading"
              defaultValue={post.subHeading ?? ""}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#078B8D]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Featured Image URL
            </label>
            <input
              name="image"
              defaultValue={post.image ?? ""}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#078B8D]"
            />
            {post.image && (
              <img
                src={post.image}
                alt="Current featured image"
                className="mt-3 max-h-48 rounded-lg object-cover"
              />
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Author
            </label>
            <input
              name="author"
              defaultValue={post.author ?? ""}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#078B8D]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Article Content
            </label>
            <textarea
              name="content"
              defaultValue={post.content}
              rows={18}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm outline-none focus:border-[#078B8D]"
            />
            <p className="mt-2 text-xs text-gray-500">
              Existing HTML is preserved. Use paragraph and heading tags
              if you want formatted article sections.
            </p>
          </div>

          <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="published"
              defaultChecked={post.published}
              className="h-4 w-4 accent-[#078B8D]"
            />
            Publish this article
          </label>

          <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-5">
            <button
              type="submit"
              className="rounded-lg bg-[#078B8D] px-6 py-3 font-semibold text-white hover:bg-[#067476]"
            >
              Save Changes
            </button>

            <Link
              href="/admin/news"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>

      </div>
    </main>
  );
}
