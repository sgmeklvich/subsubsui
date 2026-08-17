import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // apiUrl will be provided by DigitalOcean App Platform config
    const apiUrl = process.env.REACT_APP_PUBLIC_URL;
    
    fetch(`${apiUrl}/api/health`)
     .then(async (res) => {
        // Grab the text first to see what it actually is
        const text = await res.text();
        console.log("Raw response from server:", text);
        
        // Try parsing it manually
        return JSON.parse(text);
      })
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
