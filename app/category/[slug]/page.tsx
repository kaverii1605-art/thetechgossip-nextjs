
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type NewsPost = {
  id: string | number;
  heading: string;
  subHeading?: string | null;
  slug: string;
  category: string;
  image?: string | null;
  content?: string;
  author?: string | null;
  createdAt?: string;
  published?: boolean;
};

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const categorySlug = decodeURIComponent(params.slug).toLowerCase();

  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/posts");

        if (!response.ok) {
          throw new Error("Unable to load news articles.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected response from the news API.");
        }

        setPosts(data);
      } catch (err) {
        console.error("Category news error:", err);
        setError("We couldn't load the news. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const categoryPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        post.category?.toLowerCase() === categorySlug &&
        post.published !== false
    );
  }, [posts, categorySlug]);

  const categoryTitle = useMemo(() => {
    const categoryLabels: Record<string, string> = {
      "commerce-sales": "Commerce & Sales",
      "affiliate-marketing-management":
        "Affiliate Marketing & Management",
      "channel-partner-local-marketing":
        "Channel, Partner & Local Marketing",
      "conversational-intelligence": "Conversational Intelligence",
      "demand-generation": "Demand Generation",
      ecommerce: "Ecommerce",
      "content-experience": "Content & Experience",
      "marketing-technology": "Marketing Technology",
      "data-management": "Data Management",
      marketing: "Advertising & Promotion",
      adtech: "Adtech",
      "digital-marketing": "Digital Marketing",
      ai: "Artificial Intelligence",
      "machine-learning": "Machine Learning",
      "customer-experience": "Interviews",
    };

    return (
      categoryLabels[categorySlug] ||
      categorySlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    );
  }, [categorySlug]);

  return (
    <main className="min-h-screen bg-[#f5f8fc]">
      {/* Category heading */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#078B8D] mb-3">
            TheTechGossip
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#122858]">
            {categoryTitle}
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600 leading-7">
            Explore the latest news, updates, and insights in{" "}
            {categoryTitle}.
          </p>

          {!loading && !error && (
            <p className="mt-5 text-sm font-semibold text-slate-500">
              {categoryPosts.length}{" "}
              {categoryPosts.length === 1 ? "article" : "articles"}
            </p>
          )}
        </div>
      </section>

      {/* News articles */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 rounded-2xl bg-white border border-slate-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="bg-white border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-[#122858] text-white px-5 py-3 font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && categoryPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {categoryPosts.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link
                  href={`/news/${post.slug}`}
                  className="block h-full"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.heading}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#e6f5f4] to-[#edf2fa]">
                        <span className="text-4xl font-extrabold text-[#078B8D]">
                          TG
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <span className="inline-flex rounded-full bg-[#e6f5f4] px-3 py-1 text-xs font-bold text-[#078B8D]">
                      {categoryTitle}
                    </span>

                    <h2 className="mt-4 text-xl font-bold leading-snug text-[#122858] transition-colors group-hover:text-[#078B8D]">
                      {post.heading}
                    </h2>

                    {post.subHeading && (
                      <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
                        {post.subHeading}
                      </p>
                    )}

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs text-slate-500">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "Latest News"}
                      </span>

                      <span className="text-sm font-bold text-[#078B8D]">
                        Read Article →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && categoryPosts.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
            <div className="text-4xl mb-4">📰</div>
            <h2 className="text-2xl font-bold text-[#122858]">
              No articles yet
            </h2>
            <p className="mt-3 text-slate-600">
              There are currently no published articles in {categoryTitle}.
            </p>
            <Link
              href="/"
              className="inline-flex mt-6 rounded-lg bg-[#078B8D] px-5 py-3 font-semibold text-white transition hover:bg-[#066f72]"
            >
              Explore Latest News
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
