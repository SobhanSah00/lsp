import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Sidebar from "@/app/components/Sidebar.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LSP DOCS",
  description: "Comprehensive API documentation platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <div className="flex h-screen overflow-hidden">
          <div className="fixed top-0 left-0 h-full w-80 z-50">
            <Sidebar />
          </div>
          
          <main className="ml-80 flex-1 overflow-y-auto bg-black">
            {children}
          </main>
        </div>
        
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              border: '1px solid #374151',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
            },
            success: {
              style: {
                border: '1px solid #059669',
                background: '#064e3b',
              },
              iconTheme: {
                primary: '#10b981',
                secondary: '#064e3b',
              },
            },
            error: {
              style: {
                border: '1px solid #dc2626',
                background: '#7f1d1d',
              },
              iconTheme: {
                primary: '#ef4444',
                secondary: '#7f1d1d',
              },
            },
          }}
        />

      </body>
    </html>
  );
}