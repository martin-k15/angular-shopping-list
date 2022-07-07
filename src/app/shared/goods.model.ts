import { Category } from "./category.model";

export class Goods{
    goodsName: string;
    goodsCount: number;

    constructor(name: string, num: number){
        this.goodsName = name;
        this.goodsCount = num;
    }

    
}

