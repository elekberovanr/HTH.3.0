import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../../../services/api';


const ChatRoom = () => {
  const { id } = useParams(); // chatId
  const user = useSelector((state) => state.user.user);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await API.get(`/chat/messages/${id}`);
      setMessages(res.data);
    };
    fetchMessages();
  }, [id]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;
    const res = await API.post('/chat/message', {
      chatId: id,
      content: newMsg
    });
    setMessages([...messages, res.data]);
    setNewMsg('');
  };

  return (
    <div>
      <h2>Mesajlar</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {messages.map(msg => (
          <div key={msg._id} style={{ margin: '8px 0' }}>
            <strong>{msg.sender.username}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        placeholder="Mesaj yaz..."
      />
      <button onClick={sendMessage}>Göndər</button>
    </div>
  );
};

export default ChatRoom;
