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
  fruitsAndVegetables: Goods[] = [new Goods('jablka', 4), new Goods('kiwi', 3), new Goods('mrkev', 6)];
  meat: Goods[] = [new Goods('kuřecí maso', 1), new Goods('šunka', 1)];
  diaryProducts: Goods[] = [new Goods('mléko', 2), new Goods('jogurty bílé', 5), new Goods('smetana', 2), new Goods('máslo', 2)];

  @Input() allGoods: CategoryGoods[] = [
    new CategoryGoods(new Category('Ovoce a zelenina'), this.fruitsAndVegetables),
    new CategoryGoods(new Category('Maso, sýry'), this.meat),
    new CategoryGoods(new Category('Pečivo'), []),
    new CategoryGoods(new Category('Mlečné výrobky, mražené'), this.diaryProducts),
    new CategoryGoods(new Category('Vaření (těstoviny, koření, ...'), []),
    new CategoryGoods(new Category('Sladkosti'), []),
    new CategoryGoods(new Category('Konzervy'), []),
    new CategoryGoods(new Category('Slané výrobky'), []),
    new CategoryGoods(new Category('Drogerie (kapesníky, pasta, ...)'), []),
    new CategoryGoods(new Category('Nápoje'), []),
    new CategoryGoods(new Category('Ostatní'), [])
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