import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin");
  }

  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    recentPosts,
  ] = await Promise.all([
    prisma.post.count(),

    prisma.post.count({
      where: {
        published: true,
      },
    }),

    prisma.post.count({
      where: {
        published: false,
      },
    }),

    prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        heading: true,
        category: true,
        published: true,
        createdAt: true,
      },
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#f4f6f8]">

      {/* TOP BAR */}
      <header className="h-[64px] bg-[#1f2933] text-white flex items-center justify-between px-6">

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#078B8D] flex items-center justify-center font-bold">
            T
          </div>

          <span className="font-semibold text-lg">
            TheTechGossip Admin
          </span>
        </div>

        <div className="flex items-center gap-4">

          <span className="text-sm text-gray-300">
            Welcome, Admin
          </span>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="text-sm text-gray-200 hover:text-white transition"
            >
              Logout
            </button>
          </form>

        </div>

      </header>


      <div className="flex min-h-[calc(100vh-64px)]">

        {/* SIDEBAR */}
        <aside className="w-[240px] bg-[#20282f] text-white hidden md:block">

          <div className="px-5 py-5 border-b border-gray-700">

            <div className="text-xs uppercase tracking-wider text-gray-400">
              Administration
            </div>

            <div className="mt-1 font-semibold">
              Dashboard
            </div>

          </div>


          <nav className="py-3">

            {/* DASHBOARD */}
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-5 py-3 bg-[#078B8D] text-white"
            >
              <span>▣</span>
              <span>Dashboard</span>
            </Link>


            {/* NEWS */}
            <Link
              href="/admin/news"
              className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-[#2c3740] hover:text-white transition"
            >
              <span>📰</span>
              <span>News</span>
            </Link>


            {/* ADD NEWS */}
            <Link
              href="/admin/add-news"
              className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-[#2c3740] hover:text-white transition"
            >
              <span>＋</span>
              <span>Add News</span>
            </Link>


            {/* ADMINS */}
            <Link
              href="/admin/admins"
              className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-[#2c3740] hover:text-white transition"
            >
              <span>👤</span>
              <span>Admins</span>
            </Link>


            {/* SETTINGS */}
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-[#2c3740] hover:text-white transition"
            >
              <span>⚙</span>
              <span>Settings</span>
            </Link>

          </nav>

        </aside>


        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 md:p-8">

          {/* PAGE TITLE */}
          <div className="mb-7">

            <h1 className="text-3xl font-semibold text-[#17212b]">
              Dashboard
            </h1>

            <p className="mt-1 text-gray-500">
              Manage your TheTechGossip website.
            </p>

          </div>


          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

            {/* TOTAL NEWS */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Total News
                  </p>

                  <p className="text-3xl font-bold text-[#17212b] mt-2">
                    {totalPosts}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-full bg-[#e6f7f7] text-[#078B8D] flex items-center justify-center text-xl">
                  📰
                </div>

              </div>

            </div>


            {/* PUBLISHED */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Published
                  </p>

                  <p className="text-3xl font-bold text-[#17212b] mt-2">
                    {publishedPosts}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xl">
                  ✓
                </div>

              </div>

            </div>


            {/* DRAFTS */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Drafts
                  </p>

                  <p className="text-3xl font-bold text-[#17212b] mt-2">
                    {draftPosts}
                  </p>
                </div>

                <div className="w-11 h-11 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center text-xl">
                  ✎
                </div>

              </div>

            </div>


            {/* WEBSITE */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Website
                  </p>

                  <p className="text-lg font-bold text-green-600 mt-3">
                    Online
                  </p>
                </div>

                <div className="w-11 h-11 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xl">
                  ●
                </div>

              </div>

            </div>

          </div>


          {/* LOWER SECTION */}
          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">


            {/* RECENT NEWS */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm">

              <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-semibold text-[#17212b]">
                    Recently Added News
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Your latest articles
                  </p>
                </div>

                <Link
                  href="/admin/news"
                  className="text-sm font-semibold text-[#078B8D] hover:text-[#0B1235]"
                >
                  View all →
                </Link>

              </div>


              <div>

                {recentPosts.length === 0 ? (
                  <div className="p-6 text-gray-500">
                    No news has been added yet.
                  </div>
                ) : (
                  recentPosts.map((post) => (

                    <div
                      key={post.id}
                      className="px-6 py-4 border-b border-gray-100 last:border-b-0 flex items-center justify-between gap-5"
                    >

                      <div className="min-w-0">

                        <h3 className="font-medium text-[#17212b] truncate">
                          {post.heading}
                        </h3>

                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">

                          <span>
                            {post.category}
                          </span>

                          <span>•</span>

                          <span>
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>

                        </div>

                      </div>


                      <span
                        className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                          post.published
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>

                    </div>

                  ))
                )}

              </div>

            </section>


            {/* QUICK ACTIONS */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm">

              <div className="px-6 py-5 border-b border-gray-200">

                <h2 className="text-lg font-semibold text-[#17212b]">
                  Quick Actions
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Common admin tasks
                </p>

              </div>


              <div className="p-6 space-y-3">

                <Link
                  href="/admin/add-news"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-[#078B8D] text-white font-semibold hover:bg-[#067779] transition"
                >
                  <span>+ Add New Article</span>
                  <span>→</span>
                </Link>


                <Link
                  href="/admin/news"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-gray-200 text-[#17212b] font-medium hover:bg-gray-50 transition"
                >
                  <span>Manage News</span>
                  <span>→</span>
                </Link>


                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-gray-200 text-[#17212b] font-medium hover:bg-gray-50 transition"
                >
                  <span>View Website</span>
                  <span>↗</span>
                </Link>

              </div>

            </section>

          </div>

        </main>

      </div>

    </div>
  );
}