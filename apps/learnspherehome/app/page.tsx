"use client";
import { useState, useEffect } from "react";
import { apiGroups } from "../../learnsphere_frontend/src/app/data/apis";

const baseUrl = "http://localhost:3001"

export default function LandingPage() {
  const [stats, setStats] = useState({ totalApis: 0, totalGroups: 0, totalMethods: new Set() });
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Calculate stats
    const totalApis = apiGroups.reduce((sum, group) => sum + group.apis.length, 0);
    const totalGroups = apiGroups.length;
    const methods = new Set();
    apiGroups.forEach(group => {
      group.apis.forEach(api => methods.add(api.method));
    });

    setStats({ totalApis, totalGroups, totalMethods: methods });

    // Update time
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const featuredApis = apiGroups.slice(0, 3).map(group => ({
    ...group,
    featuredApi: group.apis[0]
  }));

  const ContactSupport = () => {
    window.open('mailto:work.sobhansahoo@gmail.com')
  }

  const HnadleToAnotherPage = () => {
    // <a href={`${baseUrl}/todo/create-todo`} target="_replace" rel="noopener noreferrer"/>
    window.open(`${baseUrl}/todo/create-todo`)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 border-b border-gray-800/50 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              API Sphere
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </span>
          <span className="font-mono">{currentTime}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              Next-Gen API Platform
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Simple APIs
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              limitless IMPACT
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            From authentication to chat, social media, to-do apps, and AI tools, our BaaS APIs let frontend developers build faster—without backend hassle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={() => HnadleToAnotherPage()}  className=" cursor-pointer group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105">
              <span className="relative z-10">Start Exploring</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className=" cursor-not-allowed px-8 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl font-semibold text-white hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm">
              View Documentation
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center p-6 bg-gray-900/30 rounded-2xl border border-gray-800/50 backdrop-blur-sm">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stats.totalApis}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Total APIs</div>
            </div>
            <div className="text-center p-6 bg-gray-900/30 rounded-2xl border border-gray-800/50 backdrop-blur-sm">
              <div className="text-3xl font-bold text-purple-400 mb-2">{stats.totalGroups}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">API Groups</div>
            </div>
            <div className="text-center p-6 bg-gray-900/30 rounded-2xl border border-gray-800/50 backdrop-blur-sm">
              <div className="text-3xl font-bold text-emerald-400 mb-2">{stats.totalMethods.size}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">HTTP Methods</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured APIs */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Featured API Groups
          </h2>
          <p className="text-gray-400 text-lg">Discover our most popular API collections</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredApis.map((group, index) => (
            <div key={group.title} className="group cursor-pointer">
              <div className="h-full p-8 bg-gray-900/30 border border-gray-800/50 rounded-3xl backdrop-blur-sm hover:bg-gray-800/40 hover:border-gray-700/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${index === 0 ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30' :
                    index === 1 ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-600/20 border border-emerald-500/30' :
                      'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30'
                    }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${index === 0 ? 'text-blue-400' :
                      index === 1 ? 'text-emerald-400' :
                        'text-amber-400'
                      }`}>
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {group.title}
                    </h3>
                    <p className="text-sm text-gray-400">{group.apis.length} endpoints</p>
                  </div>
                </div>

                {/* <p className="text-gray-300 mb-6 leading-relaxed">
                  {group.featuredApi?.description || "Comprehensive API endpoints for seamless integration and powerful functionality."}
                </p> */}

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {group.apis.slice(0, 3).map((api, apiIndex) => (
                      <span key={apiIndex} className={`text-xs px-2 py-1 rounded-full ${api.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' :
                        api.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                          api.method === 'PUT' ? 'bg-amber-500/20 text-amber-400' :
                            api.method === 'DELETE' ? 'bg-red-500/20 text-red-400' :
                              'bg-purple-500/20 text-purple-400'
                        }`}>
                        {api.method}
                      </span>
                    ))}
                  </div>
                  <button onClick={HnadleToAnotherPage} className=" cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-blue-400 transition-colors">
                      <path d="M7 17L17 7"></path>
                      <path d="M7 7h10v10"></path>
                    </svg>
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto p-12 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-3xl border border-gray-800/50 backdrop-blur-xl">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of developers building amazing applications with our APIs
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* <Link href="/" >
              
            </Link> */}
            <button onClick={() => HnadleToAnotherPage()} className=" cursor-pointer group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105">
              <span className="relative z-10">Browse APIs</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button onClick={() => ContactSupport()} className=" cursor-pointer px-8 py-4 bg-transparent border border-gray-600/50 rounded-xl font-semibold text-white hover:bg-gray-800/30 transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                </svg>
              </div>
              <span className="font-semibold text-gray-300">API Sphere</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© 2025 API Sphere</span>
              <span>•</span>
              <button className="cursor-not-allowed hover:text-white transition-colors">Documentation</button>
              <button onClick={() => ContactSupport()} className="hover:text-white transition-colors">Support</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}