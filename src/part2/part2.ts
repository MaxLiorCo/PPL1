import * as R from "ramda";

interface mapHelper {
    valid: boolean;
    array: string[];
}

interface prevCurrMap {
    prev: string;
    counter: number;
    encoded: string;
}

const stringToArray = R.split("");

const vowelHelper = (x: string): boolean => {
    return x === ("a") ? true : x === ("e") ? true : x === ("i") ? true :
    x === ("o") ? true : x === ("u") ? true : false;
};

const filterParenthesis = (arr: string[]): string[] => {
    return R.filter(x => 
                    x === "{" || x === "[" || x === "(" ||
                    x === "}" || x === "]" || x === ")"
                    , arr);

};

const check = (x: string): string => 
                                    x === "]" ? "[" :
                                    x === ")" ? "(" :
                                    x === "}" ? "{" :
                                    "-1"; 


/* Question 1 */
export const countVowels = (x: string): number => {
    let charArray = stringToArray(x.toLowerCase());
    return R.reduce((acc: number, curr: string): number => (vowelHelper(curr) ? acc + 1 : acc), 0, charArray);
    
};

/* Question 2 */
export const runLengthEncoding = (x: string): string => {
    let charArray = stringToArray(x + "\0");
    let result:prevCurrMap = R.reduce((acc: prevCurrMap, curr: string): prevCurrMap => {
        if (acc.encoded.length == 0)
            return { prev: curr, counter: 1 , encoded: curr };
        let res: prevCurrMap = curr === acc.prev
                                ? { prev: curr, counter: acc.counter + 1, encoded: acc.encoded }
                                : curr !== "\0" ? { prev: curr, counter: 1, 
                                                    encoded: acc.encoded + (acc.counter === 1 ? "" : acc.counter) + curr }
                                : { prev: curr, counter: 1, 
                                    encoded: acc.encoded + (acc.counter === 1 ? "" : acc.counter) };
                                         
        return res; 
    }, { prev: "", counter: 0, encoded: "" }, charArray);
    return result.encoded;
};

/* Question 3 */
export const isPaired = (x: string): boolean => {
    let parArray = filterParenthesis(stringToArray(x));
    if(parArray.length == 0) return true;
    if(parArray.length == 1) return false;
    let result: mapHelper = R.reduce((acc: mapHelper, curr: string): mapHelper => {
        let lastIndex = acc.array.length - 1;
        let prev = acc.array[lastIndex];
        if (!acc.valid || x.length == 1)             //no need to proceed if we found the string isn't valid
            return acc;
        let y: string = check(curr);
        let resArray: string[] = y === "-1" ? acc.array.concat([curr]) : acc.array.slice(0, lastIndex);
        let resValid: boolean = y === "-1" ? acc.valid : y === prev ? acc.valid && true : false;
        return {valid: resValid, array: resArray};
    }, { valid: true, array: [] }, parArray);
    return result.valid && result.array.length === 0;
};
