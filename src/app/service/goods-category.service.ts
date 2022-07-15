import { CategoryGoods } from "../shared/categoryGoods.model";
import { Category } from "../shared/category.model";
import { Goods } from "../shared/goods.model";


export class GoodsCategoryService {

  // default goods
  fruitsAndVegetables: Goods[] = [new Goods('apple', 4), new Goods('plum', 3), new Goods('carrot', 6)];
  meat: Goods[] = [new Goods('chicken meat', 1), new Goods('ham', 1)];
  diaryProducts: Goods[] = [new Goods('milk', 2), new Goods('yoghurt', 5), new Goods('cream', 2), new Goods('butter', 2)];

allGoods: CategoryGoods[] = [
        new CategoryGoods(new Category('Fruits and vegetables'), this.fruitsAndVegetables),
        new CategoryGoods(new Category('Meat and cheese'), this.meat),
        new CategoryGoods(new Category('Bakery products'), []),
        new CategoryGoods(new Category('Diary products'), this.diaryProducts),
        new CategoryGoods(new Category('Cooking (pasta, spice, ...)'), []),
        new CategoryGoods(new Category('Sweets'), []),
        new CategoryGoods(new Category('Cans'), []),
        new CategoryGoods(new Category('Salt products'), []),
        new CategoryGoods(new Category('Drogery (tissues, toothpaste, ...)'), []),
        new CategoryGoods(new Category('Drinks'), []),
        new CategoryGoods(new Category('DrinksForMe'), []),
        new CategoryGoods(new Category('Other'), [])
      ];
    

    getAllGoods(){
        return this.allGoods;
    }

    getAllCategories(){
        let categories: Category[] = [];
        this.allGoods.forEach(elm => {
            categories.push(elm.category)
        });
        return categories;
    }
}