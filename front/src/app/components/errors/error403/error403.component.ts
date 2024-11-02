import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-error403",
  templateUrl: "./error403.component.html",
  styleUrls: ["./error403.component.css"],
})
export class Error403Component implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  returnHome() {
    this.router.navigate(["/home"]);
  }
}
