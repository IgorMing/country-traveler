// Actions
const GET_MESSAGE = 'EXAMPLE/GET_MESSAGE';

const INITIAL_STATE = {
  loading: true,
  message: ''
};

// Reducer
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MESSAGE:
      return {
        ...state,
        message: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

// Action Creators
export function getMessage() {
  return {
    type: GET_MESSAGE,
    payload: 'Example component!'
  };
}

export function getAnotherMessage() {
  return {
    type: GET_MESSAGE,
    payload: 'Another message! :D'
  };
}
