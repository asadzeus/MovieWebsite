import { Toaster } from 'react-hot-toast'; 
import Navbar from "./components/Navbar";
import { MovieProvider } from "./context/MovieContext";
import "./global.css";


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
