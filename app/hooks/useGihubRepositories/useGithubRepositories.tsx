import { IRepository } from "@/app/types/IGithubRepository";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  org: string;
};

export const useGithubRepositories = ({ org }: Props) => {
  const [repo, setRepo] = useState<IRepository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!org) return;

    const controller = new AbortController();

    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(
          `https://api.github.com/orgs/${org}/repos`,
          {
            signal: controller.signal,
          },
        );

        setRepo(response.data);
      } catch (err: any) {
        if (err.name !== "CanceledError") {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();

    return () => {
      controller.abort();
    };
  }, [org]);

  return { repo, isLoading, error };
};
