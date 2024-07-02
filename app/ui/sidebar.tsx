import { Task } from "../types";
import { useState } from 'react';
import { TaskItem } from "./task-item";

export function Sidebar({
    addTask,
    editTask,
    deleteTask,
    taskList
    }:{
        addTask: (str:string) => void,
        editTask: (newText:string, taskId:string) => void,
        deleteTask: (index: number) => void,
        taskList: Array<Task>
    }) {

    const [taskInputVal, setTaskInputVal] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1); // only 1 task can be edited at a time

    function createTask(){
        addTask(taskInputVal);
        setTaskInputVal('');
    }

    function finishedEditing(newText: string, id: string){
        editTask(newText, id);
        setEditingIndex(-1);
    }

    const listItems = taskList.map((item: Task, index: number) => {
        return (
        <li className="flex flex-row w-full" key={item.id}>
            <TaskItem
            task={item}
            isEditing={editingIndex === index}
            editingTask={() => setEditingIndex(index)}
            finishedEditing={(newText, id) => finishedEditing(newText, id)}
            deleteItem={() => deleteTask(index)}>
              </TaskItem>
        </li>
        );
    });

    return (
        <>
        <div className="flex flex-col p-18 ml-6 h-full basis-2/5 p-2 rounded-md bg-emerald-50 border border-green-800">
            <div className="flex flex-row">
                <div className="task-input-wrapper"><input className="rounded-md" type="text" value={taskInputVal} onChange={(e) => {setTaskInputVal(e.target.value)}} placeholder="Enter Task" id="task-input"></input></div>
                <div className="task-entry-button-wrapper"><button className="bg-emerald-300" onClick={() => {createTask()} }>Ok</button></div>
            </div>
            <ul>{listItems}</ul>
        </div>
        </>

    );
}

