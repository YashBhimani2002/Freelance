// actions.js
export const setNotificationMessage = (message) => ({
  type: 'SET_NOTIFICATION_MESSAGE',
  payload: message,
});

export const setSocket = (socket) => ({
  type: 'SET_SOCKET',
  payload: socket,
});
