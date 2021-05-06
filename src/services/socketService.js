import io from 'socket.io-client';

export const connect = () => {
  const socket = io(process.env.REACT_APP_BACKEND_URL,{
    query: { token: localStorage.getItem('token') },
  });
  return socket;
};
