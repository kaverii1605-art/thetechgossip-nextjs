
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const categoryLabels: Record<string, string> = {
  "commerce-sales": "Commerce & Sales",
  "affiliate-marketing-management": "Affiliate Marketing & Management",
  "channel-partner-local-marketing": "Channel, Partner & Local Marketing",
  "conversational-intelligence": "Conversational Intelligence",
  "demand-generation": "Demand Generation",
  ecommerce: "Ecommerce",
  "retail-proximity-iot-marketing": "Retail, Proximity & IoT Marketing",
  "predictive-analytics": "Predictive Analytics",
  "content-experience": "Content & Experience",
  "chatbots-conversational-ai": "Chatbots & Conversational AI",
  "cm-webexperience": "CMS & Web Experience Management",
  "customer-engagement": "Customer Engagement",
  "content-marketing": "Content Marketing",
  "mobile-apps": "Mobile Apps",
  "digital-asset-management": "Digital Asset Management",
  "email-marketing": "Email Marketing",
  "intreactive-content": "Interactive Content",
  "marketing-automation": "Marketing Automation",
  "marketing-technology": "Marketing Technology",
  seo: "SEO",
  "data-management": "Data Management",
  "audience-marketingdata": "Audience/Marketing Data & Data Enhancement",
  "business-customerintelligence": "Business/Customer Intelligence & Data Science",
  "customer-data-platform": "Customer Data Platform",
  "data-analytics": "Data Analytics",
  dmp: "DMP",
  "ipass-cloud-data-integration": "iPaaS, Cloud/Data Integration & Tag Management",
  marketing: "Advertising & Promotion",
  adtech: "Adtech",
  "digital-marketing": "Digital Marketing",
  "digital-advertising": "Digital Advertising",
  "display-programatic-advertising": "Display & Programmatic Advertising",
  "mobile-advertising": "Mobile Advertising",
  "mobile-marketing": "Mobile Marketing",
  "native-content-advertising": "Native/Content Advertising",
  ppc: "PPC",
  pr: "PR",
  "performane-marketing": "Performance Marketing",
  "search-social-advertising": "Search & Social Advertising",
  "video-advertising": "Video Advertising",
  "customer-experience": "Interviews",
  "social-realtionship": "Social & Relationships",
  abm: "ABM",
  "advocacy-loyalty-referrals": "Advocacy, Loyalty & Referrals",
  crm: "CRM",
  insurance: "Insurance",
  "customer-experience-service-success": "Customer Experience, Service & Success",
  "events-meetings-webinar": "Events, Meetings & Webinars",
  influencers: "Influencers",
  "socialmeida-marketing": "Social Media Marketing & Monitoring",
  "market-intelligence": "Market Intelligence",
  banking: "Banking",
  payments: "Payments",
  security: "Security",
  blockchain: "Blockchain",
  investments: "Investments",
  crowdfunding: "Crowdfunding",
  ai: "AI",
  "machine-learning": "Machine Learning",
  "hr-technology": "HR Technology",
  "advertising-promotion": "Advertising & Promotion",
  automation: "Automation",
  "organization-development": "Organization & Development",
  technology: "Technology",
  "information-technology": "Information Technology",
  "trend-based": "Trend Based",
  "account-based-marketing": "Account Based Marketing",
  "privacy-regulations": "Privacy and Regulations",
  "apps-for-business": "Apps for Business",
  "b2b-data": "B2B Data",
  "behavioural-marketing": "Behavioral Marketing",
  "brand-safety": "Brand Safety",
  "cyber-security": "Cyber Security",
  platform: "Platforms",
  Whitepapers: "Whitepapers",
  "people-based-marketing": "People-Based Marketing",
  "content-advertising": "Content Advertising",
  "sales-analytics": "Sales Analytics",
  "sales-automation-enablement": "Sales Automation, Enablement & Intelligence",
  "social-commerce": "Social Commerce",
  ebooks: "Ebooks",
  sass: "Sass",
  healthtech: "Healthtech",
  resources: "Resources",
  networking: "Networking",
  sourcing: "Sourcing",
};

function getCategoryLabel(value: string): string {
  if (categoryLabels[value]) {
    return categoryLabels[value];
  }

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function getPosts() {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function readTime(content?: string | null) {
  const words = content?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  return Math.max(1, Math.ceil(words / 200));
}

function excerpt(
  subHeading: string | null,
  content: string | null,
  length = 150
) {
  if (subHeading?.trim()) {
    return subHeading;
  }

  if (!content) {
    return "";
  }

  const text = content.replace(/\s+/g, " ").trim();

  return text.length > length
    ? `${text.slice(0, length).trim()}…`
    : text;
}

type NewsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    limit?: string;
  }>;
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;

  const query = (params.q ?? "").trim();
  const selectedCategory = params.category ?? "all";

  // Start with 9 articles and allow 9 more per click.
  const parsedLimit = Number(params.limit ?? 9);
  const limit =
    Number.isFinite(parsedLimit) && parsedLimit >= 9
      ? Math.min(Math.floor(parsedLimit), 10000)
      : 9;

  const posts = await getPosts();

  // Build the category filter from categories in the database.
  const categories = Array.from(
    new Set(posts.map((post) => post.category).filter(Boolean))
  ).sort((a, b) =>
    getCategoryLabel(a).localeCompare(getCategoryLabel(b))
  );

  // Apply both the category and keyword filters.
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" ||
      post.category === selectedCategory;

    const searchableText = [
      post.heading,
      post.subHeading ?? "",
      post.content ?? "",
      getCategoryLabel(post.category),
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(query.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const visiblePosts = filteredPosts.slice(0, limit);
  const hasMore = visiblePosts.length < filteredPosts.length;

  function buildUrl(options: {
    q?: string;
    category?: string;
    limit?: number;
  }) {
    const q = options.q ?? query;
    const category = options.category ?? selectedCategory;
    const nextLimit = options.limit ?? 9;

    const search = new URLSearchParams();

    if (q) search.set("q", q);
    if (category !== "all") search.set("category", category);
    search.set("limit", String(nextLimit));

    return `/news?${search.toString()}`;
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Page heading */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#078B8D]">
            TheTechGossip
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#071b49] sm:text-4xl md:text-5xl">
            Latest News &amp; Insights
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
            Explore the latest technology news, industry updates,
            innovations, and insights from across the digital world.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-9">
        {/* Search */}
        <form
          action="/news"
          method="GET"
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="hidden"
            name="category"
            value={selectedCategory}
          />

          <input type="hidden" name="limit" value="9" />

          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition focus-within:border-[#078B8D] focus-within:ring-2 focus-within:ring-[#078B8D]/15">
            <svg
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search news by title, keyword or topic..."
              aria-label="Search news"
              className="h-12 w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-[#078B8D] px-7 py-3 font-semibold text-white transition-colors hover:bg-[#066f71]"
          >
            Search
          </button>

          {(query || selectedCategory !== "all") && (
            <Link
              href="/news"
              className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition-colors hover:border-[#078B8D] hover:text-[#078B8D]"
            >
              Clear filters
            </Link>
          )}
        </form>

        {/* Category filters */}
        <div className="mt-7">
          <p className="mb-3 text-sm font-semibold text-gray-700">
            Browse by category
          </p>

          <div className="flex flex-wrap gap-2">
            <Link
              href={buildUrl({
                category: "all",
                limit: 9,
              })}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                selectedCategory === "all"
                  ? "border-[#078B8D] bg-[#078B8D] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#078B8D] hover:text-[#078B8D]"
              }`}
            >
              All News
            </Link>

            {categories.map((category) => (
              <Link
                key={category}
                href={buildUrl({
                  category,
                  limit: 9,
                })}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedCategory === category
                    ? "border-[#078B8D] bg-[#078B8D] text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#078B8D] hover:text-[#078B8D]"
                }`}
              >
                {getCategoryLabel(category)}
              </Link>
            ))}
          </div>
        </div>

        {/* Results heading */}
        <div className="mt-10 flex flex-wrap items-end justify-between gap-3 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#071b49] md:text-3xl">
              {selectedCategory === "all"
                ? "All News"
                : getCategoryLabel(selectedCategory)}
            </h2>

            {query && (
              <p className="mt-2 text-sm text-gray-500">
                Search results for &ldquo;{query}&rdquo;
              </p>
            )}
          </div>

          <p className="text-sm text-gray-500">
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "article" : "articles"} found
          </p>
        </div>

        {/* News cards */}
        
{/* News Articles - Simple Editorial Layout */}
{visiblePosts.length > 0 ? (
  <>
    <div className="mt-8 divide-y divide-gray-200 border-t border-gray-200">
      {visiblePosts.map((post, index) => (
        <article
          key={post.id}
          className="group grid grid-cols-1 gap-5 py-7 sm:grid-cols-[55px_200px_1fr] sm:gap-6"
        >
          {/* Article Number */}
          <div className="hidden pt-1 sm:block">
            <span className="text-2xl font-light text-gray-300">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Article Image */}
          <Link
            href={`/news/${post.slug}`}
            className="block aspect-[16/10] overflow-hidden bg-[#071b49]"
          >
            {post.image ? (
              <img
                src={post.image}
                alt={post.heading}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-bold text-white">
                TheTechGossip
              </div>
            )}
          </Link>

          {/* Article Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <Link
                href={buildUrl({
                  category: post.category,
                  limit: 9,
                })}
                className="text-xs font-bold uppercase tracking-wider text-[#078B8D] hover:underline"
              >
                {getCategoryLabel(post.category)}
              </Link>

              <span className="text-gray-300">|</span>

              <span className="text-xs text-gray-500">
                {formatDate(post.createdAt)}
              </span>

              <span className="text-xs text-gray-500">
                {readTime(post.content)} min read
              </span>
            </div>

            <Link href={`/news/${post.slug}`}>
              <h3 className="text-xl font-bold leading-snug text-[#071b49] transition-colors group-hover:text-[#078B8D] sm:text-2xl">
                {post.heading}
              </h3>
            </Link>

            {excerpt(post.subHeading, post.content, 180) && (
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#52617F]">
                {excerpt(post.subHeading, post.content, 180)}
              </p>
            )}

            <Link
              href={`/news/${post.slug}`}
              className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#078B8D] hover:gap-3"
            >
              Read More <span>→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>

    {/* Load More */}
    {hasMore && (
      <div className="mt-10 flex flex-col items-center gap-3">
        <p className="text-sm text-gray-500">
          Showing {visiblePosts.length} of {filteredPosts.length} articles
        </p>

        <Link
          href={buildUrl({ limit: limit + 9 })}
          className="border border-[#078B8D] px-8 py-3 font-semibold text-[#078B8D] transition hover:bg-[#078B8D] hover:text-white"
        >
          Load More News ↓
        </Link>
      </div>
    )}

    {!hasMore && visiblePosts.length > 9 && (
      <p className="mt-10 text-center text-sm text-gray-500">
        You&apos;ve reached the end of the news articles.
      </p>
    )}
  </>
) : (
  <div className="mt-8 border-y border-gray-200 bg-white px-5 py-16 text-center">
    <h3 className="text-xl font-bold text-[#071b49]">
      No articles found
    </h3>

    <p className="mt-3 text-sm text-gray-500">
      Try another keyword or choose a different category.
    </p>

    <Link
      href="/news"
      className="mt-6 inline-flex bg-[#078B8D] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#066f71]"
    >
      View All News
    </Link>
  </div>
)}

      </section>
    </main>
  );
}


