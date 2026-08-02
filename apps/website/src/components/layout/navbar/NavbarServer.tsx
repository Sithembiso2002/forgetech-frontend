import { getServices } from "@/lib/api";
import Navbar from "./Navbar"; // the client version (will be updated next)
import type { TopSlidingBarService } from "./sections/TopSlidingBar";

export default async function NavbarServer() {
  // Fetch services from API – uses the same source as generateStaticParams
  const services = await getServices();

  // Map to the shape TopSlidingBar expects
  const serviceSlides: TopSlidingBarService[] = services?.map((s) => ({
    title: s.title,
    slug: s.slug,
  })) ?? [];

  return <Navbar services={serviceSlides} />;
}