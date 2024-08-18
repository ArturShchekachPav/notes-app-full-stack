import * as React from "react";
import { EditorApi, useEditor } from "./useEditor.tsx";

const TextEditorContext = React.createContext<EditorApi | undefined>(undefined);

export const TextEditorProvider: React.FC = ({ children, html }) => {
  const editorApi = useEditor(html || '');

  return (
    <TextEditorContext.Provider value={editorApi}>
      {children}
    </TextEditorContext.Provider>
  );
};

export const useEditorApi = () => {
  const context = React.useContext(TextEditorContext);
  if (context === undefined) {
    throw new Error("useEditorApi must be used within TextEditorProvider");
  }

  return context;
};
