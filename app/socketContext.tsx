import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types
interface SocketProviderProps {
  socket: any; // Replace 'any' with the correct socket type if available, e.g., SocketIOClient.Socket or WebSocket
  children: ReactNode;
}

interface SocketContextValue {
  socket: any; // Replace 'any' with the correct socket type if known
  activate: boolean;
  setActivate: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default values
const SocketContext = createContext<SocketContextValue>({
  socket: null,
  activate: false,
  setActivate: () => {}, // Provide a default no-op function
});

// Custom hook for using the socket connection and activate status
export const useSocket = () => useContext(SocketContext);

// Create a provider to wrap your app/component tree
export const SocketProvider: React.FC<SocketProviderProps> = ({ socket, children }) => {
  const [activate, setActivate] = useState(true); // Manage activation state

  return (
    <SocketContext.Provider value={{ socket, activate, setActivate }}>
      {children}
    </SocketContext.Provider>
  );
};
