import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import TableManuscriptView from "../../../components/TableManuscriptView";
import ShareManuscriptDialog from "../../../components/Dialogue/ShareManuscriptDialog/ShareManuscriptDialog";
import SearchForm from "../../Search/SearchForm";

import { Button } from "@mui/material";

export default function CircleDashboard() {
  const dispatch = useDispatch();
  const { circle_id, circleName } = useParams();
  const { id: userId } = useSelector((store) => store.user);
  const history = useHistory();
  const { circleManuscriptsList, userManuscriptNotInCircle } = useSelector(
    (store) => store.circles
  );
  const [showShareModal, setShowShareModal] = useState(false);
  useEffect(() => {
    // Dispatch action to saga to get list of manuscripts shared to that specific circle
    dispatch({ type: "FETCH_CIRCLE_MANUSCRIPTS_LIST", payload: circle_id });
  }, [dispatch]);

  const getUserAllManuscriptList = () => {
    const payload = {
      userId,
      circle_id,
    };
    dispatch({
      type: "FETCH_USER_MANUSCRIPTS_NOT_IN_CIRCLE",
      payload,
      callback: (manuscripts) => {
        setShowShareModal(true);
      },
    });
  };

  const handleShareManuscript = (selectedManuscriptsId) => {
    setShowShareModal(false);
    const payload = {
      selectedManuscriptsId,
      circle_id,
    };
    dispatch({
      type: "CREATE_CIRCLE_MANUSCRIPT",
      payload,
    });
  };

  const handleSearch = (searchTerm) => {
    history.push(`/search/circles/circleManuscriptsList?term=${searchTerm}`);
  };

  const goToMessageBoard = () => {
    history.push(`/message-board/${circle_id}/${circleName}`);
  };

  return (
    <main className="content-main">
      <h1>Circle Dashboard</h1>
      <h2>{circleName.charAt(0).toUpperCase() + circleName.slice(1)}</h2>
      <h2>Circle Manuscripts</h2>
      <SearchForm onSearch={handleSearch} />
      <h3>SHARED MANUSCRIPTS LIST</h3>
      <TableManuscriptView
        circle_id={circle_id}
        manuscriptlist={circleManuscriptsList}
      />

      <Button variant="outlined" onClick={() => getUserAllManuscriptList()}>
        Share Manuscript
      </Button>

      <button onClick={() => history.push(`/circles/${circle_id}/members`)}>
        Members
      </button>

      <button onClick={goToMessageBoard}>Message Board</button>

      <ShareManuscriptDialog
        manuscripts={userManuscriptNotInCircle}
        open={showShareModal}
        setOpen={setShowShareModal}
        circleId={circle_id}
        onShare={(selectedManuscriptsId) =>
          handleShareManuscript(selectedManuscriptsId)
        }
      />
    </main>
  );
}
