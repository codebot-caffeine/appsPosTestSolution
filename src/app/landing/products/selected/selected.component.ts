
import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class SelectedComponent {
  @Input() received:any = []

  constructor() { }

  ngOnInit(): void {
    console.log(this.received)
    this.received.forEach((element:any) => {
      if(element.product_details.some((ele:any)=>ele.isChecked)){
        element.show = true
      }
    });
  }
  ngOnChanges(changes:SimpleChange): void{
    console.log(changes)
    this.received = changes
    this.received = this.received.received.currentValue
  }
}
