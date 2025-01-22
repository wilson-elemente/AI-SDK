import { Link } from "@/components/link";

export default function Page() {
  return (
    <main className="space-y-4">
      <h1 className="text-xl font-semibold">Vercel AI SDK Fundamentals</h1>
      <p>
        The following examples aim to showcase the fundamentals behind the
        Vercel AI SDK. The examples have minimal loading
        states to remain as simple as possible.
      </p>
      <ul className="list-disc list-inside">
        <li>
          <Link href="/examples/AI-copilot">AI-copilot</Link>
        </li>
        <li>
          <Link href="/examples/tools/basic">Basic Tool</Link>
        </li>
      </ul>
    </main>
  );
}
