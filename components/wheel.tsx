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
    const layerRef = React.useRef<Konva.Layer>(null);
    const wheelGroupRef = React.useRef<Konva.Group>(null);
    const canvasWrapperRef = useRef<HTMLDivElement>(null);
    //let peg = React.useRef<Konva.Wedge>(null);

    useEffect(() => {
    // TODO: replace these with better colors
    const colors = ["yellow", "blue", "cyan", "red", "pink", "green", "white", "orange", "brown", "purple"];

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
            stageRef.current.visible(true);
            // next, redraw wheel and peg at the proper position and scale
            drawWheel(ow/2,oh/2);
            drawPeg(ow/2,oh/2);
        }
        /*var anim = new Animation(frame => {
            if(frame){
            var angleDiff = (frame.timeDiff * 90) / 1000;
            const wheelGroup = wheelGroupRef.current;
            if(wheelGroup){
                wheelGroup.rotate(angleDiff);
            }
            }

        }, layerRef);
        anim.start();*/
    }

    function drawWheel(centerX: number, centerY:number){
        if (stageRef.current == null || wheelGroupRef.current == null || layerRef.current == null) return;
        wheelGroupRef.current.destroyChildren();
        let minLength = Math.min(stageRef.current.width(), stageRef.current.height());
        let radius = (minLength*.9)/2 //diameter is 90% of the canvas' shortest side
        let color = getRandomColor();

        let wheel = new Konva.Circle({
            x: centerX,
            y: centerY,
            radius: radius,
            fill: color,
            stroke: "black", //TODO: add a darker stroke of original color once i focus on colors
            strokeWidth: 5,
        });

        wheelGroupRef.current.add(wheel);
        layerRef.current.add(wheelGroupRef.current);
    }

    function drawPeg(centerX: number, centerY: number){
        if(stageRef.current == null || layerRef.current == null) return;
        // first remove old wedge if there is one
        //peg.current?.destroy();
        layerRef.current.findOne("#peg")?.destroy();

        let minLength = Math.min(stageRef.current.width(), stageRef.current.height());
        const radius = (minLength * .9) / 2;

        // want to place the peg on the circle at a certain point
        // want to put the peg somewhere 3/4 ish of the diameter x-wise
        // Formula for getting the point on the circle that finally worked for me https://stackoverflow.com/a/32684717
        const degreeAngle = 35;
        const radAngle = degreeAngle * Math.PI / 180;
        const coordX = centerX + radius * Math.cos(-radAngle);
        const coordY = centerY + radius * Math.sin(-radAngle);

        // rotation angle will remain the same regardless of scale
        const rotationAngle = -65;
        //scale the size of the peg based on if the canvas is smaller
        let maxPegHeight = 110;
        // ill make the peg roughly 1/4 the width of the canvas
        let pegHeight = Math.min(Math.ceil(stageRef.current.width() / 4), maxPegHeight);

        let peg = new Konva.Wedge({
            x: coordX,
            y: coordY,
            radius: radius,
            angle: degreeAngle,
            //width: 0, // width doesnt appear to do anything
            height: pegHeight,
            fill: "red", //TODO: update this
            stroke: "black",
            strokeWidth: 5,
            lineCap: "round",
            rotation: rotationAngle,
            id: "peg"
        }
        );
        layerRef.current.add(peg);
    }

    function getRandomColor(){
        return colors[Math.floor(Math.random() * colors.length)];
    }

    }, [taskList]);

	return (
        <div ref={canvasWrapperRef} id="canvas-wrapper" className="basis-10/12 w-full relative border border-red-600">
		<Stage ref={stageRef} width={1} height={1}>
			<Layer ref={layerRef}>
                <Group ref={wheelGroupRef}>
                </Group>
            </Layer>
		</Stage>
        </div>
	);
}

export default Wheel;