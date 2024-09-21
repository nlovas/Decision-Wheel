import { Task } from "@/app/types";
import { Sidebar } from "../app/ui/sidebar";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { v4 as uuidv4 } from 'uuid';

test("renders a blank sidebar", () =>{
    const mockAddTask = jest.fn();
    const mockTaskList = new Array<Task>();

    render(<Sidebar addTask={mockAddTask} taskList={mockTaskList}/>)
    const input = screen.getByLabelText("New Task");
    expect(input).toBeInstanceOf(HTMLInputElement);
});

test("displays a new task", async () =>{
/*

want to test that it can create a new task that is displayed in the sidebar.
ensure that the input is cleared when done

*/


//This is how I thought to approach this test, but Typescript gives an error as the types are different
/*let spyAddTask = jest.spyOn(Sidebar.prototype, "createTask");
let mockTaskList = new Array<Task>();

render(<Sidebar addTask={spyAddTask} taskList={mockTaskList}/>)
*/

});