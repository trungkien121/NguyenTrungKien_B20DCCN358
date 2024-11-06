import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import {  DangNhapModel } from "src/app/_model/dangnhap";
import { DangNhapService } from "src/app/_service/dangnhap.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  constructor(private dangNhapService: DangNhapService,  private router: Router){

  }
  user :  DangNhapModel =  {
    tenDangNhap: "",
    matKhau: ""
  }

  ngOnInit() {}

  login(){
    this.dangNhapService.dangNhap(this.user).subscribe((res: any) => {
      if(res.status == CommonConstant.STATUS_OK_200){
        this.router.navigate(['/sys/product']);  
      }
    // console.log(res)


    })
  }
}

