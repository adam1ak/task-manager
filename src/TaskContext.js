import { createContext, useContext, useState, useEffect } from 'react';
import { db } from "./firebaseConfig"
import { setDoc, doc, onSnapshot, collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { PropagateLoader } from 'react-spinners';


const TaskContext = createContext();


export function TaskProvider({ children }) {

  const [modalFunction, setModalFunction] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
    });

    return unsubscribe;
  }, [auth])

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.log("Failed to parse tasks from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  // Reciving user data from localstorage
  // If there is no existing data
  // It will try to recive from database ( firebase )

  const [userInfo, setUserInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('userInfo');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    if (userInfo !== null || !currentUser?.uid) return;

    const userRef = doc(db, "users", currentUser?.uid);
    const unsub = onSnapshot(userRef, (doc) => {
      if (doc.exists) {
        const data = doc.data();
        setUserInfo(data)
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    })

    return unsub;
  }, [currentUser?.uid, userInfo])

  // Setting userInfo to localStorage in AuthForm.js component.
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
      const docId = `${Date.now()}-${currentUser?.uid}`;
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

  if (!loadingAuth) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center">
          <PropagateLoader
            color="#16A34A"
            loading
            size={25}
          />
        </div>
      </div>
    )
  }

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