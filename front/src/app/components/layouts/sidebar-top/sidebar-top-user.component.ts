import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    SimpleChanges,
  } from "@angular/core";
  import { Cookie } from "ng2-cookies";
  import { AuthConstant } from "src/app/_constant/auth.constant";
  import { Quyen } from "src/app/_model/auth/quyen";
  import { lastValueFrom, Subscription } from "rxjs";
  import { jwtDecode } from "jwt-decode";
  import { NguoiDung } from "src/app/_model/auth/nguoidung";
  import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
  import { CommonConstant } from "src/app/_constant/common.constants";

  @Component({
    selector: "app-sidebar-top",
    templateUrl: "./sidebar-top-user.component.html",
    styleUrls: ["./sidebar-top-user.component.css"],
    changeDetection: ChangeDetectionStrategy.Default,
  })
    export class SidebarLeftComponent implements OnInit, OnDestroy {
    constructor(
      private nguoidungService: NguoidungService,
      private cdr: ChangeDetectorRef
    ) {}
    
