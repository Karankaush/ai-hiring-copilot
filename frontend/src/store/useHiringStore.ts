import { create } from "zustand";

interface HiringStore {
  results: any;

  setResults: (
    results: any
  ) => void;
}

export const useHiringStore =
  create<HiringStore>((set) => ({

    results: null,

    setResults: (results) =>
      set({ results }),

  }));