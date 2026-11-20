
import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";

type Resource = {
  title: string;
  href: string;
  image: string | null;
};

const publicDir = path.join(process.cwd(), "public");

async function findLandingPages(
  directory: string
): Promise<Resource[]> {
  let entries;

  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }

  const resources: Resource[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      resources.push(...(await findLandingPages(fullPath)));
      continue;
    }

    if (!entry.isFile() || entry.name.toLowerCase() !== "index.html") {
      continue;
    }

    const html = await fs.readFile(fullPath, "utf8");
    const folder = path.dirname(fullPath);

    const getMeta = (key: string) => {
      const tags = html.match(/<meta\b[^>]*>/gi) ?? [];

      for (const tag of tags) {
        const name =
          tag.match(/\bname=["']([^"']+)["']/i)?.[1] ??
          tag.match(/\bproperty=["']([^"']+)["']/i)?.[1];

        const content = tag.match(/\bcontent=["']([^"']+)["']/i)?.[1];

        if (name?.toLowerCase() === key.toLowerCase() && content) {
          return content.trim();
        }
      }

      return "";
    };

    const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);

    const title =
      getMeta("resource-title") ||
      getMeta("og:title") ||
      titleMatch?.[1]?.replace(/<[^>]*>/g, "").trim() ||
      path.basename(folder);

    // Find an image already referenced in the HTML.
   const imageTags = html.match(/<img\b[^>]*>/gi) ?? [];

// First, look for an image identified as a banner or hero image
const mainBanner = imageTags.find((tag) =>
  /\b(class|id)=["'][^"']*(banner|hero)[^"']*["']/i.test(tag) ||
  /\bsrc=["'][^"']*(banner|hero)[^"']*["']/i.test(tag)
);

// Otherwise, select the first non-logo image
const fallbackImage = imageTags.find(
  (tag) =>
    !/\b(class|id|alt|src)=["'][^"']*logo[^"']*["']/i.test(tag)
);

const imageValue =
  getMeta("og:image") ||
  mainBanner?.match(/\bsrc=["']([^"']+)["']/i)?.[1] ||
  fallbackImage?.match(/\bsrc=["']([^"']+)["']/i)?.[1] ||
  imageTags[0]?.match(/\bsrc=["']([^"']+)["']/i)?.[1] ||
  "";

    let image: string | null = null;

    if (imageValue) {
      if (/^https?:\/\//i.test(imageValue)) {
        // External image URL.
        image = imageValue;
      } else if (imageValue.startsWith("/") && !imageValue.startsWith("//")) {
        // Path from the public folder.
        image = imageValue;
      } else if (!imageValue.startsWith("data:")) {
        // Relative image path, resolved from the index.html folder.
        const cleanPath = imageValue.split(/[?#]/)[0];
        const imagePath = path.resolve(folder, cleanPath);

        if (imagePath.startsWith(publicDir + path.sep)) {
          try {
            await fs.access(imagePath);

            image =
              "/" +
              path
                .relative(publicDir, imagePath)
                .split(path.sep)
                .map(encodeURIComponent)
                .join("/");
          } catch {
            image = null;
          }
        }
      }
    }

    const relativePath = path
      .relative(publicDir, fullPath)
      .split(path.sep)
      .map(encodeURIComponent)
      .join("/");

    resources.push({
      title,
      href: `/${relativePath}`,
      image,
    });
  }

  return resources;
}

export default async function ResourcesPage() {
  // Search only this folder so unrelated index.html files are not listed.
 const resources = (
  await findLandingPages(publicDir)
).sort((a, b) => a.title.localeCompare(b.title));

  

return (
  <main className="min-h-screen bg-[#f5f8fa] px-5 py-14 md:px-10">
    <div className="mx-auto max-w-[1200px]">

      {/* Page Heading */}
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#078B8D]">
          Explore & Learn
        </p>

        <h1 className="text-3xl font-bold text-[#172A3A] md:text-4xl">
          Resources
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
          Discover useful resources, insights and information to support your business.
        </p>
      </div>

      {/* Resource Cards */}
      
<div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
  {resources.map((resource) => (
    <Link
      key={resource.href}
      href={resource.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

        {/* Image */}
        <div className="h-[210px] overflow-hidden bg-[#edf2f5]">
          {resource.image ? (
            <img
              src={resource.image}
              alt={resource.title}
              className="h-full w-full object-inherit transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-5 text-center text-lg font-semibold text-[#285174]">
              {resource.title}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <span className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#078B8D]">
            Resource
          </span>

          <h2 className="text-lg font-bold leading-snug text-[#172A3A] transition-colors group-hover:text-[#078B8D]">
            {resource.title}
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Explore this resource to discover valuable information and insights.
          </p>

          <div className="mt-auto pt-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#078B8D] transition-all group-hover:gap-3">
              Explore Resource
              <span>→</span>
            </span>
          </div>
        </div>

      </article>
    </Link>
  ))}
</div>


      {/* Empty State */}
      {resources.length === 0 && (
        <p className="py-16 text-center text-gray-500">
          No resources found.
        </p>
      )}

    </div>
  </main>
);




}
