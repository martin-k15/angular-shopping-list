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
      //elem.goods = [];
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
  fruits: Goods[] = [new Goods('Jablka', 4), new Goods('Jahody', 2), new Goods('Borůvky', 2)];
  meat: Goods[] = [new Goods('Kuřecí maso', 1), new Goods('Šunka', 2)];
  cans: Goods[] = [new Goods('Kukuřice', 2), new Goods('Tuňák', 1), new Goods('Okurky', 3), new Goods('Švestky celé', 2)];

  @Input() allGoods: CategoryGoods[] = [
    new CategoryGoods(new Category('Ovoce a zelenina'), this.fruits),
    new CategoryGoods(new Category('Maso, sýry'), this.meat),
    new CategoryGoods(new Category('Pečivo'), this.meat),
    new CategoryGoods(new Category('Mlečné výrobky, mražené'), []),
    new CategoryGoods(new Category('Vaření (těstoviny, koření, ...'), []),
    new CategoryGoods(new Category('Sladkosti'), []),
    new CategoryGoods(new Category('Konzervy'), this.cans),
    new CategoryGoods(new Category('Slané výrobky'), []),
    new CategoryGoods(new Category('Drogerie (kapesníky, pasta, ...)'), []),
    new CategoryGoods(new Category('Nápoje'), []),
    new CategoryGoods(new Category('Ostatní'), [])
  ];








  /* EXPORT DO PDF */
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