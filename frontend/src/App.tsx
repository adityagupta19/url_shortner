import { useState } from 'react'
import { FiCopy } from "react-icons/fi";
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
  expiry: number; // Representing time.Duration as a number (hours)
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
    setResponse(undefined);
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

  const handleCopy = () => {
    if (response?.short) {
      navigator.clipboard.writeText(response.short);
      alert("Short URL copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center py-10">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Shorten Your URL</h1>
      </header>
      <main className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              URL:
            </label>
            <input
              id="url"
              type="url"
              name="url"
              placeholder="What do you want to shorten?"
              value={request.url}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="short" className="block text-sm font-medium text-gray-700">
              Custom Short Code:
            </label>
            <input
              id="short"
              type="text"
              name="short"
              placeholder="Do you have a custom short code in mind?"
              value={request.short}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
              Expiry (in hrs):
            </label>
            <input
              id="expiry"
              type="number"
              name="expiry"
              placeholder="For how long should the URL stay active?"
              value={request.expiry}
              onChange={handleChange}
              min={0}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Shorten
          </button>
        </form>
        <div className="mt-6">
          {response ? (
            <div className="bg-green-100 border border-green-300 p-4 rounded-md text-center">
              <h2 className="text-2xl font-bold text-green-700">Short URL</h2>
              <p
                className="text-lg font-semibold text-blue-600 underline cursor-pointer mt-2 flex items-center justify-center"
              >
                {response.short}
                <FiCopy onClick={handleCopy} className="ml-2" />
              </p>
              
              <p className="text-sm text-gray-600 mt-4">
                <strong>Original URL:</strong> {response.url}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Expiry (Hours):</strong> {response.expiry}
              </p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-300 p-4 rounded-md">
              <p className="text-red-700">Error: {error.error}</p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
export default App
