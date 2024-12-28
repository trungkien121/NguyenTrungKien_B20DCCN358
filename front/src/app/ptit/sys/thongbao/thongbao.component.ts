import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { CommonConstant } from "src/app/_constant/common.constants";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { NhaCungCap } from "src/app/_model/ncc";
import { ThongBao } from "src/app/_model/thongbao";
import { NCCService } from "src/app/_service/ncc.service";
import { ThongBaoService } from "src/app/_service/thongbao.service";

@Component({
  selector: "app-sys-thongbao",
  templateUrl: "./thongbao.component.html",
  styleUrls: ["./thongbao.component.css"],
  providers: [ConfirmationService, MessageService],
})
export class ThongBaoComponent implements OnInit {
  
  thongBao: ThongBao[]=[];

  constructor(
    private nccService: NCCService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private thongBaoService: ThongBaoService
  ) {}

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
  };
  ngOnInit(): void {
    this.getThongBao();
  }
  getThongBao(){
    this.thongBaoService.getLstAdmin(this.modelSearch).subscribe((res) =>{
      if (res.status == "200") {
        this.thongBao = res.data.data; 
        console.log(this.thongBao);
        
      }
    })
  }
  search(){
    
  }
}
