import { create } from "zustand";

interface Snippet {
  name: string;
  code: string;
}
interface SnippetsStore {
  snippets: string[];
  addSnippet: (name: string) => void;
  setSnippetNames: (names: string[]) => void;
  removeSnippet: (name: string) => void;
  activeSnippet: Snippet | null;
  setActiveSnippet: (snippet: Snippet | null) => void;
}

export const useSippetStore = create<SnippetsStore>((set) => ({
  snippets: [],
  //! Save snippet file
  addSnippet: (name) =>
    set((state) => ({ snippets: [...state.snippets, name] })),
  //! Save all snippets
  setSnippetNames: (names) => set({ snippets: names }),
  //! Delete snippet
  removeSnippet: (name) =>
    set((state) => ({
      snippets: state.snippets.filter((s) => s !== name),
    })),
  //! Active snippet
  activeSnippet: null,
  setActiveSnippet: (snippet) => set({ activeSnippet: snippet }),
}));
