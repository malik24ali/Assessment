"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AddBookPage() {
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const author = formData.get("author");
    const genre = formData.get("genre");

    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, genre }),
    });

    setLoading(false);
    if (res.ok) router.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-700">Add a New Book</h1>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <input
            name="title"
            placeholder="Title"
            required
            className="w-full text-black border border-gray-300 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            name="author"
            placeholder="Author"
            required
            className="w-full text-black border border-gray-300 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            name="genre"
            placeholder="Genre"
            required
            className="w-full text-black border border-gray-300 p-3 sm:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md text-sm sm:text-base"
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
        <p className="text-center text-gray-500 text-xs sm:text-sm mt-4">
          You can add multiple books here.
        </p>
      </div>
    </div>
  );
}
