import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-list-image",
  templateUrl: "./oneImage.component.html",
  styleUrls: ["./oneImage.component.css"],
})
export class OneImageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  selectPurOder() {
    if (document.getElementById("selectFile")) {
      document.getElementById("selectFile")?.click();
    }
  }
  onSelectFile(event: any) {
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      // this.files.unshift(event.target.files[0]);
      console.log(1);
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        // this.previewImage = event.target!.result;
        if (event.target!.result !== null) {
          // this.bookTitle.imagesSrc[0] = event.target!.result as string;
          // this.imageObjectPreview = [];
          // this.imageObjectPreview.unshift({
          //   image: event.target!.result as string,
          //   thumbImage: event.target!.result as string,
          // });
          // this.imageObject.unshift({
          //   image: event.target!.result as string,
          //   thumbImage: event.target!.result as string,
          // });
        }
      };
    }
    // hiển thị ảnh ở ảnh to nhất
    // this.file = event.target.files[0];
  }
}
