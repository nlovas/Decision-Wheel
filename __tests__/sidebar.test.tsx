import { Task } from "@/app/types";
import { Sidebar } from "../app/ui/sidebar";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { v4 as uuidv4 } from 'uuid';

test("renders a blank sidebar", () =>{
    const mockAddTask = jest.fn();
    const mockEditTask = jest.fn();
    const mockDeleteTask = jest.fn();
    const mockTaskList = new Array<Task>();

    render(<Sidebar addTask={mockAddTask} editTask={mockEditTask} deleteTask={mockDeleteTask} taskList={mockTaskList}/>)
    const input = screen.getByLabelText("New Task");
    expect(input).toBeInstanceOf(HTMLInputElement);
});

test("displays a new task", async () =>{
/*

USE THIS ITS HELPFUL https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c
and this?? https://robertmarshall.dev/blog/react-component-props-passed-to-child-jest-unit-test/
*/
const spyAddTask = jest.spyOn(Sidebar.prototype, "createTask");

render(<Sidebar addTask={spyAddTask} editTask={mockEditTask} deleteTask={mockDeleteTask} taskList={mockTaskList}/>)


/*    const mockEditTask = jest.fn();
    const mockDeleteTask = jest.fn();
    let mockTaskList = new Array<Task>();*/

/*
    const mockAddTask = jest.fn((input) => {
        mockTaskList.push({id: uuidv4(), task: input});
        
        // TODO: test that the input resets
    });

    render(<Sidebar addTask={mockAddTask} editTask={mockEditTask} deleteTask={mockDeleteTask} taskList={mockTaskList}/>)
    const input = screen.getByLabelText("New Task");

    await user.click(input);
    await user.keyboard('laundry');

    const submitBtn = screen.getByText('Ok');
    await user.click(submitBtn);
    expect(mockAddTask).toHaveBeenCalled();
    expect(mockTaskList).toHaveLength(1);
    expect(mockTaskList[0]).toHaveProperty("id");
    expect(mockTaskList[0].task).toEqual("laundry");*/
});