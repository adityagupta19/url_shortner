import { useState } from 'react'
import axios from 'axios';
import './App.css'


function App() {
  const [url, setUrl] = useState<string>("")
  const [response,setResponse] = useState<any>();

  const apiEndpoint = "http://localhost:3000/api/v1"

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };
  const handleSubmit = async () => {
    const request = {
      "url": url,
      "short":"",
      "expiry":0 
    }
    console.log("api call is being made: ",request);
    const res = await axios.post(apiEndpoint,request);
    setResponse(res)
  }

  return (
    <>
      <div>
      </div>
      <h1>Shorten your url</h1>
      <div className="card">
        <input 
          placeholder='What do you want to shorten???'
          type='text'
          name='url'
          value={url}
          onChange={handleChange}
        ></input>
        <button onClick={handleSubmit} color='#000000'> Shorten </button>
        {response.short}
      </div>
      
    </>
  )
}

export default App
