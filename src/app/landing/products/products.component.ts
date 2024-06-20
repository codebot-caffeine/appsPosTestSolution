

import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Input() received: any = []

  constructor(private router:Router) { }

  ngOnInit(): void {
    // console.log(this.received)
    // console.log(localStorage['getData']('received'))
    // this.received = localStorage['getData']('received')
    this.received.forEach((e:any)=>{
      e.product_details.forEach((each:any)=>{
        each.isChecked = false
      })
    })
    console.log(this.received)
  }
  ngOnChanges(changes:SimpleChange): void{
    console.log(changes)
    this.received = changes
    this.received = this.received.received.currentValue
      // this.received = localStorage['getData']('received')
      // this.localStorage.setData('received',this.received)
  }

  setOpposite(o:any,d:any){
    this.received.forEach((e:any)=>{
      if(e.mst_cat_id == o){
        e.product_details.forEach((each:any)=>{
          if(each.mst_product_id == d){
            each.isChecked = !each.isChecked
          }
        })
      }
    })
    this.navigateTriggered = false
    localStorage['setData']('received',this.received)
  }
  
  navigateTriggered:boolean = false
  navigate(){
    // this.received = this.received
    this.navigateTriggered = true
    this.received.forEach((element:any) => {
      if(element.product_details.some((ele:any)=>ele.isChecked)){
        element.show = true
      }else{
        element.show= false
      }
    });
    // localStorage['setData']('received',this.received)
  }
}
