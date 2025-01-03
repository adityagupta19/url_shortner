import { useState } from 'react'
import axios from 'axios';
import './App.css'

interface Request {
  url: string;
  short: string;
  expiry: number; 
}

interface Response {
  url: string;
  short: string;
  expiry: number; // Representing time.Duration as a number (typically in milliseconds or seconds)
  XRateRemaining: number; // Represents `rate_limit`
  rate_limit_reset: number; // Represents `rate_limit_reset`
}



function App() {
  //const [url, setUrl] = useState<string>("")
  const [response,setResponse] = useState<Response>();
  const [error,setError] = useState<any>();
  const [request,setRequest] = useState<Request>({
    url:"",
    short:"",
    expiry:0
  });

  const apiEndpoint = "http://localhost:3000/api/v1"

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setRequest((prevRequest) => ({
      ...prevRequest,
      [name]: name === "expiry" ? parseInt(value, 10) || 0 : value,
    }));
  }
  const handleSubmit = async () => {
    setError(null);
    console.log("api call is being made: ",request);
    try{
      const res = await axios.post(apiEndpoint,request);
      console.log(res.data)
      setResponse(res.data)
    }catch(e:any){
      console.log("Error: ")
      console.log(e?.response.data);
      setError(e?.response.data);
    }
  }

  return (
    <>
      <header>
        <h1>Shorten Your URL</h1>
      </header>
      <main>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission behavior
            handleSubmit();
          }}
          className="shorten-form"
        >
          <div className="card">
            <label htmlFor="url">URL:</label>
            <input
              id="url"
              placeholder="What do you want to shorten?"
              type="url"
              name="url"
              value={request.url}
              onChange={handleChange}
              required
            />
            <label htmlFor="short">Custom Short Code:</label>
            <input
              id="short"
              placeholder="Do you have a custom short code in mind?"
              type="text"
              name="short"
              value={request.short}
              onChange={handleChange}
            />
            <label htmlFor="expiry">Expiry (in hrs):</label>
            <input
              id="expiry"
              placeholder="For how long should the URL stay active?"
              type="number"
              name="expiry"
              value={request.expiry}
              onChange={handleChange}
              min={0}
            />
            <button type="submit" className="shorten-button">
              Shorten
            </button>
          </div>
        </form>
        <div className="response">
          {response && (
            <div>
              <h2>Shortened URL</h2>
              <p>
                <strong>Original URL:</strong> {response.url}
              </p>
              <p>
                <strong>Short URL:</strong>{" "}
                <a href={response.short} >
                  {response.short}
                </a>
              </p>
              <p>
                <strong>Expiry (Hours):</strong> {response.expiry}
              </p>
              <p>
                <strong>Rate Limit Remaining:</strong> {response.XRateRemaining}
              </p>
              <p>
                <strong>Rate Limit Reset (Mins):</strong> {response.rate_limit_reset}
              </p>
            </div>
          )}
          {error && <div className="error">Error: {error.error}</div>}
        </div>
      </main>
    </>
  );
}

export default App
