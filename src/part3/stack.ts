import { State, bind } from "./state";

export type Stack = number[];

export const push: (x:number) => State<Stack,undefined> =
(x)=> (stack)=> [[x].concat(stack),undefined] //[[<->x,1,2,3],x]


export const pop: State<Stack,number> = (stack) => [stack.slice(1), stack[0]]

export const stackManip: State<Stack,undefined> = 
bind(pop, x => bind(push(x*x), y=> bind(pop, z=> push(x+z)) ) )
