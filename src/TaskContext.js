import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

  const initialTasks = [
  {
    id: 1,
    title: "Complete project proposal",
    description: "Write the final draft for client approval",
    date: "2023-06-15",
    important: false,
    completed: false
  },
  {
    id: 2,
    title: "Review UI designs",
    description: "Provide feedback on the new dashboard mockups",
    date: "2023-06-12",
    important: true,
    completed: true
  },
  {
    id: 3,
    title: "Team meeting",
    description: "Weekly sync with development team",
    date: "2023-06-10",
    important: false,
    completed: false
  },
  {
    id: 4,
    title: "Update documentation",
    description: "Add new API endpoints to developer docs",
    date: "2023-06-18",
    important: false,
    completed: false
  },
  {
    id: 5,
    title: "Fix login bug",
    description: "Investigate authentication timeout issue",
    date: "2023-06-09",
    important: false,
    completed: true
  }
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [modalFunction, setModalFunction] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const changeModalFunction = (value) => {
    setModalFunction(value)
  }

  const assingCurrentTask = (data) => {
    setCurrentTask(data)
  }

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
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
      tasks, modalFunction, currentTask,
      changeModalFunction, addTask, 
      toggleCompleted, deleteTask,
      editTask, assingCurrentTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}