import "@styles/globals.css";
import Nav from "@components/Nav";
import Provier from "@components/Provider"
export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
    </body>
  </html>
);

export default RootLayout;