import { useState, useEffect, ChangeEvent } from "react";

interface Message {
  id: number;
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:8080/messages");
        const data: Message[] = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async () => {
    try {
      await fetch("http://localhost:8080/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      setText("");

      const res = await fetch("http://localhost:8080/messages");
      const data: Message[] = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Message Board</h1>
      <input
        value={text}
        onChange={handleChange}
        placeholder="Write something"
      />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((m) => (
          <li key={m.id}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}
