// reducers.js
const initialState = {
  notificationMessage: [],
  socket: null, // Assuming you want to store the socket instance
};

const rootReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'SET_NOTIFICATION_MESSAGE':
      return {
        ...state,
        notificationMessage: action.payload,
      };
    case 'SET_SOCKET':
      return {
        ...state,
        socket: action.payload, // action.payload contains the socket instance
      };
    default:
      return state;
  }
};

export default rootReducer;
