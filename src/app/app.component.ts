import { Component, Input, ElementRef, ViewChild, Output } from '@angular/core';
import { Category } from './shared/category.model';
import { CategoryGoods } from './shared/categoryGoods.model';
import { Goods } from './shared/goods.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { GoodsCategoryService } from './service/goods-category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-shopping';

  constructor(private goodsCategoryService: GoodsCategoryService){}

  ngOnInit(){ }
  allGoods: CategoryGoods[] = this.goodsCategoryService.getAllGoods();

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
    //console.log("DESTROY called!")
  }

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