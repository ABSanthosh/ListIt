import React from "react";
// import PropTypes from "prop-types";
import "./BoardsContainer.scss";

import { useStoreState } from "easy-peasy";

function BoardsContainer() {
  const boards = useStoreState((state) => state.boards);
  return (
    <div className="BoardsContainerWrapper">
      <div className="BoardsContainerWrapper__top"></div>
      <div className="BoardsContainerWrapper__bottom">
        {boards.map((board, index) => (
          <div className="BoardsContainerWrapper__item" key={index}>
            <div className="BoardsContainerWrapper__item__title">
              {board.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

BoardsContainer.propTypes = {
  // bla: PropTypes.string,
};

BoardsContainer.defaultProps = {
  // bla: 'test',
};

export default BoardsContainer;