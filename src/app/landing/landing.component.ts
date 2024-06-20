import { Component } from '@angular/core';

import { FormGroup,FormControl,Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  newForm :FormGroup= new FormGroup({
    productID: new FormControl('',[Validators.required]),
    branchID: new FormControl('',[Validators.required]),
    repeatSet: new FormControl(true)
  })

  constructor(public httpClient:HttpClient,public router : Router) {
    this.buildForm()
  }

  ngOnInit(): void {
    
  }
  buildForm(){
    this.newForm = new FormGroup({
      productID: new FormControl('',[Validators.required]),
      branchID: new FormControl('',[Validators.required]),
      repeatSet: new FormControl(true)
    })
  }
  
  final:any = []
  submittriggered:boolean = false
  submitApi(){
    // console.log(this.newForm.controls)
    if(this.newForm.valid){
      let url = "http://appspos.apdeliver.com/AppsPOSDemoSAS/api/apis/Get_Category_By_ProductId"
      let entityObject = {
        "api_key": "BBw9cGiMpd56IFZz7m24Fm8L4f4f51FMEMGQKhytAsrL+5fNUqeZiM6TuM2ibw4yjWxFGOFAa+1Q6/Vt2YjNHMOAIR45Uy7o88m737ZXTWM=",
        "language_code": "en",
        "device_id": "2CEC3804-46E6-4803-8982-88CFFCD402DD",
        "device_token": "ex7n_U-pwlQ:APA91bGwFupIdjXEJqs4ZtdRwXLPPopDqwIU0gOH5n38ZPFEROk8WdAPQMsBxPLRd_3d8J3qIrUqUp8mEEvUjapCj7LVEOPO3kDt1lGT6r9L1C6VntoYuwbZnstfOSaZxeFXnibJXWKj",
        "device_type": "android",
        "mst_product_id":parseInt(this.newForm.controls['productID'].value),
        "branch_id":parseInt(this.newForm.controls['branchID'].value),
        "price_type":1,
        "dishtype_id":"0",
        "is_for_repeat_set_combo": this.newForm.controls['repeatSet'].value == true ? 0 : 1
      }
      let response = this.httpClient.post(url, entityObject).pipe(
        map((response: any) => {
          return response;
        })
      );
      let final:any = []
      response.subscribe((data)=>{
        if(data){
          this.final = data.data.details
          this.submittriggered = true
          // setTimeout(() => {
          //   this.router.navigate(['products'])
          // }, 1000);
          
        }
        
      })
      
    }else{
      alert('form invalid')
    }
  }
}
