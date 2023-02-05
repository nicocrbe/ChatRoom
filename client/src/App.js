import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import ChatPage from './Components/ChatPage.js';
import {io} from 'socket.io-client';

const socket = io('http://localhost:4000');
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;