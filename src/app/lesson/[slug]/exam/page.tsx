import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_LESSONS, getLesson } from "@/lib/learn/curriculum";
import { ExamMode } from "@/components/learn/ExamMode";

export function generateStaticParams() {
  return ALL_LESSONS.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return { title: lesson ? `Unit check — ${lesson.title}` : "Unit check" };
}

export default async function ExamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  return <ExamMode lesson={lesson} />;
}
