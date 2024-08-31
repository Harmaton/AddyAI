import Hero from "@/components/hero";
import Navbar from "@/components/landing-page/navbar";

export default function Home() {
 
  return (
    <main className="flex flex-col items-center justify-between p-2">
      <Navbar />
      <Hero />
    </main>
  );
}
