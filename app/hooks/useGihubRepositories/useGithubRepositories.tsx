import { IRepository } from "@/app/types/IGithubRepository";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  org: string;
};

export const useGithubRepositories = ({ org }: Props) => {
  const [repo, setRepo] = useState<IRepository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const fetchRepos = useCallback(async () => {
    if (!org) return;

    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

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
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.code !== "ERR_CANCELED") {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [org]);

  useEffect(() => {
    fetchRepos();

    return () => {
      controllerRef.current?.abort();
    };
  }, [fetchRepos]);

  return {
    repo,
    isLoading,
    error,
    refetch: fetchRepos,
  };
};
