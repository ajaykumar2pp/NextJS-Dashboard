import "./globals.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {/* <Sidebar /> */}
        
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Navbar />
          <main className="p-4">{children}</main>
        </div>
       
      </body>
    </html>
  );
}
