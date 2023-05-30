import React from "react";
import { useSippetStore } from "../store/snippetsStore";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { toast } from "react-hot-toast";
import { FiTrash, FiX } from "react-icons/fi";

interface ISnippetItemProps {
  snippetName: string;
}
export const SnippetItem = ({ snippetName }: ISnippetItemProps) => {
  const setActiveSnippet = useSippetStore((state) => state.setActiveSnippet);
  const removeSnippet = useSippetStore((state) => state.removeSnippet);
  const activeSnippet = useSippetStore((state) => state.activeSnippet);

  const handleDelete = async (snippetName: string) => {
    const accept = await window.confirm(
      "Are you sure you want to delete this snippet?"
    );
    if (!accept) return;

    const documentRoute = await documentDir();
    const filePath = await join(
      documentRoute,
      "personal-snippets",
      `${snippetName}.js`
    );
    await removeFile(filePath);
    removeSnippet(snippetName);
    toast.success("Snippet removed", {
      duration: 2000,
      position: "bottom-right",
      style: {
        background: "#202020",
        color: "#fff",
      },
    });
  };
  return (
    <div
      className={`py-2 px-4 hover:cursor-pointer flex justify-between ${
        activeSnippet?.name === snippetName ? "bg-sky-500" : ""
      }`}
      onClick={async () => {
        const documentRoute = await documentDir();
        const filePath = await join(
          documentRoute,
          "personal-snippets",
          `${snippetName}.js`
        );
        const snippet = await readTextFile(filePath);
        setActiveSnippet({ name: snippetName, code: snippet });
      }}
    >
      <h2>{snippetName}</h2>
      {activeSnippet?.name === snippetName && (
        <div className="flex gap-2 items-center justify-center">
          <FiTrash
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(snippetName);
            }}
            className="text-red-600"
          />

          <FiX
            onClick={(e) => {
              e.stopPropagation();
              setActiveSnippet(null);
            }}
            className="text-neutral-600"
          />
        </div>
      )}
    </div>
  );
};
