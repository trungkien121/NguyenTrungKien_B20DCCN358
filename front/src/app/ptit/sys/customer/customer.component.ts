import { Component, OnInit } from "@angular/core";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { Customer } from "src/app/_model/customer";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
})
export class CustomerComponent implements OnInit {
  constructor(private nguoidungService: NguoidungService) {}
  customerLst: NguoiDung[] = [];
  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
  };
  optionLabel: string = "";

  statusOptions: OptionSelect[] = [];
  visibilityOptions: OptionSelect[] = [];
  categoryOption: OptionSelect[] = [];

  totalRow: number = 0;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.nguoidungService.getUserLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.customerLst = res.data.data;
        this.totalRow = res.data.totalElements;
      }
    });
  }
  onStatusChange(newStatus: string) {
    // this.modelSearch.statusSearch = newStatus;
  }

  onVisibilityChange(newStatus: string) {}

  onCategoryChange(newCategory: string) {
    // this.modelSearch.categorySearch = newCategory;
  }
  search() {
    this.getData();
  }
}
