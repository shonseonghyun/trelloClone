import {atom,selector} from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IToDo{
    id:number,
    text : string;
}

interface IToDoState{
    [key:string]:IToDo[];
}

const { persistAtom } = recoilPersist({
    key: 'toDoList',
    storage: localStorage,
})

export const toDoState= atom<IToDoState>({
    key:"toDo",
    default: {
        "To Do":[],
        Doing:[],
        Done:[]
    },
    effects_UNSTABLE:[persistAtom]
})