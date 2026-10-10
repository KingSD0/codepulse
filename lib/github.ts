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
  const response = await fetch(
    "https://api.github.com/users/KingSD0/events/public?per_page=100",
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub activity");
  }

  const events: {
    type: string;
    repo: { name: string };
    payload?: {
      commits?: unknown[];
    };
  }[] = await response.json();

  const activity = new Map<string, number>();

  for (const event of events) {
    if (event.type !== "PushEvent") continue;

    const repository = event.repo.name.split("/").pop() ?? event.repo.name;

    const count = event.payload?.commits?.length ?? 0;

    activity.set(repository, (activity.get(repository) ?? 0) + count);
  }

  return Array.from(activity, ([repository, commits]) => ({
    repository,
    commits,
  }));
}