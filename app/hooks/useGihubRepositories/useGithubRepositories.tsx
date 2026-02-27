import { IRepository } from "@/app/types/IGithubRepository";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

type props = {
  org: string;
};

export const useGithubRepositories = ({ org }: props) => {
  const [repo, setRepo] = useState<IRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const fetcher = useCallback(() => {
    axios
      .get(`https://api.github.com/orgs/${org}/repos`)
      .then((response) => {
        setRepo(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [org]);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { repo, isLoading, error, refetch: fetcher };
};
