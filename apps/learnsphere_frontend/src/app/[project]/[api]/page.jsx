// "use client";
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { apiGroups } from "@/app/data/apis";
// import { toast } from "react-hot-toast";

// export default function ApiPage({ params }) {
//   const { project, api } = params;
//   const projectName = project.toLowerCase();
//   const apiName = api.replace(/-/g, " ").toLowerCase();
  
//   const [darkMode, setDarkMode] = useState(true);
//   const [codeTab, setCodeTab] = useState("node");
//   const [requestParams, setRequestParams] = useState("");
//   const [response, setResponse] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
  
//   // References for copy functionality
//   const endpointRef = useRef(null);
//   const codeRef = useRef(null);
  
//   // Check system preference for dark mode on load
//   useEffect(() => {
//     const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     setDarkMode(isDarkMode);
//   }, []);

//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   const group = apiGroups.find(
//     (g) => g.title.toLowerCase() === projectName
//   );
//   const apiData = group?.apis.find(
//     (a) => a.name.toLowerCase() === apiName
//   );

//   useEffect(() => {
//     if (apiData) {
//       setRequestParams(apiData.input);
//     }
//   }, [apiData]);

//   // Copy to clipboard function
//   const copyToClipboard = async (text, type) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       toast.success(`${type} copied to clipboard!`);
//     } catch (err) {
//       toast.error("Failed to copy to clipboard");
//       console.error("Copy failed: ", err);
//     }
//   };

//   // Method badge styling - with both light and dark mode variants
//   const methodColors = {
//     GET: darkMode ? 'bg-green-900 text-green-300 border border-green-700' : 'bg-green-100 text-green-800 border border-green-300',
//     POST: darkMode ? 'bg-yellow-900 text-yellow-300 border border-yellow-700' : 'bg-yellow-100 text-yellow-800 border border-yellow-300',
//     PUT: darkMode ? 'bg-yellow-900 text-yellow-300 border border-yellow-700' : 'bg-yellow-100 text-yellow-800 border border-yellow-300',
//     DELETE: darkMode ? 'bg-red-900 text-red-300 border border-red-700' : 'bg-red-100 text-red-800 border border-red-300',
//     PATCH: darkMode ? 'bg-blue-900 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-800 border border-blue-300'

//   };

//   // Mock API request handling
//   const handleSendRequest = () => {
//     setIsLoading(true);
//     // Simulate API request with timeout
//     setTimeout(() => {
//       try {
//         const params = JSON.parse(requestParams);
//         setResponse({
//           status: 200,
//           data: apiData.output
//         });
//       } catch (err) {
//         setResponse({
//           status: 400,
//           error: "Invalid JSON format"
//         });
//       }
//       setIsLoading(false);
//     }, 1000);
//   };

//   if (!apiData) {
//     return (
//       <div className={`p-8 ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-gray-50'}`}>
//         <div className={`${darkMode ? 'bg-red-900 border-l-4 border-red-600' : 'bg-red-50 border-l-4 border-red-500'} p-4 rounded`}>
//           <h1 className={`text-xl font-bold ${darkMode ? 'text-red-300' : 'text-red-700'}`}>API not found</h1>
//           <p className={`mt-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>The requested API documentation could not be found.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`p-6 ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-gray-50 text-gray-800'} space-y-8 max-w-5xl mx-auto`}>
//       {/* Header Section with Dark Mode Toggle */}
//       <div className="flex items-center justify-between">
//         <div>
//           <span className={`text-xs px-3 py-1 rounded-full font-medium ${methodColors[apiData.method]}`}>
//             {apiData.method}
//           </span>
//           <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'} mt-2`}>{apiData.name}</h1>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className={`${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'} px-4 py-2 rounded-lg text-sm`}>
//             <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Project: </span>
//             <span className="font-medium">{project.charAt(0).toUpperCase() + project.slice(1)}</span>
//           </div>
//           <button 
//             onClick={toggleDarkMode} 
//             className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 text-yellow-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'} transition-colors`}
//             aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//           >
//             {darkMode ? (
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="5"></circle>
//                 <line x1="12" y1="1" x2="12" y2="3"></line>
//                 <line x1="12" y1="21" x2="12" y2="23"></line>
//                 <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
//                 <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
//                 <line x1="1" y1="12" x2="3" y2="12"></line>
//                 <line x1="21" y1="12" x2="23" y2="12"></line>
//                 <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
//                 <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Description */}
//       <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
//         <h2 className={`font-semibold mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Description</h2>
//         <p className={darkMode ? 'text-slate-400' : 'text-gray-700'}>{apiData.description}</p>
//       </div>

//       {/* Endpoint */}
//       <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
//         <h2 className={`font-semibold mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Endpoint</h2>
//         <div className={`${darkMode ? 'bg-slate-900' : 'bg-slate-50'} rounded-lg p-3 flex items-center justify-between`}>
//           <code ref={endpointRef} className={`${darkMode ? 'text-blue-400' : 'text-blue-700'} font-mono`}>{apiData.endpoint}</code>
//           <button 
//             onClick={() => copyToClipboard(apiData.endpoint, "Endpoint")}
//             className={`${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'} text-sm p-2 rounded hover:bg-opacity-20 hover:bg-slate-500 transition-colors`}
//             aria-label="Copy endpoint"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
//               <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Image if available */}
//       {apiData.image && (
//         <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
//           <h2 className={`font-semibold mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Example Request</h2>
//           <div className={`rounded-lg overflow-hidden ${darkMode ? 'border border-slate-700' : 'border border-gray-200'}`}>
//             <Image
//               src={apiData.image}
//               alt="API Example"
//               width={1000}
//               height={500}
//               className="w-full"
//             />
//           </div>
//         </div>
//       )}

//       {/* Request & Response */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
//           <div className="flex justify-between items-center mb-3">
//             <h2 className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Request Body</h2>
//             <button 
//               onClick={() => copyToClipboard(apiData.input, "Request body")}
//               className={`${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'} text-sm p-1.5 rounded hover:bg-opacity-20 hover:bg-slate-500 transition-colors`}
//               aria-label="Copy request body"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
//                 <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
//               </svg>
//             </button>
//           </div>
//           <pre className={`${darkMode ? 'bg-slate-900 text-slate-300 border-slate-700' : 'bg-slate-50 text-slate-800 border-slate-200'} p-4 rounded-lg text-sm overflow-auto font-mono border`}>
//             {apiData.input}
//           </pre>
//         </div>
//         <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
//           <div className="flex justify-between items-center mb-3">
//             <h2 className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Response</h2>
//             <button 
//               onClick={() => copyToClipboard(apiData.output, "Response")}
//               className={`${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'} text-sm p-1.5 rounded hover:bg-opacity-20 hover:bg-slate-500 transition-colors`}
//               aria-label="Copy response"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
//                 <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
//               </svg>
//             </button>
//           </div>
//           <pre className={`${darkMode ? 'bg-slate-900 text-slate-300 border-slate-700' : 'bg-slate-50 text-slate-800 border-slate-200'} p-4 rounded-lg text-sm overflow-auto font-mono border`}>
//             {apiData.output}
//           </pre>
//         </div>
//       </div>

//       {/* Code Samples */}
//       <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
//         <h2 className={`font-semibold mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Code Examples</h2>
        
//         <div className="flex flex-wrap gap-2 mb-4">
//           {Object.keys(apiData.codeSamples).map((lang) => (
//             <button
//               key={lang}
//               onClick={() => setCodeTab(lang)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 codeTab === lang
//                   ? darkMode
//                     ? "bg-blue-600 text-white"
//                     : "bg-slate-800 text-white"
//                   : darkMode
//                     ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
//                     : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//               }`}
//             >
//               {lang === "node" ? "Node.js" : 
//                lang === "axios" ? "Axios" : 
//                lang === "python" ? "Python" : 
//                lang === "curl" ? "cURL" : lang}
//             </button>
//           ))}
//         </div>
        
//         <div className="relative">
//           <pre ref={codeRef} className={`${darkMode ? 'bg-slate-900 text-slate-300 border-slate-700' : 'bg-slate-50 text-slate-800 border-slate-200'} p-4 rounded-lg text-sm overflow-auto font-mono border`}>
//             {apiData.codeSamples[codeTab]}
//           </pre>
//           <button 
//             onClick={() => copyToClipboard(apiData.codeSamples[codeTab], "Code example")}
//             className={`absolute right-4 top-4 ${darkMode ? 'bg-slate-800 text-slate-400 hover:text-slate-200' : 'bg-slate-100 text-slate-500 hover:text-slate-800'} p-2 rounded-md transition-colors`}
//             aria-label="Copy code example"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
//               <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
      
//       {/* Try It Out Section */}
//       <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
//         <h2 className={`font-semibold mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Try It Out</h2>
//         <div className={`${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} rounded-lg p-6 border`}>
//           <div className="space-y-4">
//             <div>
//               <label className={`block text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-1`}>Parameters</label>
//               <textarea 
//                 className={`w-full rounded-lg ${darkMode ? 'bg-slate-800 border-slate-600 text-slate-300' : 'bg-white border-slate-300 text-slate-800'} p-3 text-sm font-mono`} 
//                 rows="5"
//                 value={requestParams}
//                 onChange={(e) => setRequestParams(e.target.value)}
//               />
//             </div>
//             <button 
//               onClick={handleSendRequest}
//               disabled={isLoading}
//               className={`${
//                 isLoading 
//                   ? 'bg-gray-500 cursor-not-allowed' 
//                   : darkMode 
//                     ? 'bg-blue-600 hover:bg-blue-700' 
//                     : 'bg-blue-600 hover:bg-blue-700'
//               } text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Processing...
//                 </>
//               ) : (
//                 'Send Request'
//               )}
//             </button>
//           </div>
          
//           {/* Response Section */}
//           {response && (
//             <div className="mt-6">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
//                   Response {response.status === 200 ? (
//                     <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
//                       200 OK
//                     </span>
//                   ) : (
//                     <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'}`}>
//                       {response.status} Error
//                     </span>
//                   )}
//                 </h3>
//                 {response.status === 200 && (
//                   <button 
//                     onClick={() => copyToClipboard(response.data, "Response data")}
//                     className={`${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'} text-sm p-1.5 rounded hover:bg-opacity-20 hover:bg-slate-500 transition-colors`}
//                     aria-label="Copy response data"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
//                       <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
//                     </svg>
//                   </button>
//                 )}
//               </div>
//               <pre className={`${darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-800 border-slate-300'} p-4 rounded-lg text-sm overflow-auto font-mono border`}>
//                 {response.status === 200 ? response.data : response.error}
//               </pre>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { apiGroups } from "@/app/data/apis";
import { toast } from "react-hot-toast";

export default function ApiPage({ params }) {
  const { project, api } = params;
  const projectName = project.toLowerCase();
  const apiName = api.replace(/-/g, " ").toLowerCase();
  
  const [darkMode, setDarkMode] = useState(true);
  const [codeTab, setCodeTab] = useState("node");
  const [requestParams, setRequestParams] = useState("");
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    requestBody: false,
    response: false,
    codeExample: false
  });
  
  // References for copy functionality
  const endpointRef = useRef(null);
  const codeRef = useRef(null);
  
  // Check system preference for dark mode on load
  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const group = apiGroups.find(
    (g) => g.title.toLowerCase() === projectName
  );
  const apiData = group?.apis.find(
    (a) => a.name.toLowerCase() === apiName
  );

  useEffect(() => {
    if (apiData) {
      setRequestParams(apiData.input);
    }
  }, [apiData]);

  // Copy to clipboard function
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied to clipboard!`);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
      console.error("Copy failed: ", err);
    }
  };

  // Method badge styling - with both light and dark mode variants
  const methodColors = {
    GET: darkMode ? 'bg-green-900 text-green-300 border border-green-700' : 'bg-green-100 text-green-800 border border-green-300',
    POST: darkMode ? 'bg-yellow-900 text-yellow-300 border border-yellow-700' : 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    PUT: darkMode ? 'bg-yellow-900 text-yellow-300 border border-yellow-700' : 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    DELETE: darkMode ? 'bg-red-900 text-red-300 border border-red-700' : 'bg-red-100 text-red-800 border border-red-300',
    PATCH: darkMode ? 'bg-blue-900 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-800 border border-blue-300'
  };

  // Helper function to determine if content is large (more than 5 lines)
  const isLargeContent = (content) => {
    if (!content) return false;
    return (content.match(/\n/g) || []).length > 5;
  };

  // Mock API request handling
  const handleSendRequest = () => {
    setIsLoading(true);
    // Simulate API request with timeout
    setTimeout(() => {
      try {
        const params = JSON.parse(requestParams);
        setResponse({
          status: 200,
          data: apiData.output
        });
      } catch (err) {
        setResponse({
          status: 400,
          error: "Invalid JSON format"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  if (!apiData) {
    return (
      <div className={`p-8 w-full min-h-screen ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-gray-50'}`}>
        <div className={`${darkMode ? 'bg-red-900 border-l-4 border-red-600' : 'bg-red-50 border-l-4 border-red-500'} p-4 rounded`}>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-red-300' : 'text-red-700'}`}>API not found</h1>
          <p className={`mt-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>The requested API documentation could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-gray-50 text-gray-800'} min-h-screen w-full`}>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section with Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${methodColors[apiData.method]}`}>
              {apiData.method}
            </span>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'} mt-2`}>{apiData.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className={`${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'} px-4 py-2 rounded-lg text-sm`}>
              <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Project: </span>
              <span className="font-medium">{project.charAt(0).toUpperCase() + project.slice(1)}</span>
            </div>
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full ${darkMode ? 'bg-slate-800 text-yellow-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'} transition-colors`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
          <h2 className={`font-semibold mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Description</h2>
          <p className={darkMode ? 'text-slate-400' : 'text-gray-700'}>{apiData.description}</p>
        </div>

        {/* Endpoint */}
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
          <h2 className={`font-semibold mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Endpoint</h2>
          <div className={`${darkMode ? 'bg-slate-900' : 'bg-slate-50'} rounded-lg p-3 flex items-center justify-between`}>
            <code ref={endpointRef} className={`${darkMode ? 'text-blue-400' : 'text-blue-700'} font-mono`}>{apiData.endpoint}</code>
            <button 
              onClick={() => copyToClipboard(apiData.endpoint, "Endpoint")}
              className={`${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'} text-sm p-2 rounded hover:bg-opacity-20 hover:bg-slate-500 transition-colors`}
              aria-label="Copy endpoint"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Image if available */}
        {apiData.image && (
          <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
            <h2 className={`font-semibold mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Example Request</h2>
            <div className={`rounded-lg overflow-hidden ${darkMode ? 'border border-slate-700' : 'border border-gray-200'}`}>
              <Image
                src={apiData.image}
                alt="API Example"
                width={1000}
                height={500}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Request & Response - Now with expand/collapse functionality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
            <div className="flex justify-between items-center mb-3">
              <h2 className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Request Body</h2>
              <div className="flex items-center space-x-2">
                {isLargeContent(apiData.input) && (
                  <button 
                    onClick={() => toggleSection('requestBody')}
                    className={`${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'} text-sm p-1.5 rounded hover:bg-opacity-20 hover:bg-slate-500 transition-colors flex items-center`}
                    aria-label={expandedSections.requestBody ? "Collapse" : "Expand"}
                  >
                    <span className="mr-1 text-xs">{expandedSections.requestBody ? "Collapse" : "Expand"}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {expandedSections.requestBody ? (
                        <polyline points="18 15 12 9 6 15"></polyline>
                      ) : (
                        <polyline points="6 9 12 15 18 9"></polyline>
                      )}
                    </svg>
                  </button>
                )}
                <button 
                  onClick={() => copyToClipboard(apiData.input, "Request body")}
                  className={`${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'} text-sm p-1.5 rounded hover:bg-opacity-20 hover:bg-slate-500 transition-colors`}
                  aria-label="Copy request body"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>
            <pre 
              className={`${darkMode ? 'bg-slate-900 text-slate-300 border-slate-700' : 'bg-slate-50 text-slate-800 border-slate-200'} p-4 rounded-lg text-sm font-mono border ${
                isLargeContent(apiData.input) && !expandedSections.requestBody 
                  ? 'max-h-32 overflow-hidden relative' 
                  : 'overflow-auto'
              }`}
            >
              {apiData.input}
              {isLargeContent(apiData.input) && !expandedSections.requestBody && (
                <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t ${
                  darkMode ? 'from-slate-900' : 'from-slate-50'
                } to-transparent`}></div>
              )}
            </pre>
          </div>

          <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
            <div className="flex justify-between items-center mb-3">
              <h2 className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Response</h2>
              <div className="flex items-center space-x-2">
                {isLargeContent(apiData.output) && (
                  <button 
                    onClick={() => toggleSection('response')}
                    className={`${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'} text-sm p-1.5 rounded hover:bg-opacity-20 hover:bg-slate-500 transition-colors flex items-center`}
                    aria-label={expandedSections.response ? "Collapse" : "Expand"}
                  >
                    <span className="mr-1 text-xs">{expandedSections.response ? "Collapse" : "Expand"}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {expandedSections.response ? (
                        <polyline points="18 15 12 9 6 15"></polyline>
                      ) : (
                        <polyline points="6 9 12 15 18 9"></polyline>
                      )}
                    </svg>
                  </button>
                )}
                <button 
                  onClick={() => copyToClipboard(apiData.output, "Response")}
                  className={`${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'} text-sm p-1.5 rounded hover:bg-opacity-20 hover:bg-slate-500 transition-colors`}
                  aria-label="Copy response"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>
            <pre 
              className={`${darkMode ? 'bg-slate-900 text-slate-300 border-slate-700' : 'bg-slate-50 text-slate-800 border-slate-200'} p-4 rounded-lg text-sm font-mono border ${
                isLargeContent(apiData.output) && !expandedSections.response 
                  ? 'max-h-32 overflow-hidden relative' 
                  : 'overflow-auto'
              }`}
            >
              {apiData.output}
              {isLargeContent(apiData.output) && !expandedSections.response && (
                <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t ${
                  darkMode ? 'from-slate-900' : 'from-slate-50'
                } to-transparent`}></div>
              )}
            </pre>
          </div>
        </div>

        {/* Code Samples - with expand/collapse functionality */}
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Code Examples</h2>
            {isLargeContent(apiData.codeSamples[codeTab]) && (
              <button 
                onClick={() => toggleSection('codeExample')}
                className={`${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'} text-sm p-1.5 rounded hover:bg-opacity-20 hover:bg-slate-500 transition-colors flex items-center`}
                aria-label={expandedSections.codeExample ? "Collapse" : "Expand"}
              >
                <span className="mr-1 text-xs">{expandedSections.codeExample ? "Collapse" : "Expand"}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {expandedSections.codeExample ? (
                    <polyline points="18 15 12 9 6 15"></polyline>
                  ) : (
                    <polyline points="6 9 12 15 18 9"></polyline>
                  )}
                </svg>
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(apiData.codeSamples).map((lang) => (
              <button
                key={lang}
                onClick={() => setCodeTab(lang)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  codeTab === lang
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-white"
                    : darkMode
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {lang === "node" ? "Node.js" : 
                 lang === "axios" ? "Axios" : 
                 lang === "python" ? "Python" : 
                 lang === "curl" ? "cURL" : lang}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <pre 
              ref={codeRef} 
              className={`${darkMode ? 'bg-slate-900 text-slate-300 border-slate-700' : 'bg-slate-50 text-slate-800 border-slate-200'} p-4 rounded-lg text-sm font-mono border ${
                isLargeContent(apiData.codeSamples[codeTab]) && !expandedSections.codeExample 
                  ? 'max-h-48 overflow-hidden relative' 
                  : 'overflow-auto'
              }`}
            >
              {apiData.codeSamples[codeTab]}
              {isLargeContent(apiData.codeSamples[codeTab]) && !expandedSections.codeExample && (
                <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t ${
                  darkMode ? 'from-slate-900' : 'from-slate-50'
                } to-transparent`}></div>
              )}
            </pre>
            <button 
              onClick={() => copyToClipboard(apiData.codeSamples[codeTab], "Code example")}
              className={`absolute right-4 top-4 ${darkMode ? 'bg-slate-800 text-slate-400 hover:text-slate-200' : 'bg-slate-100 text-slate-500 hover:text-slate-800'} p-2 rounded-md transition-colors`}
              aria-label="Copy code example"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Try It Out Section */}
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
          <h2 className={`font-semibold mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Try It Out</h2>
          <div className={`${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} rounded-lg p-6 border`}>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-1`}>Parameters</label>
                <textarea 
                  className={`w-full rounded-lg ${darkMode ? 'bg-slate-800 border-slate-600 text-slate-300' : 'bg-white border-slate-300 text-slate-800'} p-3 text-sm font-mono`} 
                  rows="5"
                  value={requestParams}
                  onChange={(e) => setRequestParams(e.target.value)}
                />
              </div>
              <button 
                onClick={handleSendRequest}
                disabled={isLoading}
                className={`${
                  isLoading 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                } text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Send Request'
                )}
              </button>
            </div>
            
            {/* Response Section */}
            {response && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Response {response.status === 200 ? (
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
                        200 OK
                      </span>
                    ) : (
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'}`}>
                        {response.status} Error
                      </span>
                    )}
                  </h3>
                  {response.status === 200 && (
                    <button 
                      onClick={() => copyToClipboard(response.data, "Response data")}
                      className={`${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'} text-sm p-1.5 rounded hover:bg-opacity-20 hover:bg-slate-500 transition-colors`}
                      aria-label="Copy response data"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  )}
                </div>
                <pre 
                  className={`${darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-800 border-slate-300'} p-4 rounded-lg text-sm font-mono border max-h-64 overflow-auto`}
                >
                  {response.status === 200 ? response.data : response.error}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}