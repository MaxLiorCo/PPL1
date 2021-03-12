import { State, bind } from "./state";

export type Stack = number[];

export const push: (x:number) => State<Stack,number> =
(x)=> (stack)=> [[x].concat(stack),x] //[[<->x,1,2,3],x]


export const pop: State<Stack,number> = (stack) => [stack.slice(1), stack[0]]

export const stackManip: State<Stack,number> = 
bind(pop, x => bind(push(x*x), y=> bind(pop, z=> push(x+y)) ) )

console.log(stackManip([4,5,6]))