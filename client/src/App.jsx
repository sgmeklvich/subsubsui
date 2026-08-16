import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // apiUrl will be provided by DigitalOcean App Platform config
    const apiUrl = process.env.apiUrl;
    
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
