import { Component, Input, ElementRef, ViewChild, Output } from '@angular/core';
import { Category } from './shared/category.model';
import { CategoryGoods } from './shared/categoryGoods.model';
import { Goods } from './shared/goods.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-shopping';


  onGoodsCreated(g: Goods, c: string) {
    this.allGoods.forEach(elm => {
      if (elm.category.category_name == c) {
        elm.goods.push(g);
      }
    });
  }

  onGoodsDeleteAll() {

    this.allGoods.forEach(elem => {
      elem.goods.splice(0, elem.goods.length)
    });

  }

  ngDestory() {
    console.log("DESTROY called!")
  }

  /*
    deleteElementNew(goods: Goods[], product: Goods) {
      console.log(goods + " DELETE --->" + product.goodsName);
      goods.splice(goods.indexOf(product), 1);
  
    }
    */

  // defaultní zboží
  fruitsAndVegetables: Goods[] = [new Goods('apple', 4), new Goods('plum', 3), new Goods('carrot', 6)];
  meat: Goods[] = [new Goods('chicken meat', 1), new Goods('ham', 1)];
  diaryProducts: Goods[] = [new Goods('milk', 2), new Goods('yoghurt', 5), new Goods('cream', 2), new Goods('butter', 2)];

  @Input() allGoods: CategoryGoods[] = [
    new CategoryGoods(new Category('Fruits and vegetables'), this.fruitsAndVegetables),
    new CategoryGoods(new Category('Meat and cheese'), this.meat),
    new CategoryGoods(new Category('Bakery products'), []),
    new CategoryGoods(new Category('Diary products'), this.diaryProducts),
    new CategoryGoods(new Category('Cooking (pasta, spice, ...'), []),
    new CategoryGoods(new Category('Sweets'), []),
    new CategoryGoods(new Category('Cans'), []),
    new CategoryGoods(new Category('Salt products'), []),
    new CategoryGoods(new Category('Drogery (tissues, toothpaste, ...)'), []),
    new CategoryGoods(new Category('Drinks'), []),
    new CategoryGoods(new Category('Other'), [])
  ];


  /* PDF EXPORT */
  @ViewChild('htmlData') htmlData!: ElementRef;
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = 160;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('file.pdf');
    })
  }
}


/*
      let fileWidth = 180; //208
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
*/