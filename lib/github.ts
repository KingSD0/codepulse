import { Repository } from "@/types/repository";
import type { CommitActivity } from "@/types/commit";

export async function getRepositories(): Promise<Repository[]> {
  const response = await fetch(
    "https://api.github.com/users/KingSD0/repos",
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return response.json();
}


export async function getCommitActivity(): Promise<CommitActivity[]> {
  const repositories = await getRepositories();

  const activity = await Promise.all(
    repositories.map(async (repository) => {
      const response = await fetch(
        `https://api.github.com/repos/KingSD0/${encodeURIComponent(repository.name)}/commits?per_page=100`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        return {
          repository: repository.name,
          commits: 0,
        };
      }

      const commits: {
        sha: string;
        commit: {
          author: {
            name: string;
            date: string;
          } | null;
        };
      }[] = await response.json();

      return {
        repository: repository.name,
        commits: commits.length,
      };
    })
  );

  return activity;
}
