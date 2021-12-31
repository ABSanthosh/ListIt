import React from "react";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";
import { ReactComponent as Dots } from "../../../../../../Assets/Img/StickyNotes/dots.svg";

export default function NotesListItem({
  index,
  note,
  setSelectedNote,
  setContextData,
  setIsSideContext,
  isSideContext,
  onClick,
  contextMenuPositionState,
}) {
  return (
    <div
      className="NotesContainerWrapper__listItem"
      style={{
        borderTop: `6px solid ${note.theme.secondary}`,
        backgroundColor: note.theme.primary,
      }}
      key={index}
      onClick={(e) => {
        if (!e.target.className.baseVal) {
          setSelectedNote(note.id);
        }
        onClick();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextData(note);
        setIsSideContext(true);
        var contextMenu = document.querySelector(
          ".NotesContainerWrapper--contextMenu"
        );
        contextMenu.style.left = e.pageX + "px";
        contextMenu.style.top = e.pageY - 29 + "px";
      }}
    >
      <div className="NotesContainerWrapper__listItem--time">
        <span>{note.lastModified}</span>
        {contextMenuPositionState && (
          <Dots
            className={`NotesContainerWrapper__optionsButton${index}`}
            onClick={() => {
              setContextData(note);
              setIsSideContext(!isSideContext);
              const optionsButton = document.querySelector(
                ".NotesContainerWrapper__optionsButton" + index
              );
              var position = optionsButton.getBoundingClientRect();
              var positionX = position.x;
              var positionY = position.y;

              var contextMenu = document.querySelector(
                ".NotesContainerWrapper--contextMenu"
              );

              contextMenu.style.left =
                positionX -
                (contextMenu.clientWidth - optionsButton.clientWidth) +
                "px";

              contextMenu.style.top = positionY + 1 + "px";
            }}
          />
        )}
      </div>
      <ContentEditable
        className="NotesContainerWrapper__listItem--content"
        html={sanitizeHtml(note.content, {
          allowedTags: ["b", "i", "div", "strong", "strike", "p", "li"],
          allowedAttributes: { a: ["href"] },
        })}
        disabled={true}
      />
    </div>
  );
}

NotesListItem.propTypes = {
  index: PropTypes.number.isRequired,
  note: PropTypes.object.isRequired,
  setSelectedNote: PropTypes.func.isRequired,
  setContextData: PropTypes.func.isRequired,

  setIsSideContext: PropTypes.func.isRequired,
  isSideContext: PropTypes.bool.isRequired,
  contextMenuPositionState: PropTypes.bool.isRequired,
};

NotesListItem.defaultProps = {
  onClick: () => {},
};