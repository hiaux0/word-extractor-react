import LanguageTracker from "@/components/language-tracker"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Language Word Tracker</h1>
      <LanguageTracker />
    </main>
  )
}

