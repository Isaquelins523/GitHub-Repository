import { useState, useEffect } from "react";

type RepositoryState = {
  id: number;
  liked: boolean;
};

export const useRepositoryLikeManagement = () => {
  const [repositoryLike, setRepostorylike] = useState<RepositoryState[]>(() => {
    if (typeof window === "undefined") return [];

    const storage = localStorage.getItem("repositoryLike");
    return storage ? JSON.parse(storage) : [];
  });

  useEffect(() => {
    localStorage.setItem("repositoryLike", JSON.stringify(repositoryLike));
  }, [repositoryLike]);

  const toggleLike = (id: number) => {
    setRepostorylike((prevState) => {
      const exists = prevState.find((r) => r.id === id);

      if (exists) {
        return prevState.map((r) =>
          r.id === id ? { ...r, liked: !r.liked } : r,
        );
      }

      return [...prevState, { id, liked: true }];
    });
  };
  return { repositoryLike, toggleLike };
};
