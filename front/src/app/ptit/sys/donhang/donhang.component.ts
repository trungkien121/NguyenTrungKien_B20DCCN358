import { Component, OnInit } from "@angular/core";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { Donhang } from "src/app/_model/donhang";

@Component({
  selector: "app-ncc",
  templateUrl: "./donhang.component.html",
  // styleUrls: ["./customer.component.css"],
})
export class DonHangComponent implements OnInit {
  donhang: Donhang[] = [];
  modelSearch: SearchModel = {};
  optionLabel: string = "";

  statusOptions: OptionSelect[] = [];
  visibilityOptions: OptionSelect[] = [];
  categoryOption: OptionSelect[] = [];

  ngOnInit(): void {}
  onStatusChange(newStatus: string) {
    // this.modelSearch.statusSearch = newStatus;
  }

  onVisibilityChange(newStatus: string) {}

  onCategoryChange(newCategory: string) {
    // this.modelSearch.categorySearch = newCategory;
  }
}
