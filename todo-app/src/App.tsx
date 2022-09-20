import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {

  interface TaskInt{
    task: string;
  }

  interface TodoListInt{
    currentTask: TaskInt;
    todoList: Array<TaskInt>;
  }
  const [taskState, setTaskState] = useState<TodoListInt> ({
    currentTask:{ task:''}, todoList:[]

  })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) : void => {
  
    setTaskState({...taskState,
      currentTask: { ...taskState.currentTask,[e.target.name]: e.target.value}

      })

  }
  const submitForm = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    setTaskState({
      currentTask:{task:''}, todoList:[
        ...taskState.todoList, taskState.currentTask
      ]
    })
  }

  const deletHandler = (index: number): void => {
    const filterTask = taskState.todoList.filter((task, i) => { 
      return index !== i
    })
  

    setTaskState({...taskState, todoList: filterTask})
  }

  const todoList = taskState.todoList.map((task, i) => (
    <div key={i}>
      <h2>{task.task}</h2>
      <button onClick={() => deletHandler(i)}>X</button>
    </div>

    ))

   
  console.log(taskState);
  
  return (
    <div className='container'>
      <h1>Todo App</h1>
      <form onSubmit={submitForm} className='card'>
        <label htmlFor='task'></label>
        <input type='text' placeholder='Task....' name='task' value={taskState.currentTask.task}
         onChange={onChangeHandler}/>
        <button type='submit' className='submitBtn'>Add Todo</button>
      </form>
      { todoList }
    </div>
  );
}

export default App;
