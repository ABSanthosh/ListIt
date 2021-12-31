import { useStoreActions, useStoreState } from "easy-peasy";
import propTypes from "prop-types";
import React from "react";
import ContentEditable from "react-contenteditable";

function ContentEditor({ handleCursorElement }) {
  const data = useStoreState((state) => state.selectedNote);
  const setSelectedNoteContent = useStoreActions(
    (action) => action.setSelectedNoteContent
  );

  return (
    <div className="StickyNoteWrapper__content--editableContainer">
      <ContentEditable
        className="StickyNoteWrapper__content--editableContent"
        html={data.content}
        onChange={(e) => {
          setSelectedNoteContent({
            id: data.id,
            content: document.querySelector(
              ".StickyNoteWrapper__content--editableContent"
            ).innerHTML,
          });
        }}
        onClick={() => {
          if (
            window
              .getSelection()
              .anchorNode.textContent.substring(
                window.getSelection().extentOffset,
                window.getSelection().anchorOffset
              ).length === 0
          ) {
            handleCursorElement();
            setSelectedNoteContent({
              id: data.id,
              content: document.querySelector(
                ".StickyNoteWrapper__content--editableContent"
              ).innerHTML,
              sanitizedContent: document.querySelector(
                ".StickyNoteWrapper__content--editableContent"
              ).innerText,
            });
          }
        }}
        onKeyUp={() => {
          if (
            window
              .getSelection()
              .anchorNode.textContent.substring(
                window.getSelection().extentOffset,
                window.getSelection().anchorOffset
              ).length === 0
          ) {
            handleCursorElement();
            setSelectedNoteContent({
              id: data.id,
              content: document.querySelector(
                ".StickyNoteWrapper__content--editableContent"
              ).innerHTML,
            });
          }
        }}
      />
    </div>
  );
}

// prop types
ContentEditor.propTypes = {
  handleCursorElement: propTypes.func.isRequired,
};

export default ContentEditor;