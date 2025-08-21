// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import { apiGroups } from "@/app/data/apis.js";

// const methodColors = {
//   GET: 'bg-green-100 text-green-800',
//   POST: 'bg-yellow-100 text-yellow-800',
//   PUT: 'bg-yellow-100 text-yellow-800',
//   DELETE: 'bg-red-100 text-red-800',
//   PATCH: 'bg-blue-100 text-blue-800'
// };

// export default function Sidebar() {
//   const [expandedGroups, setExpandedGroups] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");

//   const toggleGroup = (title) => {
//     setExpandedGroups(prev => ({
//       ...prev,
//       [title]: !prev[title]
//     }));
//   };

//   // Filter APIs based on search query
//   const filterApis = () => {
//     if (!searchQuery.trim()) return apiGroups;

//     return apiGroups
//       .map(group => ({
//         ...group,
//         apis: group.apis.filter(api => 
//           api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           api.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           api.method.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       }))
//       .filter(group => group.apis.length > 0);
//   };

//   const filteredGroups = filterApis();

//   return (
//     <div className="bg-slate-900 text-white h-full w-72 flex flex-col">
//       {/* Search Bar */}
//       <div className="p-4 border-b border-slate-700">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search APIs..."
//             className="w-full bg-slate-800 text-white rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <div className="absolute left-3 top-2.5 text-slate-400">
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <circle cx="11" cy="11" r="8"></circle>
//               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* API Groups */}
//       <div className="overflow-y-auto flex-grow">
//         {filteredGroups.map((group) => (
//           <div key={group.title} className="border-b border-slate-800">
//             <button
//               onClick={() => toggleGroup(group.title)}
//               className="w-full flex items-center justify-between p-4 hover:bg-slate-800 transition-colors text-left"
//             >
//               <div className="flex items-center">
//                 <span className="font-bold text-sm text-slate-200">{group.title}</span>
//                 <span className="ml-2 bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">
//                   {group.apis.length}
//                 </span>
//               </div>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className={`transition-transform ${expandedGroups[group.title] ? 'transform rotate-180' : ''}`}
//               >
//                 <polyline points="6 9 12 15 18 9"></polyline>
//               </svg>
//             </button>
            
//             <div className={`transition-all duration-200 overflow-hidden ${expandedGroups[group.title] ? 'max-h-96' : 'max-h-0'}`}>
//               {group.apis.map((api) => {
//                 const route = `/${group.title.toLowerCase()}/${api.name.toLowerCase().replace(/\s+/g, "-")}`;
                
//                 return (
//                   <Link
//                     key={api.name}
//                     href={route}
//                     className="flex items-center justify-between p-3 pl-6 hover:bg-slate-800 border-l-4 border-transparent hover:border-blue-500 transition-all"
//                   >
//                     <span className="text-sm text-slate-300">{api.name}</span>
//                     <span className={`text-xs px-2 py-0.5 rounded ${methodColors[api.method]}`}>
//                       {api.method}
//                     </span>
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t border-slate-700 text-xs text-slate-400">
//         <div className="flex items-center justify-between">
//           <span>API Documentation</span>
//           <span>v1.0.0</span>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { apiGroups } from "@/app/data/apis.js";

const methodColors = {
  GET: 'bg-green-100 text-green-800',
  POST: 'bg-yellow-100 text-yellow-800',
  PUT: 'bg-orange-100 text-orange-800',
  DELETE: 'bg-red-100 text-red-800',
  PATCH: 'bg-blue-100 text-blue-800'
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

  // Filter APIs based on search query
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

  // Effect to handle scrolling when a group is expanded
  useEffect(() => {
    const expandedGroupTitle = Object.keys(expandedGroups).find(title => expandedGroups[title]);
    
    if (expandedGroupTitle && groupRefs.current[expandedGroupTitle]) {
      const groupElement = groupRefs.current[expandedGroupTitle];
      const groupRect = groupElement.getBoundingClientRect();
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      
      // Check if the expanded group is partially out of view
      if (groupRect.bottom > sidebarRect.bottom) {
        groupElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [expandedGroups]);

  const filteredGroups = filterApis();

  return (
    <div className="bg-slate-900 text-white h-full w-72 flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-slate-700 sticky top-0 bg-slate-900 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search APIs..."
            className="w-full bg-slate-800 text-white rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>
      
      {/* API Groups - Main scrollable area */}
      <div 
        ref={sidebarRef}
        className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
      >
        {filteredGroups.map((group) => (
          <div 
            key={group.title} 
            className="border-b border-slate-800"
            ref={el => groupRefs.current[group.title] = el}
          >
            <button
              onClick={() => toggleGroup(group.title)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-800 transition-colors text-left"
            >
              <div className="flex items-center">
                <span className="font-bold text-sm text-slate-200">{group.title}</span>
                <span className="ml-2 bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                  {group.apis.length}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform ${expandedGroups[group.title] ? 'transform rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            
            {/* Group content - max height set to accommodate large lists */}
            <div className={`transition-all duration-300 ${
              expandedGroups[group.title] 
                ? 'max-h-screen overflow-y-auto' 
                : 'max-h-0 overflow-hidden'
            }`}>
              {group.apis.map((api) => {
                const route = `/${group.title.toLowerCase()}/${api.name.toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <Link
                    key={api.name}
                    href={route}
                    className="flex items-center justify-between p-3 pl-6 hover:bg-slate-800 border-l-4 border-transparent hover:border-blue-500 transition-all"
                  >
                    <span className="text-sm text-slate-300 truncate mr-2">{api.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${methodColors[api.method]}`}>
                      {api.method}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-slate-700 text-xs text-slate-400 sticky bottom-0 bg-slate-900">
        <div className="flex items-center justify-between">
          <span>API Documentation</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </div>
  );
}