import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CircleTableView from "../CircleTableView";
import SearchForm from "../../Search/SearchForm";
import CreateCircleDialog from "../../../components/Dialogue/CreateDialog/CreateCircleDialog";
import { Button } from "@mui/material";
import Header from "../../../layout/Header/Header";

function MyCirclesPage() {
  const { id } = useSelector((store) => store.user);
  const { myJoinedCircleList, myCreatedCircleList } = useSelector(
    (store) => store.circles
  );

  // (remove later if not use) ALTERNATIVE SOLUTION: to resolve new circle added & auto inject into joined circle
  // Uses useMemo to filter circles in myJoinedCircleList based on owner_id
  // const myJoinedCircle = useMemo(() => {
  //   return myJoinedCircleList.filter(circle => circle.owner_id !== id);
  // }, [myJoinedCircleList, id]);

  const dispatch = useDispatch();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [circleName, setCircleName] = useState("");
  const [circleDescription, setCircleDescription] = useState("");

  useEffect(() => {
    dispatch({
      type: "FETCH_MY_JOINED_CIRCLES",
      payload: id,
    });

    dispatch({
      type: "FETCH_MY_CREATED_CIRCLES",
      payload: id,
    });
  }, [id, dispatch]);

  const handleSearch = (searchTerm) => {
    history.push(`/search/circles/myJoinedCircleList?term=${searchTerm}`);
  };

  const handleCreateCircle = () => {
    // Check if the inputs are not empty
    if (!circleName || !circleDescription) {
      alert("Please enter a value for both Circle Name and Description");
      return;
    }

    dispatch({
      type: "CREATE_NEW_CIRCLE",
      payload: {
        name: circleName,
        description: circleDescription,
        ownerId: id,
      },
    });

    // hide the modal and clear the input values
    setShowModal(false);
    setCircleName("");
    setCircleDescription("");
  };

  return (
    <main className="content-main">
      <Header title={"My Circles"} />
      <div align="center">
        <h2>Joined Circles</h2>
        <Button
          variant="contained"
          color="secondary"
          className="browse-joinable-btn"
          onClick={() => history.push(`/circles-browser`)}
        >
          Circle Browser
        </Button>
        <br />
        <br />

        <SearchForm onSearch={handleSearch} />
        <h2>JOINED CIRCLES</h2>
      </div>

      <CircleTableView circlelist={myJoinedCircleList} />

{/* (remove later if not use) ALTERNATIVE SOLUTION: to resolve new circle added & auto inject into joined circle */}
      {/* <CircleTableView circlelist={myJoinedCircle} /> */}


      <div align="center">
        <h2>MY OWNED CIRCLES</h2>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowModal(true)}
        >
          + New Circle
        </Button>

        <CreateCircleDialog
          title="Create Circle"
          open={showModal}
          setOpen={setShowModal}
          inputOne={circleName}
          setInputOne={setCircleName}
          inputTwo={circleDescription}
          setInputTwo={setCircleDescription}
          onConfirm={handleCreateCircle}
        />
        <br></br>
        <br></br>
      </div>

      <CircleTableView circlelist={myCreatedCircleList} />
    </main>
  );
}

export default MyCirclesPage;
