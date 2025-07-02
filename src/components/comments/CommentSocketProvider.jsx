import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const CommentSocketContext = createContext(null);

const CommentSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const commentSocket = io('http://localhost:5555/comments');
    setSocket(commentSocket);

    return () => {
      commentSocket.disconnect();
    };
  }, []);

  return (
    <CommentSocketContext.Provider value={socket}>
      {children}
    </CommentSocketContext.Provider>
  );
};

export const useCommentSocket = () => useContext(CommentSocketContext);

export default CommentSocketProvider;
