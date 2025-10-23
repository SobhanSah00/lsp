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
    requestBody: true,
    response: false,
    codeExample: true
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
      // Handle both string and object input types
      let initialParams = "";
      if (typeof apiData.input === 'string') {
        initialParams = apiData.input;
      } else if (apiData.input) {
        initialParams = JSON.stringify(apiData.input, null, 2);
      } else {
        initialParams = JSON.stringify({}, null, 2);
      }
      setRequestParams(initialParams);
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
  const methodColors = darkMode ? {
    GET: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    POST: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    PUT: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    DELETE: 'bg-red-500/20 text-red-400 border border-red-500/30',
    PATCH: 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
  } : {
    GET: 'bg-green-100 text-green-800 border border-green-300',
    POST: 'bg-blue-100 text-blue-800 border border-blue-300',
    PUT: 'bg-amber-100 text-amber-800 border border-amber-300',
    DELETE: 'bg-red-100 text-red-800 border border-red-300',
    PATCH: 'bg-purple-100 text-purple-800 border border-purple-300'
  };

  // Helper function to determine if content is large (more than 5 lines)
  const isLargeContent = (content) => {
    if (!content) return false;
    return (content.match(/\n/g) || []).length > 5;
  };

  // Generate code examples
  const getCodeExample = (language) => {
    const endpoint = apiData?.endpoint || `/api/${projectName}/${apiName}`;
    const method = apiData?.method || 'GET';

    // Use custom code samples if available, otherwise generate default ones
    if (apiData?.codeSamples && apiData.codeSamples[language]) {
      return apiData.codeSamples[language];
    }

    switch (language) {
      case 'node':
        return `const axios = require('axios');

const response = await axios({
  method: '${method}',
  url: '${endpoint}',
  headers: {
    'Content-Type': 'application/json',
  },
  data: ${requestParams || '{}'}
});

console.log(response.data);`;

      case 'axios':
        return `import axios from 'axios';

const response = await axios.${method.toLowerCase()}(
  '${endpoint}',
  ${requestParams || '{}'},
  {
    headers: {
      'Content-Type': 'application/json',
    }
  }
);

console.log(response.data);`;

      case 'python':
        return `import requests
import json

url = "${endpoint}"
headers = {
    "Content-Type": "application/json",
}
data = ${requestParams || '{}'}

response = requests.${method.toLowerCase()}(url, headers=headers, json=data)
print(response.json())`;

      case 'curl':
        return `curl -X ${method} \\
  '${endpoint}' \\
  -H 'Content-Type: application/json' \\
  -d '${requestParams || '{}'}'`;

      case 'javascript':
        return `const response = await fetch('${endpoint}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(${requestParams || '{}'})

const data = await response.json();
console.log(data);`;

      default:
        return '';
    }
  };

  // Mock API request handling
  const handleSendRequest = () => {
    setIsLoading(true);
    // Simulate API request with timeout
    setTimeout(() => {
      try {
        const params = JSON.parse(requestParams);
        const responseData = apiData?.output || { message: "Success", data: params };
        setResponse({
          status: 200,
          data: typeof responseData === 'string' ? responseData : JSON.stringify(responseData, null, 2)
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
      <div className={`p-8 w-full min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-50'}`}>
        <div className={`${darkMode ? 'bg-red-900/20 border border-red-500/30' : 'bg-red-50 border-l-4 border-red-500'} p-6 rounded-xl max-w-md mx-auto mt-20`}>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <h1 className={`text-xl font-bold mb-2 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>API not found</h1>
            <p className={`mb-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>The requested API documentation could not be found.</p>
            <button
              onClick={() => window.history.back()}
              className={`px-4 py-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const bgClass = darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-800';
  const cardClass = darkMode ? 'bg-gray-900/30 border-gray-800/50 backdrop-blur-sm' : 'bg-white border-gray-200';
  const codeClass = darkMode ? 'bg-black/50 border-gray-700/50' : 'bg-slate-50 border-slate-200';

  return (
    <div className={`${bgClass} min-h-screen w-full`}>
      {/* Header Section with Dark Mode Toggle */}
      <div className={`border-b ${darkMode ? 'border-gray-800/50 bg-gray-900/30' : 'border-gray-200 bg-white'} backdrop-blur-xl sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  <path d="M19 12H5"></path>
                  <path d="M12 19l-7-7 7-7"></path>
                </svg>
              </button>
              <div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${methodColors[apiData.method]}`}>
                  {apiData.method}
                </span>
                <h1 className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{apiData.name}</h1>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{group?.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'} px-4 py-2 rounded-lg text-sm`}>
                <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Project: </span>
                <span className="font-medium">{project.charAt(0).toUpperCase() + project.slice(1)}</span>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-yellow-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Description */}
        <div className={`${cardClass} rounded-xl shadow-sm border p-6`}>
          <h2 className={`font-semibold mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Description</h2>
          <p className={darkMode ? 'text-slate-400 leading-relaxed' : 'text-gray-700 leading-relaxed'}>
            {apiData.description || "This API endpoint provides functionality for your application."}
          </p>
        </div>

        {/* Endpoint */}
        <div className={`${cardClass} rounded-xl shadow-sm border p-6`}>
          <h2 className={`font-semibold mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Endpoint</h2>
          <div className={`${codeClass} rounded-lg p-3 flex items-center justify-between border`}>
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded text-xs font-medium ${methodColors[apiData.method]}`}>
                {apiData.method}
              </span>
              <code ref={endpointRef} className={`${darkMode ? 'text-blue-400' : 'text-blue-700'} font-mono`}>
                {apiData.endpoint || `/api/${projectName}/${apiName}`}
              </code>
            </div>
            <button
              onClick={() => copyToClipboard(apiData.endpoint || `/api/${projectName}/${apiName}`, "Endpoint")}
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

        {/* Image Component - Display API Example Image if available */}
        {apiData.image && (
          <div className={`${cardClass} rounded-xl shadow-sm border p-6`}>
            <h2 className={`font-semibold mb-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Example Request</h2>
            <div className={`rounded-lg overflow-hidden ${darkMode ? 'border border-slate-700' : 'border border-gray-200'}`}>
              <Image
                src={apiData.image}
                alt={`${apiData.name} API Example`}
                width={1000}
                height={500}
                className="w-full h-auto"
                priority={false}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </div>
        )}

        {/* Request & Response */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${cardClass} rounded-xl shadow-sm border p-6`}>
            <div className="flex justify-between items-center mb-3">
              <h2 className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Request Body</h2>
              <div className="flex items-center space-x-2">
                {isLargeContent(requestParams) && (
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
                  onClick={() => copyToClipboard(requestParams || '{}', "Request body")}
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
              className={`${codeClass} p-4 rounded-lg text-sm font-mono border ${isLargeContent(requestParams) && !expandedSections.requestBody
                  ? 'max-h-32 overflow-hidden relative'
                  : 'overflow-auto'
                } ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}
            >
              {requestParams || '{}'}
              {isLargeContent(requestParams) && !expandedSections.requestBody && (
                <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t ${darkMode ? 'from-black/50' : 'from-slate-50'} to-transparent`}></div>
              )}
            </pre>
          </div>

          <div className={`${cardClass} rounded-xl shadow-sm border p-6`}>
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
                  onClick={() => copyToClipboard(typeof apiData.output === 'string' ? apiData.output : JSON.stringify(apiData.output, null, 2), "Response")}
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
              className={`${codeClass} p-4 rounded-lg text-sm font-mono border ${isLargeContent(apiData.output) && !expandedSections.response
                  ? 'max-h-32 overflow-hidden relative'
                  : 'overflow-auto'
                } ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}
            >
              {typeof apiData.output === 'string' ? apiData.output : JSON.stringify(apiData.output, null, 2) || '{}'}
              {isLargeContent(apiData.output) && !expandedSections.response && (
                <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t ${darkMode ? 'from-black/50' : 'from-slate-50'} to-transparent`}></div>
              )}
            </pre>
          </div>
        </div>

        {/* Parameters Section (if available) */}
        {apiData.parameters && (
          <div className={`${cardClass} rounded-xl shadow-sm border p-6`}>
            <h2 className={`font-semibold mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Parameters</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-2 px-3 ${darkMode ? 'text-slate-300' : 'text-slate-700'} font-medium`}>Name</th>
                    <th className={`text-left py-2 px-3 ${darkMode ? 'text-slate-300' : 'text-slate-700'} font-medium`}>Type</th>
                    <th className={`text-left py-2 px-3 ${darkMode ? 'text-slate-300' : 'text-slate-700'} font-medium`}>Required</th>
                    <th className={`text-left py-2 px-3 ${darkMode ? 'text-slate-300' : 'text-slate-700'} font-medium`}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.parameters.map((param, index) => (
                    <tr key={index} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                      <td className={`py-2 px-3 font-mono text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {param.name}
                      </td>
                      <td className={`py-2 px-3 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        <span className={`px-2 py-1 rounded text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                          {param.type}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-sm">
                        {param.required ? (
                          <span className="text-red-500 font-medium">Yes</span>
                        ) : (
                          <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>No</span>
                        )}
                      </td>
                      <td className={`py-2 px-3 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {param.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Code Samples */}
        <div className={`${cardClass} rounded-xl shadow-sm border p-6`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Code Examples</h2>
            {isLargeContent(getCodeExample(codeTab)) && (
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
            {['node', 'axios', 'python', 'curl', 'javascript'].map((lang) => (
              <button
                key={lang}
                onClick={() => setCodeTab(lang)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${codeTab === lang
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
                      lang === "curl" ? "cURL" :
                        lang === "javascript" ? "JavaScript" : lang}
              </button>
            ))}
          </div>

          <div className="relative">
            <pre
              ref={codeRef}
              className={`${codeClass} p-4 rounded-lg text-sm font-mono border ${isLargeContent(getCodeExample(codeTab)) && !expandedSections.codeExample
                  ? 'max-h-48 overflow-hidden relative'
                  : 'overflow-auto'
                } ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}
            >
              {getCodeExample(codeTab)}
              {isLargeContent(getCodeExample(codeTab)) && !expandedSections.codeExample && (
                <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t ${darkMode ? 'from-black/50' : 'from-slate-50'} to-transparent`}></div>
              )}
            </pre>
            <button
              onClick={() => copyToClipboard(getCodeExample(codeTab), "Code example")}
              className={`absolute right-4 top-4 p-2 rounded-md transition-colors ${darkMode ? 'bg-slate-800 text-slate-400 hover:text-slate-200' : 'bg-slate-100 text-slate-500 hover:text-slate-800'}`}
              aria-label="Copy code example"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Response Codes Section (if available) */}
        {apiData.responseCodes && (
          <div className={`${cardClass} rounded-xl shadow-sm border p-6`}>
            <h2 className={`font-semibold mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Response Codes</h2>
            <div className="space-y-3">
              {apiData.responseCodes.map((code, index) => (
                <div key={index} className={`flex items-center space-x-4 p-3 rounded-lg ${darkMode ? 'bg-black/30' : 'bg-gray-50'}`}>
                  <span className={`px-3 py-1 rounded-full text-sm font-mono font-medium ${code.status >= 200 && code.status < 300
                      ? darkMode ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-800'
                      : code.status >= 400 && code.status < 500
                        ? darkMode ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-yellow-100 text-yellow-800'
                        : darkMode ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-800'
                    }`}>
                    {code.status}
                  </span>
                  <div className="flex-1">
                    <p className={`font-medium ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{code.message}</p>
                    {code.description && (
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'} mt-1`}>{code.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Try It Out Section */}
        <div className={`${cardClass} rounded-xl shadow-sm border p-6`}>
          <h2 className={`font-semibold mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Try It Out</h2>
          <div className={`${codeClass} rounded-lg p-6 border`}>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Request Parameters
                  <span className={`ml-2 text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                    (JSON format)
                  </span>
                </label>
                <textarea
                  className={`w-full rounded-lg p-4 text-sm font-mono border focus:outline-none focus:ring-2 resize-none transition-all ${darkMode
                      ? 'bg-slate-800 border-slate-600 text-slate-300 focus:ring-blue-500/50 focus:border-blue-500/50'
                      : 'bg-white border-slate-300 text-slate-800 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  rows="8"
                  value={requestParams}
                  onChange={(e) => setRequestParams(e.target.value)}
                  placeholder="Enter your JSON request body here..."
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSendRequest}
                    disabled={isLoading}
                    className={`${isLoading
                        ? 'bg-gray-500 cursor-not-allowed'
                        : darkMode
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300 shadow-lg`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Send Request
                      </>
                    )}
                  </button>

                  {!isLoading && (
                    <button
                      onClick={() => {
                        setRequestParams(apiData?.input ?
                          (typeof apiData.input === 'string' ? apiData.input : JSON.stringify(apiData.input, null, 2))
                          : JSON.stringify({}, null, 2)
                        );
                        setResponse(null);
                      }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${darkMode
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Request URL Preview */}
                <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'} font-mono`}>
                  {apiData.method} /api/{projectName}/{apiName.replace(' ', '-')}
                </div>
              </div>
            </div>

            {/* Response Section */}
            {response && (
              <div className="mt-8 pt-6 border-t border-gray-600/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Response
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${response.status === 200
                        ? darkMode ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-green-100 text-green-800'
                        : darkMode ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-800'
                      }`}>
                      {response.status} {response.status === 200 ? 'OK' : 'Error'}
                    </span>
                    {response.status === 200 && (
                      <button
                        onClick={() => copyToClipboard(response.data, "Response data")}
                        className={`${darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'} text-sm p-2 rounded hover:bg-opacity-20 hover:bg-slate-500 transition-colors`}
                        aria-label="Copy response data"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                <div className={`rounded-lg border p-4 ${response.status === 200
                    ? darkMode ? 'bg-green-500/5 border-green-500/20' : 'bg-green-50 border-green-200'
                    : darkMode ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-200'
                  }`}>
                  <pre className={`text-sm font-mono whitespace-pre-wrap overflow-x-auto ${response.status === 200
                      ? darkMode ? 'text-green-300' : 'text-green-800'
                      : darkMode ? 'text-red-300' : 'text-red-800'
                    }`}>
                    {response.status === 200 ? response.data : response.error}
                  </pre>
                </div>

                {/* Response Headers Simulation */}
                <div className="mt-4">
                  <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Response Headers</h4>
                  <div className={`text-xs font-mono p-3 rounded-lg ${darkMode ? 'bg-slate-800/50 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                    <div>content-type: application/json</div>
                    <div>x-response-time: {Math.floor(Math.random() * 100 + 50)}ms</div>
                    <div>date: {new Date().toUTCString()}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Notes Section (if available) */}
        {apiData.notes && (
          <div className={`${cardClass} rounded-xl shadow-sm border p-6`}>
            <h2 className={`font-semibold mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Additional Notes</h2>
            <div className={`space-y-3 ${darkMode ? 'text-slate-400' : 'text-gray-700'}`}>
              {Array.isArray(apiData.notes) ? (
                <ul className="space-y-2">
                  {apiData.notes.map((note, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${darkMode ? 'bg-slate-500' : 'bg-slate-400'}`}></div>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="leading-relaxed">{apiData.notes}</p>
              )}
            </div>
          </div>
        )}

        {/* Rate Limiting Info (if available) */}
        {apiData.rateLimit && (
          <div className={`${cardClass} rounded-xl shadow-sm border p-6`}>
            <h2 className={`font-semibold mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Rate Limiting</h2>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'}`}>
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`mt-0.5 flex-shrink-0 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="6" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>
                    Rate Limit: {apiData.rateLimit.requests} requests per {apiData.rateLimit.window}
                  </p>
                  {apiData.rateLimit.description && (
                    <p className={`text-sm mt-1 ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                      {apiData.rateLimit.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}