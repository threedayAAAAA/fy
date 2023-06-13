import { array } from "./array";
import { generate } from "./index";
import { keyParser } from "../parser";

export function object(option?: any){
    const result: Record<string, any> = {};
    for (const key in option) {
        if (option.hasOwnProperty(key)) {
            const {type, range} = keyParser(key)
            if (range) {
                result[type] = array(option[key], ...range);
            } else {
                result[type] = generate(option[key]);
            }
        }
    }
    return result;
}