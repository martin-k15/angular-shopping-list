import {
  Component, EventEmitter, OnInit, Input, Output,
  SimpleChange, OnChanges, ViewEncapsulation
} from '@angular/core';
import { Goods } from '../shared/goods.model';
import { Category } from '../shared/category.model';
import { CategoryGoods } from '../shared/categoryGoods.model';


@Component({
  selector: 'app-goods-element',
  templateUrl: './goods-element.component.html',
  styleUrls: ['./goods-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class GoodsElementComponent implements OnInit {

  constructor() {
    console.log("Constructor called!")
  }

  @Input() aG: CategoryGoods[];
  deleteElementNew(goods: Goods[], product: Goods) {
    console.log(goods + " DELETE --->" + product.goodsName);
    goods.splice(goods.indexOf(product), 1);

  }

  ngOnChanges(changes: SimpleChange) {
    console.log("ngOnchanges")
    console.log(changes)
  }

  ngOnInit(): void {
    console.log("ngOnInit called!")
  }

  ngDoCheck() {
    console.log("DOCHECK called!")
  }
/*
  ngDestory(){
    console.log("DESTROY called!")
  }
*/
}
