import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // VITE_API_URL will be provided by DigitalOcean App Platform config
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    
    fetch(`${apiUrl}/api/health`)
      .then((res) => res.json())
      .then((data) => setMessage(data.status))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Frontend Connected</h1>
      <p>Backend Status: {message}</p>
    </div>
  );
}

export default App;
