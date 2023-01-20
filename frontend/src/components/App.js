import { useState} from "react"
import "../styles/App.scss"
import ProgressBar from "./ProgressBar";
import StatusLine from "./StatusLine"

function App() {
  const [tasks, setTasks] = useState([])
  const [percentage, setPercentage] = useState(0);

  function addEmptyTask(status) {
    const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        description: "",
        deadline: "",
        urgency: "",
        status: status,
      },
    ]);
  }

  function addTask(taskToAdd) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    let newTaskList = [...filteredTasks, taskToAdd];

    setTasks(newTaskList);
    saveTasksToLocalStorage(newTaskList);
  }


  function deleteTask(taskId) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(filteredTasks);
    saveTasksToLocalStorage(filteredTasks);
  }

  function moveTask(id, newStatus) {
    let task = tasks.filter((task) => {
      return task.id === id;
    })[0];

    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    task.status = newStatus;

    let newTaskList = [...filteredTasks, task];

    setTasks(newTaskList);
    saveTasksToLocalStorage(newTaskList);
    setPercentage(percentage + 10)
    console.log(percentage);
  }

  async function saveTasksToLocalStorage(tasks) {
    var url = "http://localhost:4000/tasks"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks[0]),
    };
    const response = await fetch(url, options);

    //Display a message when the course has been successfully added
    if (response.status === 400) {
      const outcome = await response.json();
      alert(outcome.message)
    }
  }

  return (
    <div className="App">
      <h1>Personal Task Management</h1>

      <ProgressBar value={percentage}>

      </ProgressBar>
      <main>
        <section>
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Not Started"
          />
          <StatusLine
            class="progress"
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="In Progress"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Completed"
          />
        </section>
      </main>
    </div>
  )
}

export default App