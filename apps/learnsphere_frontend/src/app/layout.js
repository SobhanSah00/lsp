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
  title: "LearnSphere API Docs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen">
          {/* Fixed Sidebar */}
          <div className="fixed top-0 left-0 h-full w-64 z-50">
            <Sidebar />
          </div>
          
          {/* Main content with left margin to match sidebar width */}
          <main className="ml-64 flex-1 overflow-y-auto p-8 bg-gray-100">
            {children}
          </main>
        </div>
        
        {/* Toast notifications - positioned in bottom right */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--toast-bg, #333)',
              color: 'var(--toast-color, #fff)',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
            },
            success: {
              style: {
                border: '1px solid var(--toast-success-border, #65a30d)',
              },
            },
            error: {
              style: {
                border: '1px solid var(--toast-error-border, #dc2626)',
              },
            },
          }}
        />
      </body>
    </html>
  );
}