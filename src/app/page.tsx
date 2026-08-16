import type { Metadata } from "next";
import { LearnHome } from "@/components/learn/LearnHome";

export const metadata: Metadata = {
  title: "Learn to read a company — StockSense",
  description:
    "Seven levels, 27 short lessons. Start with what a share actually is and finish able to read a company's numbers. Educational only — every example uses invented companies.",
};

export default function HomePage() {
  return <LearnHome />;
}
