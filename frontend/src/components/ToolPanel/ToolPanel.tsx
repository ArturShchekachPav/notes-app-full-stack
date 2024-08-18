import * as React from "react";
import { useEditorApi } from "../TextEditor/index.ts";
import { BlockType, InlineStyle } from "../TextEditor/config.ts";
import "./ToolPanel.scss";

const ToolPanel: React.FC = () => {
  const {
    addLink,
    toggleBlockType,
    currentBlockType,
    toggleInlineStyle,
    hasInlineStyle,
  } = useEditorApi();

  return (
    <div className="tool-panel">
      <button
        type='button'
        className={`tool-panel__item tool-panel__item_type_h1 ${currentBlockType === BlockType.h1 && "tool-panel__item_active"}`}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlockType(BlockType.h1);
        }}
      >
      </button>
      <button
          type='button'
        className={`tool-panel__item tool-panel__item_type_h2 ${currentBlockType === BlockType.h2 && "tool-panel__item_active"}`}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlockType(BlockType.h2);
        }}
      >
      </button>
        <button
            type='button'
            className={`tool-panel__item tool-panel__item_type_order-list ${currentBlockType === BlockType.orderList && "tool-panel__item_active"}`}
            onMouseDown={(e) => {
                e.preventDefault();
                toggleBlockType(BlockType.orderList);
            }}
        >
        </button>
        <button
            type='button'
            className={`tool-panel__item tool-panel__item_type_list ${currentBlockType === BlockType.list && "tool-panel__item_active"}`}
            onMouseDown={(e) => {
                e.preventDefault();
                toggleBlockType(BlockType.list);
            }}
        >
        </button>

      {Object.values(InlineStyle).map((v) => (
        <button
            type='button'
          key={v}
          className={`tool-panel__item tool-panel__item_type_${v} ${hasInlineStyle(v) && "tool-panel__item_active"}`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle(v);
          }}
        >
        </button>
      ))}

      <button
          type='button'
        className="tool-panel__item tool-panel__item_type_link"
        onClick={() => {
          const url = prompt("URL:");
          if (url) {
            addLink(url);
          }
        }}
      >
      </button>
    </div>
  );
};

export default ToolPanel;
