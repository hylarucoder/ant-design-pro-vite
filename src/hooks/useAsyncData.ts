import { useEffect, useState } from "react";

export const useAsyncData = <T>(loader: () => Promise<T>, deps: React.DependencyList = []) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const result = await loader();
      if (cancelled) {
        return;
      }

      setData(result);
      setLoading(false);
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, deps);

  return {
    data,
    loading,
  };
};
