import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

/**
 *
 * @param {object} manuscript
 * @returns individual manuscript list objects to be displayed on various Manuscript list pages.
 */
function ManuscriptListItem(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  let preview = props.manuscript.body;

  if (props.manuscript.body.length > 100) {
    preview = props.manuscript.body.substring(0, 100);
  }

  const handleManuscriptClick = () => {
        dispatch({
          type: "SET_MANUSCRIPT",
          payload: props.manuscript,
        });
        history.push("/manuscript-read");
  };

  return (
    <>
      <div className="ManuscriptListItem" onClick={handleManuscriptClick}>
        <h1>Title: {props.manuscript.title}</h1>
        <h3>Author: {props.manuscript.username}</h3>
        <p>Preview: {preview}...</p>
      </div>
    </>
  );
}

export default ManuscriptListItem;