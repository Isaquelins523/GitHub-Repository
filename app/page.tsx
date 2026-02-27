"use client";

import { useGithubRepositories } from "./hooks/useGihubRepositories/useGithubRepositories";
import { useRepositoryLikeManagement } from "./hooks/useRepositoryLikeManagement/useRepositoryLikeManagement";

export default function Home() {
  const { repo, isLoading, error, refetch } = useGithubRepositories({
    org: "google",
  });

  const { repositoryLike, toggleLike } = useRepositoryLikeManagement();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-5xl text-blue-300 font-bold ">
        {isLoading && <p>Carregando....</p>}
        {error && (
          <div>
            <p>Error ao carregar dados</p>
            <button onClick={refetch}>Tentar novamente</button>
          </div>
        )}
        {repo.map((repo) => {
          const isLiked = repositoryLike.find((r) => r.id === repo.id)?.liked;
          return (
            <div key={repo.id}>
              <h2>
                {repo.full_name}
                <span>{repo.owner.login}</span>
              </h2>
              <button
                className="text-4xl text-black cursor-pointer bg-blue-200 rounded-2xl p-1 mt-3"
                onClick={() => toggleLike(repo.id)}
              >
                {isLiked ? "descurtir" : "curtir"}
              </button>
            </div>
          );
        })}
      </h1>
    </div>
  );
}
