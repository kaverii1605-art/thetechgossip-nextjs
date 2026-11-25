
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

  // Keep Cloudinary and other external image URLs unchanged
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  // Keep root-relative local image paths unchanged
  if (value.startsWith("/")) {
    return value;
  }

  // Convert relative local paths into root-relative paths
  return `/${value.replace(/^\.\/+/, "")}`;
}
