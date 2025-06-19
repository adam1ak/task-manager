import { BrowserRouter as Router} from "react-router-dom";
import { useState } from "react";
import { TaskProvider } from "./TaskContext";
import AppContent from "./AppContent";

function App() {
  const [isNavBar, setIsNavBar] = useState(false);

  const showNavBar = () => {
    setIsNavBar(prev => !prev);
  };

  return (
    <TaskProvider>
      <Router>
        <AppContent isNavBar={isNavBar} showNavBar={showNavBar} />
      </Router>
    </TaskProvider>
  );
}

export default App;