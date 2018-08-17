import io from 'socket.io-client';

// change to const socket = io(); for deployment
const socket = io('http://localhost:3005');

socket.on('connect', () => {
  console.log('Client connected!');
});

export default socket;