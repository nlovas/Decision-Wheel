'use client';

import Image from "next/image";
import { Sidebar } from "./ui/sidebar";
import { Wheel } from "./ui/wheel";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from "./types";

export default function Home() {
  const [taskList, setTaskList] = useState(Array<Task>());

  function addTask(task: string){
    const newTask: Task = {
      id: uuidv4(),
      task: task
    }
    setTaskList([...taskList, newTask]);
  }

  function editTask(newText: string, taskId: string){
    //let idx = taskList.findIndex((task) => {task.id === taskId});
    /*const editedTask: Task = {
      id: taskId,
      task: newText
    }*/
    let updatedList = taskList.map((item, index) => {
      if(item.id === taskId) {
        return {task: newText, id: item.id};
      } else return item;
    });
    setTaskList([...updatedList]);
  }

  function deleteTask(index: number){
    let newArray = taskList.filter((task, idx) => {
      return idx !== index;
    })
    setTaskList([...newArray]);
  }


  return (
    <main className="flex h-screen flex-col p-20">
      <h1 className="w-full text-center">Decision Wheel</h1>
      <div className="flex flex-row items-center justify-center mt-6 h-full border border-pink-400">
        <div className="flex flex-col h-full relative basis-3/5 border border-yellow-300">
          <Wheel taskList={taskList}/>
          <div className="relative basis-2/12 border border-cyan-400">
            <button className="absolute bottom-0 right-0" /*onClick={spinWheel}*/>Choose</button>
          </div>
        </div>
        <Sidebar addTask={addTask} editTask={editTask} deleteTask={deleteTask} taskList={taskList}/>
      </div>
    </main>
  );
}
