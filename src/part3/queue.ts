import { State, bind } from "./state";

export type Queue = number[];


export const enqueue: (x:number) => State<Queue,number> =
     (x)=> (queue)=> [queue.concat(x),x] //[[1,2,3,x],x]

export const dequeue: State<Queue,number> = (queue) => [queue.slice(1), queue[0]]
export const queueManip: State<Queue,number> = 
bind(dequeue, x => bind(enqueue(x*2), y=> bind(enqueue(y/6), z=> dequeue) ) )
