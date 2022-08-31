import {Category} from "../model/Category";

export class Quiz {
    title: string | undefined;
    description: string | undefined;
    maxMarks: string | undefined;
    noOfQues: string | undefined;
    active:false |undefined;
    category = {
        cid: Number,
    }
}