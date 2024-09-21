import { Task } from "../types";
import { useState } from 'react';
import { TaskItem } from "./task-item";

export function Sidebar({
    addTask,
    taskList
    }:{
        addTask: (str:string) => void,
        taskList: Array<Task>
    }) {

    const [taskInputVal, setTaskInputVal] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1); // only 1 task can be edited at a time

    function createTask(){
        addTask(taskInputVal);
        setTaskInputVal('');
    }

    const listItems = taskList.map((item: Task, index: number) => {
        return (
        <li className="flex flex-row w-full" key={item.id}>
            {item.task}
        </li>
        );
    });

    return (
        <>
        <div className="flex flex-col p-18 ml-6 h-full basis-2/5 p-2 rounded-md bg-emerald-50 border border-green-800">
        <label htmlFor="task-textbox">New Task</label>
            <div className="flex flex-row">
                <div className="task-input-wrapper">
                    <input className="rounded-md" id="task-textbox" type="text" value={taskInputVal} onChange={(e) => {setTaskInputVal(e.target.value)}}></input>
                    </div>
                <div className="task-entry-button-wrapper"><button className="bg-emerald-300" onClick={() => {createTask()} }>Ok</button></div>
            </div>
            <ul>{listItems}</ul>
        </div>
        </>

    );
}

