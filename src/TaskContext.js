import { createContext, useContext, useState, useEffect } from 'react';
import { db } from "./firebaseConfig"
import { doc, onSnapshot, collection, deleteDoc, addDoc, query, orderBy, where, getDocs } from "firebase/firestore";
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

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (!currentUser?.uid) return;

    const fetchTasks = () => {
      try {
        const taskRef = collection(db, "users", currentUser.uid, "tasks");

        const unsubscribe = onSnapshot(taskRef, (querySnapshot) => {
          const newTasks = querySnapshot.docs.map((doc) => ({ ...doc.data() }));

          setTasks((prevTask) => {
            if (JSON.stringify(prevTask) !== JSON.stringify(newTasks)) {
              return newTasks;
            } else {
              return prevTask;
            }
          })

          console.log("Succed to recive tasks from database")
        });
        return unsubscribe;
      } catch (error) {
        console.error("Failed to receive tasks from database", error)
      }
    };

    fetchTasks();
  }, [currentUser?.uid])


  const [userInfo, setUserInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('userInfo');
      if (saved) {
        setLoadingAuth(false);
        return JSON.parse(saved);
      }
      return null;
    } catch (error) {
      console.error("Failed to parse user info from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    if (userInfo !== null || !currentUser?.uid) return;

    const userRef = doc(db, "users", currentUser?.uid);
    const unsub = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUserInfo(data)
        setLoadingAuth(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    })

    return unsub;
  }, [currentUser?.uid, userInfo])

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
    if (!currentUser?.uid) {
      console.error("Cannot add task: No user logged in.");
      return;
    }

    const taskWithId = { ...newTask, id: Date.now() };
    setTasks([...tasks, taskWithId]);

    try {
      const userTasksRef = collection(db, "users", currentUser.uid, "tasks");
      await addDoc(userTasksRef, {
        ...newTask,
        id: Date.now(),
      });
      console.log("Document written to database");
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

  const deleteTask = async (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    try {
      const taskRef = collection(db, "users", currentUser.uid, "tasks");
      const q = query(taskRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log("Document deleted form database");
      })

    } catch (error) {
      console.error("Error during deleting task", error)
    }
  };
  
  if (loadingAuth) {
    return (
      <div className="flex bg-yellow-300 items-center justify-center w-full h-full">
        <div className="text-center bg-yellow-300">
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