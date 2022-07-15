import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryGoods } from '../shared/categoryGoods.model';
import { Goods} from '../shared/goods.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  name: string = "";
  count: number = 1;
  nrss = "default";
  

  @Output() createNewProduct = new EventEmitter<{ dataG: Goods, g: string}>();
  @Output() deleteAll = new EventEmitter();

  @ViewChild('numberOfGoodsInput') numberOfGoodsInput: ElementRef;

  @Input() dataG: Goods;

  @Input() categories: Category[] = [
    new Category('Ovoce a zelenina'),
    new Category('Maso, sýry'),
    new Category('Pečivo'),
    new Category('Mlečné výrobky, mražené'),
    new Category('Vaření (těstoviny, koření, ...)'),
    new Category('Sladkosti'),
    new Category('Konzervy'),
    new Category('Slané výrobky'),
    new Category('Drogerie (kapesníky, pasta, ...)'),
    new Category('Nápoje'),
    new Category('Ostatní')
  ]

  onClear() {
    console.log("Clear activated.");
    this.name = "";
    this.count = 1;
    this.nrss = "default";
  }

  onCreate(nameInput: HTMLInputElement) {
    if (this.name == "" || this.nrss == "default" || this.count < 1) {
      alert("Něco není správně!")
      return
    }

    console.log("--- LOCAL REFERENCES " + nameInput.value)
    console.log("--- THROUGH VIEWCHILD " + this.numberOfGoodsInput.nativeElement.value)
    let newGood2: Goods = new Goods(this.name, this.count);
    this.createNewProduct.emit({ dataG: newGood2, g: this.nrss });
    this.onClear()
  }

  constructor() {}
  
  onDelete() {
    this.deleteAll.emit();
  }
  ngOnInit(): void {
  }


}
