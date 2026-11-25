export function getImageUrl(image?: string | null): string {
  if (!image) {
    return "/images/placeholder.png";
  }

  const value = image.trim();

  if (!value) {
    return "/images/placeholder.png";
  }

  // Keep Base64 image URLs unchanged
  if (value.startsWith("data:image/")) {
    return value;
  }

  // Keep external image URLs unchanged
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  // Keep root-relative paths unchanged
  if (value.startsWith("/")) {
    return value;
  }

  // Convert relative paths to root-relative paths
  return `/${value.replace(/^\.\/+/, "")}`;
}