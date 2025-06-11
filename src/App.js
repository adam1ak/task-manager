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
      <AppContent isNavBar={isNavBar} showNavBar={showNavBar} />
    </TaskProvider>
  );
}

export default App;