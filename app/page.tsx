import StatsCard from "@/components/dashboard/StatsCard";
import { getRepositories } from "@/lib/github";
import RepositoryList from "@/components/dashboard/RepositoryList";
import LanguageChart from "@/components/dashboard/LanguageChart";
import RepositoryChart from "@/components/dashboard/RepositoryChart";
import { getCommitActivity } from "@/lib/github";
import ActivityChart from "@/components/dashboard/ActivityChart";

export default async function Home() {

  const repositories = await getRepositories();
  console.log(repositories);
  const repoCount = repositories.length;

  const totalStars = repositories.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const totalForks = repositories.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );

  const activity = await getCommitActivity();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        CodePulse
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <StatsCard title="Repositories" value={repoCount} />
        <StatsCard title="Stars" value={totalStars} />
        <StatsCard title="Forks" value={totalForks} />
      </div>
      
      <RepositoryList repositories={repositories} />
      <LanguageChart repositories={repositories} />

      <div className="mt-6">
  <RepositoryChart repositories={repositories} />
</div>
      <div className="mt-6">
        <ActivityChart activity={activity} />
      </div>
    </main>
  );
}