import Image from "next/image";

export default function Home() {
  const url = process.env.API_URL
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     ADDY AI
    Sample env  {url}, {process.env.API_URL} + NODE ENV {process.env.NODE_ENV}
    </main>
  );
}
