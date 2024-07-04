import { useEffect, useRef, useState } from "react";
import { Task, Segment } from "../app/types";
import {Stage, Layer, Text, Circle} from "react-konva";

type Props = {
	taskList?: Array<Task>;
};

function Wheel({ taskList }: Props) {

    // keeps track of the amount of circumference that each task is using
    const [segments, setSegments] = useState(Array<Segment>());
    //const [ctx, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
    // useRef is for a mutable variable that doesnt trigger a change in the component
    //const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        console.log("useffect called");
        //const canvas = canvasRef.current as HTMLCanvasElement;//document.getElementById("canvas") as HTMLCanvasElement;
        //const context = canvas.getContext("2d") as CanvasRenderingContext2D;
        //setCanvasContext(context);
        //ctx?.save();



        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();

    // very helpful: https://stackoverflow.com/a/8486324
    // and https://stackoverflow.com/a/10215724
    // THE MOST HELPFUL https://stackoverflow.com/a/33558386
    function resizeCanvas(){
        /*const parent = document.getElementById("canvas-wrapper") as HTMLElement;
        canvas.style.display = "none";
        const ow = parent.offsetWidth;
        const oh = parent.offsetHeight;
        canvas.height = oh;
        canvas.width = ow;
        canvas.style.display = "block";*/
        //drawWheel(ow/2,oh/2);
        //drawPeg(ow/2, oh/2);
    }

    }, [taskList]);

	return (
        <div id="canvas-wrapper" className="basis-10/12 w-full relative border border-red-600">
		<Stage width={window.innerWidth-100} height={window.innerHeight-100}>
			<Layer>
				<Circle x={500} y={300} radius={50} fill="green" />
			</Layer>
		</Stage>
        </div>
	);
}

export default Wheel;