import { Task } from "@/app/types";
import { Sidebar } from "../app/ui/sidebar";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

test("renders a blank sidebar", () =>{
    const mockAddTask = jest.fn();
    const mockEditTask = jest.fn();
    const mockDeleteTask = jest.fn();
    const mockTaskList = new Array<Task>();

    render(<Sidebar addTask={mockAddTask} editTask={mockEditTask} deleteTask={mockDeleteTask} taskList={mockTaskList}/>)
    const input = screen.getByLabelText("New Task");
    expect(input).toBeInstanceOf(HTMLInputElement);
});

test("creates a new task", async () =>{
    const mockAddTask = jest.fn();
    const mockEditTask = jest.fn();
    const mockDeleteTask = jest.fn();
    const mockTaskList = new Array<Task>();

    render(<Sidebar addTask={mockAddTask} editTask={mockEditTask} deleteTask={mockDeleteTask} taskList={mockTaskList}/>)
    const input = screen.getByLabelText("New Task");

    await user.click(input);
    await user.keyboard('laundry');

    const submitBtn = screen.getByText('Ok');
    await user.click(submitBtn);
    expect(mockAddTask).toHaveBeenCalled();
});