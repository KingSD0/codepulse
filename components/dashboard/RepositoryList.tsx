"use client";

import { Repository } from "@/types/repository";
import { useState } from "react";

interface RepositoryListProps {
  repositories: Repository[];
}

export default function RepositoryList({ repositories }: RepositoryListProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  // Nieuw: onthoud waarop we willen sorteren
  const [sortBy, setSortBy] = useState<"name" | "stars" | "forks">("name");

  const languages = [
    "All",
    ...Array.from(
      new Set(
        repositories
          .map((repository) => repository.language)
          .filter((language): language is string => language !== null),
      ),
    ),
  ];
  const [searchTerm, setSearchTerm] = useState("");

  // Stap 1: filter repositories
  const filteredRepositories = repositories.filter((repository) => {
    const matchesLanguage =
      selectedLanguage === "All" || repository.language === selectedLanguage;

    const matchesSearch = repository.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesLanguage && matchesSearch;
  });

  // Stap 2: sorteer de gefilterde repositories
  const sortedRepositories = [...filteredRepositories].sort((a, b) => {
    if (sortBy === "stars") {
      return b.stargazers_count - a.stargazers_count;
    }

    if (sortBy === "forks") {
      return b.forks_count - a.forks_count;
    }

    return a.name.localeCompare(b.name);
  });

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Repositories</h2>
      <input
        type="text"
        placeholder="Search repositories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-80 px-4 py-3 mb-6 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-blue-500"
      />
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {languages.map((language) => (
          <button
            type="button"
            key={language}
            onClick={() => setSelectedLanguage(language)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              selectedLanguage === language
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {language}
          </button>
        ))}
      </div>

      {/* Sort buttons */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-slate-400">Sort by:</span>

        <button
          type="button"
          onClick={() => setSortBy("name")}
          className={`px-3 py-2 rounded-lg text-sm ${
            sortBy === "name"
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          Name
        </button>

        <button
          type="button"
          onClick={() => setSortBy("stars")}
          className={`px-3 py-2 rounded-lg text-sm ${
            sortBy === "stars"
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          Stars
        </button>

        <button
          type="button"
          onClick={() => setSortBy("forks")}
          className={`px-3 py-2 rounded-lg text-sm ${
            sortBy === "forks"
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          Forks
        </button>
      </div>

      {/* Repository cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {sortedRepositories.map((repository) => (
          <a
            key={repository.id}
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl bg-slate-900 border border-slate-800 p-5 hover:border-slate-600 transition"
          >
            <h3 className="text-lg font-semibold">{repository.name}</h3>

            <p className="text-sm text-slate-400 mt-2">
              {repository.description ?? "No description available"}
            </p>

            <div className="flex gap-4 mt-4 text-sm text-slate-300">
              <span>Language: {repository.language ?? "Unknown"}</span>

              <span>Stars: {repository.stargazers_count}</span>

              <span>Forks: {repository.forks_count}</span>
            </div>
          </a>
          
        ))}
        {sortedRepositories.length === 0 && (
  <p className="text-slate-400 col-span-full">
    No repositories found.
  </p>
)}
      </div>
    </section>
  );
}
