import { ComponentProps, RefObject, useEffect, useRef, useState } from "react";
import { Task, Segment } from "../app/types";
import {Stage, Layer, Text, Circle, Star, KonvaNodeComponent, Group} from "react-konva";
import { Animation } from "konva/lib/Animation";
import { LayerConfig } from "konva/lib/Layer";
import React from "react";
import Konva from "konva";

type Props = {
	taskList?: Array<Task>;
};

function Wheel({ taskList }: Props) {

    // keeps track of the amount of circumference that each task is using
    const [segments, setSegments] = useState(Array<Segment>());
    // useRef is for a mutable variable that doesnt trigger a change in the component

    const stageRef = React.useRef<Konva.Stage>(null);
    const wheelLayerRef = React.useRef<Konva.Layer>(null);
    const wheelGroupRef = React.useRef<Konva.Group>(null);
    const canvasWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        console.log("useffect called");



        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();

    // very helpful: https://stackoverflow.com/a/8486324
    // and https://stackoverflow.com/a/10215724
    // THE MOST HELPFUL https://stackoverflow.com/a/33558386
    function resizeCanvas(){
        if(stageRef.current && canvasWrapperRef.current) {
            stageRef.current.visible(false);
            const ow = canvasWrapperRef.current.offsetWidth;
            const oh = canvasWrapperRef.current.offsetHeight;
            stageRef.current.width(ow);
            stageRef.current.height(oh);
            console.log("wrapper", ow, oh);
            console.log("stage", stageRef.current.width(), stageRef.current.height());
            stageRef.current.visible(true);
        }
        /*const parent = document.getElementById("canvas-wrapper") as HTMLElement;
        canvas.style.display = "none";
        const ow = parent.offsetWidth;
        const oh = parent.offsetHeight;
        canvas.height = oh;
        canvas.width = ow;
        canvas.style.display = "block";*/
        //drawWheel(ow/2,oh/2);
        //drawPeg(ow/2, oh/2);
        /*var anim = new Animation(frame => {
            if(frame){
            var angleDiff = (frame.timeDiff * 90) / 1000;
            const wheelGroup = wheelGroupRef.current;
            if(wheelGroup){
                wheelGroup.rotate(angleDiff);
            }
            }

        }, wheelLayerRef);
        anim.start();*/
    }

    }, [taskList]);

	return (
        <div ref={canvasWrapperRef} id="canvas-wrapper" className="basis-10/12 w-full relative border border-red-600">
		<Stage ref={stageRef} width={1} height={1}>
			<Layer ref={wheelLayerRef}>
                <Group ref={wheelGroupRef}>
				    <Circle x={500} y={300} radius={50} fill="green" />
                    <Star x={100} y={100} numPoints={5} innerRadius={10} outerRadius={30} fill="blue"/>
                </Group>
            </Layer>
		</Stage>
        </div>
	);
}

export default Wheel;