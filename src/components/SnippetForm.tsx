import React, { useState } from "react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { useSippetStore } from "../store/snippetsStore";
import { toast } from "react-hot-toast";

export const SnippetForm = () => {
  const [snippetName, setSnippetName] = useState("");
  const addSnippet = useSippetStore((state) => state.addSnippet);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const documentRoute = await documentDir();
        writeTextFile(
          `${documentRoute}/personal-snippets/${snippetName}.js`,
          ``
        );
        setSnippetName("");
        addSnippet(snippetName);
        toast.success("Snippet created", {
          duration: 2000,
          position: "bottom-right",
          style: {
            background: "#202020",
            color: "#fff",
          },
        });
      }}
    >
      <input
        type="text"
        placeholder="Write a Snippet"
        className="bg-zinc-900 w-full border-none outline-none p-3"
        onChange={(e) => setSnippetName(e.target.value)}
        value={snippetName}
      />
      <button className="hidden">Save</button>
    </form>
  );
};
