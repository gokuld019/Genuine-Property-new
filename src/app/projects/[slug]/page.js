import { notFound } from "next/navigation";
import { getProject, getAllProjectSlugs } from "@/data/projects";
import ProjectDetailsClient from "./ProjectDetailsClient";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} | Genuine Property Developers`,
    description: project.tagline,
  };
}

export default async function ProjectDetailsPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetailsClient project={project} />;
}