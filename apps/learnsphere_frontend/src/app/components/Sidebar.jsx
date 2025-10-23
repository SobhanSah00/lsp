"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { apiGroups } from "@/app/data/apis.js";

const methodColors = {
  GET: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  POST: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  PUT: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  DELETE: 'bg-red-500/20 text-red-400 border border-red-500/30',
  PATCH: 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
};

export default function Sidebar() {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const sidebarRef = useRef(null);
  const groupRefs = useRef({});

  const toggleGroup = (title) => {
    setExpandedGroups(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const filterApis = () => {
    if (!searchQuery.trim()) return apiGroups;
    
    return apiGroups
      .map(group => ({
        ...group,
        apis: group.apis.filter(api =>
          api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          api.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          api.method.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }))
      .filter(group => group.apis.length > 0);
  };

  useEffect(() => {
    const expandedGroupTitle = Object.keys(expandedGroups).find(title => expandedGroups[title]);
    
    if (expandedGroupTitle && groupRefs.current[expandedGroupTitle]) {
      const groupElement = groupRefs.current[expandedGroupTitle];
      const groupRect = groupElement.getBoundingClientRect();
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      
      if (groupRect.bottom > sidebarRect.bottom) {
        groupElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [expandedGroups]);

  const filteredGroups = filterApis();

  return (
    <div className="bg-black/95 backdrop-blur-xl border-r border-gray-800/50 text-white h-full w-80 flex flex-col relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black/90 to-gray-900/50 pointer-events-none"></div>
      
      {/* Header */}
      <div className="relative p-6 border-b border-gray-800/50">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              LSP
            </h1>
            <p className="text-sm text-gray-400">Documentation Platform</p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search APIs..."
            className="w-full bg-gray-900/50 border border-gray-700/50 text-white rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-4 top-3.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>
      
      {/* API Groups */}
      <div 
        ref={sidebarRef}
        className="relative overflow-y-auto flex-grow custom-scrollbar"
      >
        <div className="p-4 space-y-2">
          {filteredGroups.map((group, index) => (
            <div 
              key={group.title} 
              className="group"
              ref={el => groupRefs.current[group.title] = el}
            >
              <button
                onClick={() => toggleGroup(group.title)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 rounded-xl transition-all duration-200 text-left group-hover:scale-[1.02] transform"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                    index % 4 === 0 ? 'from-blue-400 to-purple-500' :
                    index % 4 === 1 ? 'from-emerald-400 to-cyan-500' :
                    index % 4 === 2 ? 'from-amber-400 to-orange-500' :
                    'from-pink-400 to-red-500'
                  }`}></div>
                  <span className="font-semibold text-gray-100">{group.title}</span>
                  <span className="bg-gray-800/60 text-gray-300 text-xs px-2.5 py-1 rounded-full font-medium">
                    {group.apis.length}
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 text-gray-400 ${
                    expandedGroups[group.title] ? 'transform rotate-180' : ''
                  }`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              <div className={`transition-all duration-300 overflow-hidden ${
                expandedGroups[group.title] 
                  ? 'max-h-screen opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}>
                <div className="ml-6 mt-2 space-y-1">
                  {group.apis.map((api) => {
                    const route = `/${group.title.toLowerCase()}/${api.name.toLowerCase().replace(/\s+/g, "-")}`;
                    return (
                      <Link
                        key={api.name}
                        href={route}
                        className="flex items-center justify-between p-3 pl-4 hover:bg-gray-800/30 rounded-lg border-l-2 border-transparent hover:border-blue-500 transition-all duration-200 group/item"
                      >
                        <span className="text-sm text-gray-300 truncate mr-3 group-hover/item:text-white transition-colors">
                          {api.name}
                        </span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${methodColors[api.method]}`}>
                          {api.method}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="relative p-4 border-t border-gray-800/50">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Online</span>
          </div>
          <span className="font-mono">v2.0.0</span>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.5);
        }
      `}</style>
    </div>
  );
}