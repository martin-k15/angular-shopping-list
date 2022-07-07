import { Category } from "./category.model";
import { Goods } from "./goods.model";

export class CategoryGoods{
    category: Category;
    goods: Goods[];

    constructor(c: Category, cg: Goods[]){
        this.category=c;
        this.goods=cg;
    }
}

