import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useSippetStore } from "../store/snippetsStore";
import { writeTextFile } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { TfiPencil } from "react-icons/tfi";
export const SnippetEditor = () => {
  const activeSnippet = useSippetStore((state) => state.activeSnippet);
  const [text, setText] = useState<string | undefined>("");

  useEffect(() => {
    if (!activeSnippet) return;
    const saveText = setTimeout(async () => {
      console.log("Saving text");
      const documentRoute = await documentDir();
      await writeTextFile(
        `${documentRoute}/personal-snippets/${activeSnippet.name}.js`,
        text ?? ""
      );
    }, 1000);
    return () => {
      clearTimeout(saveText);
    };
  }, [text]);

  return (
    <>
      {activeSnippet ? (
        <Editor
          theme="vs-dark"
          defaultLanguage="javascript"
          options={{ fontSize: 16 }}
          onChange={(value) => {
            setText(value);
          }}
          value={activeSnippet.code ?? "// Write your snippet here"}
        />
      ) : (
        <TfiPencil className="text-9xl text-neutral-500" />
      )}
    </>
  );
};
