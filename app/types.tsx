export interface Task {
    task: string,
    id: string // uses uuid
}

export interface Segment {
    taskId: string, //uuid
    text: string,
    from: number,
    to: number,
    colour: string
}