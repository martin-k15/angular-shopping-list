import { Component, OnInit, Input} from '@angular/core';
import { Goods } from '../shared/goods.model';
@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {

  @Input() element: {type: string, name: string, content: string};
  constructor() {
    //console.log("Constructor called!")

   }
  //@Input() jidlo: Goods = {goods_name: 'Kebab', goods_count: 1, category: 'Ostatní'}
  ngOnInit(): void {
    //console.log("ngOnInit called!")
  }

}
