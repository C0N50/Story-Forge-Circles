const initialState = {
  myJoinedCircleList: [],
  myCreatedCircleList: [],
  allCirclesList: [],
};

const circles = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MY_JOINED_CIRCLES_LIST":
      return {
        ...state,
        myJoinedCircleList: action.payload,
      };
    case "CREATE_NEW_CIRCLE":
      return {
        ...state,
        myCreatedCricleList: [...state.myCreatedCircleList, action.payload],
      };
    case "CLEAR_MY_CIRCLES_LIST":
      return [];
    case "SET_MY_CREATED_CIRCLES_LIST":
      return {
        ...state,
        myCreatedCircleList: action.payload,
      };
    default:
      return state;
  }
};

export default circles;
