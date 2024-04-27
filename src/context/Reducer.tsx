export const initialState = {
  gameId: null,
  playerName: "",
  gameState: {
    gameStarted: false,
    score: 0,
    moles: [false, false, false, false, false, false, false],
    gameOver: false,
  },
};

export const actionTypes = {
  WHACK_MOLE: "WHACK_MOLE",
  RESET_GAME: "RESET_GAME",
  END_GAME: "END_GAME",
  START_GAME: "START_GAME",
  ADD_RANDOM_MOLE: "ADD_RANDOM_MOLE",
  SET_PLAYER_NAME: "SET_PLAYER_NAME",
  SUBMITTED_SCORE: "SUBMITTED_SCORE",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "START_GAME": {
      return {
        ...state,
        gameState: {
          ...state.gameState,
          gameStarted: true,
        },
      };
    }
    case "END_GAME": {
      return {
        ...state,
        gameState: {
          ...state.gameState,
          gameOver: true,
          moles: initialState.gameState.moles,
        },
      };
    }
    case "RESET_GAME": {
      return {
        ...state,
        gameState: initialState.gameState,
      };
    }
    case "WHACK_MOLE":
      return {
        ...state,
        gameState: {
          ...state.gameState,
          moles: state.gameState.moles.map((mole: any, i: any) => {
            if (i === action.payload.moleId) {
              return false;
            }
            return mole;
          }),
          score: state.gameState.score + 1,
        },
      };
    case "ADD_RANDOM_MOLE":
      return {
        ...state,
        gameState: {
          ...state.gameState,
          moles: state.gameState.moles.map((mole: any, i: any) => {
            if (i === action.payload.moleId) {
              return true;
            }
            return mole;
          }),
        },
      };
    case "SET_PLAYER_NAME":
      return {
        ...state,
        playerName: action.payload.playerName,
      };
    case "SUBMITTED_SCORE":
      return {
        ...state,
        gameState: initialState.gameState,
        playerName: "",
      };
    default:
      return state;
  }
};

export default reducer;
