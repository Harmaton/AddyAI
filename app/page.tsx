import Image from "next/image";

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'API URL not set';
  const nodeEnv = process.env.NODE_ENV || 'Environment not set';
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>ADDY AI</h1>
      <p>API URL: {apiUrl}</p>
      <p>Node Environment: {nodeEnv}</p>
    </main>
  );
}
