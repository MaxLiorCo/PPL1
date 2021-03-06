import { Result, makeFailure, makeOk, bind, either} from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult = <T>(pred: (x:T)=>boolean, array:T[]): Result<T> =>{
    let new_array = array.filter(pred);
    return new_array.length !== 0 ? makeOk(new_array[0]) : makeFailure("No element found")
}

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2 = (a: number[]): Result<number> =>{
    let r = findResult(x=>x%2===0, a)
    return bind(r, x => makeOk(x*x));
}
export const returnSquaredIfFoundEven_v3 = (a: number[]): number =>{
    let r = findResult(x=>x%2===0, a)
    return either(r, x => x*x, y => -1);
}
