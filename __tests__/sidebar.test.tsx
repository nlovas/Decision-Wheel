//import renderer from 'react-test-renderer';
import { Task } from "@/app/types";
import { Sidebar } from "../app/ui/sidebar";
import { render, screen } from "@testing-library/react";

/*
it('renders correctly', () => {
    const tree = renderer
        .create(<Sidebar></Sidebar)
        .toJSON();
        expect(tree).toMatchSnapshot();
});*/

test("renders a blank sidebar", () =>{
    const mockAddTask = jest.fn();
    const mockEditTask = jest.fn();
    const mockDeleteTask = jest.fn();
    const mockTaskList = new Array<Task>();

    render(<Sidebar addTask={mockAddTask} editTask={mockEditTask} deleteTask={mockDeleteTask} taskList={mockTaskList}/>)
    const input = screen.getByLabelText("New Task");
    expect(input).toBeInstanceOf(HTMLInputElement);
});