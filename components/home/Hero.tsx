"use client";

import { useEffect, useState } from "react";

import HeroMain from "./HeroMain";
import HeroSideCard from "./HeroSideCard";
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

export default function Hero() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch("/api/posts");

        if (!response.ok) {
          throw new Error("Failed to load posts");
        }

        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.error("Hero news loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-[#F7F8FA] py-8">
        <div className="max-w-[1400px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
            <div className="h-[560px] rounded-2xl bg-gray-200 animate-pulse" />

            <div className="grid grid-rows-2 gap-5">
              <div className="h-[267px] rounded-2xl bg-gray-200 animate-pulse" />
              <div className="h-[267px] rounded-2xl bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="w-full bg-[#F7F8FA] py-8">
        <div className="max-w-[1400px] mx-auto px-5">
          <p className="text-gray-500">No news available.</p>
        </div>
      </section>
    );
  }

  const mainPost = posts[0];
  const sidePost1 = posts[1];
  const sidePost2 = posts[2];

 
return (
  <section className="w-full bg-white py-10 md:py-14">
    <div className="mx-auto max-w-[1400px] px-5">

      {/* Section Header */}
      <div className="mb-7 flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            {/* <span className="h-[3px] w-8 rounded-full bg-[#078B8D]" /> */}
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#078B8D]">
              The Latest
            </p>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-[#172A3A] md:text-4xl">
            Latest Technology News
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            The stories and developments shaping the technology industry.
          </p>
        </div>

        <a
          href="/news"
          className="inline-flex w-fit items-center gap-2 border-b border-[#078B8D] pb-1 text-sm font-semibold text-[#078B8D] transition-colors hover:text-[#172A3A] hover:border-[#172A3A]"
        >
          Explore All News
          <span>→</span>
        </a>
      </div>

      {/* Featured News Layout */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch">

        {/* Main Featured Story */}
        <div className="min-w-0 lg:col-span-7">
          <HeroMain
           image={getImageUrl(mainPost.image)}
            title={mainPost.heading}
            category={mainPost.category}
            date={mainPost.createdAt}
            slug={mainPost.slug}
          />
        </div>

        {/* Supporting Stories */}
        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:grid-rows-2">

          {sidePost1 && (
            <div className="min-h-[230px] lg:min-h-0">
              <HeroSideCard
               image={getImageUrl(sidePost1.image)}
                title={sidePost1.heading}
                category={sidePost1.category}
                slug={sidePost1.slug}
                date={sidePost1.createdAt}
              />
            </div>
          )}

          {sidePost2 && (
            <div className="min-h-[230px] lg:min-h-0">
              <HeroSideCard
                image={getImageUrl(sidePost2.image)}
                title={sidePost2.heading}
                category={sidePost2.category}
                slug={sidePost2.slug}
                date={sidePost2.createdAt}
              />
            </div>
          )}

        </div>
      </div>

    </div>
  </section>
);

}