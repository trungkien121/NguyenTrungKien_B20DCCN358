import { Component, OnInit } from "@angular/core";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { Product } from "src/app/_model/product";
import { ProductService } from "src/app/_service/product.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  productLst: Product[] = [];
  modelSearch: SearchModel = {};
  optionLabel: string = "";

  statusOptions: OptionSelect[] = [];
  visibilityOptions: OptionSelect[] = [];
  categoryOption: OptionSelect[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductLst(this.modelSearch).subscribe((res) => {
      this.productLst = res.responseData;
    });

    this.statusOptions = [
      {
        name: "Đang bán",
        value: "1",
      },
      {
        name: "Ngừng bán",
        value: "0",
      },
    ];

    this.categoryOption = [
      {
        name: "Thuốc về đầu",
        value: "1",
      },
      {
        name: "Thuốc về dạ dày",
        value: "0",
      },
    ];
  }

  search() {}

  onStatusChange(newStatus: string) {
    // this.modelSearch.statusSearch = newStatus;
  }

  onNCCChange(newStatus: string) {
    // this.modelSearch.visibilySearch = newStatus;
  }

  onCategoryChange(newCategory: string) {
    // this.modelSearch.categorySearch = newCategory;
  }
}
