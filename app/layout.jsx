import { Toaster } from 'react-hot-toast'; 
import Navbar from "./components/Navbar";
import { MovieProvider } from "./context/MovieContext";
import "./global.css";

export const metadata = {
  title: "Hüda's Movies",
  description: "Birlikte izlediğimiz ve izleyeceğimiz en güzel filmler",
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body >
        <MovieProvider>
        <Navbar/>
        <Toaster position="top-center" /> 
 {children}
        </MovieProvider>
      </body>
    </html>
  );
}
