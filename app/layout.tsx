import TopBar from "@/components/layout/TopBar";
import "./globals.css";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body>
        {/* <TopBar /> */}
        <Header />
        {/* <Navbar /> */}

        <main>{children}</main>
      </body>
       
       
       
    </html>
  );
}