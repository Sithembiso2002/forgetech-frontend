// apps/website/src/app/support/page.tsx

import type { Metadata } from "next";
import SupportClient from "./SupportClient";


export const metadata: Metadata = {
  title: "Support | ForgeTech Nobles",
  description:
    "Need help? Contact our support team, browse FAQs, or access our knowledge base for fast answers and technical assistance.",
};



  

export default async function SupportPage() {
  return <SupportClient />;
}