import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Routes>
              <Route
                path="/rooms/:roomId"
                element={
                  <>
                    <Sidebar />
                    <Chat />
                  </>
                }
              />
              <Route path="/" element={<Sidebar />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
