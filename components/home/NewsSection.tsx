"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getImageUrl } from "@/lib/imageUrl";

type Post = {
  id: number;
  heading: string;
  subHeading?: string | null;
  category: string;
  image?: string | null;
  content: string;
  slug: string;
  createdAt: string;
};

// Posts already shown in the Hero section (1 main + 2 side) are skipped here
const FEATURED_COUNT = 3;

// "channel-partner-local-marketing" -> "Channel Partner Local Marketing"
function prettifyCategory(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getExcerpt(post: Post, length = 150) {
  if (post.subHeading) return post.subHeading;
  const text = (post.content || "").replace(/\s+/g, " ").trim();
  return text.length > length ? `${text.slice(0, length).trim()}…` : text;
}

export default function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data: Post[] = await response.json();

        // Skip the posts already displayed in the Hero section
        setPosts(data.slice(FEATURED_COUNT));
      } catch (error) {
        console.error("Error loading news:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[380px] animate-pulse rounded-2xl bg-gray-200"
            />
          ))}
        </div>
      </section>
    );
  }

  // Nothing left after the featured posts: hide the section
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#0B1F4D] md:text-4xl">
          Latest News
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const summary = getExcerpt(post);

          return (
            <article
              key={post.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image (also a link) */}
              <Link
                href={`/news/${post.slug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#122858] to-[#0B1235]"
              >
                {post.image && (
                  <img
                    src={getImageUrl(post.image)}
                    alt={post.heading}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </Link>

              <div className="flex flex-1 flex-col p-6">
                {/* Category */}
                <span className="mb-4 inline-block max-w-full self-start truncate rounded-full bg-[#e6f5f4] px-3 py-1 text-xs font-semibold text-[#087f80]">
                  {prettifyCategory(post.category)}
                </span>

                {/* Heading inside Link */}
              


<Link href={`/news/${post.slug}`} className="block">
  <h3 className="line-clamp-3 text-xl font-bold leading-snug text-[#071b49] transition-colors duration-300 hover:underline hover:decoration-white hover:decoration-2 hover:underline-offset-4">
    {post.heading}
  </h3>
</Link>




                {/* Summary */}
                {summary && (
                  <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-gray-600">
                    {summary}
                  </p>
                )}

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="text-sm text-gray-400">
                    {formatDate(post.createdAt)}
                  </span>

                  <Link
                    href={`/news/${post.slug}`}
                    className="text-sm font-semibold text-[#078B8D] transition-colors hover:text-[#0B1235]"
                  >
                    Read more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}