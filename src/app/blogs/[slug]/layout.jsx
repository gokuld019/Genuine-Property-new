import { BLOGS } from "@/lib/blog";

export function generateStaticParams() {
  return BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

export default function BlogLayout({ children }) {
  return children;
}