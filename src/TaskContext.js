import { createContext, useContext, useState, useEffect } from 'react';
import { db } from "./firebaseConfig"
import { setDoc, doc, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const TaskContext = createContext();


export function TaskProvider({ children }) {

  const auth = getAuth();
  const user = auth.currentUser;

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.log("Failed to parse tasks from localStorage", error);
      return [];
    }
  });


  // jezeli userInfo puste
  // spróbuj pobrac z firebase
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('userInfo');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
      return null;
    }
  });

  const [modalFunction, setModalFunction] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSetUserInfo = (data) => {
    try {
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUserInfo(data)
    } catch (error) {
      console.error("Failed to save userInfo", error)
    }
  }

  const changeModalFunction = (value) => {
    setModalFunction(value)
  }

  const assingCurrentTask = (data) => {
    setCurrentTask(data)
  }

  const addTask = async (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    try {
      const docId = `${Date.now()}-${user.uid}`;
      const docRef = doc(db, "tasks", docId);

      await setDoc(docRef, {
        ...newTask
      })
      console.log("Document wrriten to database")

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const editTask = (id, editedTask) => {
    setTasks(tasks.map(task =>
      task.id === id ? {
        ...task,
        ...(editedTask || {}),
        id: task.id
      } : task
    ))
  }

  const toggleCompleted = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{
      tasks, modalFunction, currentTask, userInfo,
      changeModalFunction, addTask, handleSetUserInfo,
      toggleCompleted, deleteTask,
      editTask, assingCurrentTask
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}