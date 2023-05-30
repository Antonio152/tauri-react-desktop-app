import React, { useEffect } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { useSippetStore } from "../store/snippetsStore";
import { SnippetItem } from "./SnippetItem";
export const SnippetList = () => {
  const setSnippetNames = useSippetStore((state) => state.setSnippetNames);
  const snippetsName = useSippetStore((state) => state.snippets);
  useEffect(() => {
    async function loadFiles() {
      const documentsPath = await documentDir();
      const result = await readDir(`${documentsPath}/personal-snippets`);
      const filenames = result.map((file) => file.name!.split(".")[0]);
      setSnippetNames(filenames);
    }
    loadFiles();
  }, []);

  return (
    <div>
      {snippetsName.map((snippetName) => (
        <SnippetItem snippetName={snippetName} key={snippetName} />
      ))}
    </div>
  );
};
