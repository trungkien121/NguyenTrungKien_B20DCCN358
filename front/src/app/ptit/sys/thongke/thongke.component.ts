import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { ToastrService } from "ngx-toastr";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { CommonConstant } from "src/app/_constant/common.constants";
import { BaoCao } from "src/app/_model/baocao";
import { SearchModel } from "src/app/_model/common/Search";
import { DanhMucThuoc } from "src/app/_model/danhmucthuoc";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { BaoCaoService } from "src/app/_service/baocaoservice";
import { DanhmucThuocService } from "src/app/_service/danhmucthuoc.service";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";

@Component({
  selector: "app-thongke",
  styleUrls: ["./thongke.component.css"],
  templateUrl: "./thongke.component.html",
  providers: [ConfirmationService, MessageService],
})
export class ThongKecComponent implements OnInit {
  constructor(
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private baocaoService: BaoCaoService
  ) {}

  typeDoanhThu = CommonConstant.THANG;
  thangSelected: number = 0;
  namSelected: number = 0;

  doanhThuTheoThang: number[] = [];

  months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  homnay: any = {
    tongHoaDonHomNay: 0,
    tongDonHangTraLaiHomNay: 0,
  };

  homqua: any = {
    tongHoaDonHomQua: 0,
    tongDonHangTraLaiHomQua: 0,
  };

  doanhThuThangNay: number = 0;
  doanhThuThangTruoc: number = 0;

  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: "column", // Loại biểu đồ là cột
    },
    title: {
      // text: "Biểu đồ cột - Doanh thu theo tháng",
      text: "",
    },
    subtitle: {
      // text: "Dữ liệu doanh thu hàng tháng",
      text: "",
    },
    xAxis: {
      categories: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
      ], // Các tháng
      title: {
        text: "Tháng",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Doanh thu (VND)",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " VND", // Đơn vị của giá trị
    },
    series: [
      {
        type: "column", // Loại biểu đồ cột
        name: "Doanh thu",
        data: [500000, 700000, 650000, 800000, 750000, 600000], // Dữ liệu doanh thu cho từng tháng
      },
    ],
    credits: {
      enabled: false, // Tắt hiển thị tín dụng của Highcharts
    },
  };

  // Hàm tính số ngày trong tháng
  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate(); // Trả về số ngày trong tháng
  }

  ngOnInit(): void {
    this.getHoaDonHomNay();
    this.getHoaDonHomQua();
    this.getDoanhThuThangTruoc();

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // Lấy tháng hiện tại (0-11)

    this.thangSelected = Number.parseInt((today.getMonth() + 1).toString());
    this.namSelected = Number.parseInt(today.getFullYear().toString());

    this.getDoanhThuThangNay();

    if (this.typeDoanhThu == CommonConstant.THANG) {
      const daysInMonth = this.getDaysInMonth(currentMonth + 1, currentYear); // Lấy số ngày trong tháng hiện tại
      const daysArray = Array.from(
        { length: daysInMonth },
        (_, i) => `${i + 1}`
      ); // Tạo mảng các ngày trong tháng

      console.log("days", daysArray);
      // Cập nhật categories là các ngày trong tháng
      this.chartOptions.xAxis = {
        categories: daysArray, // Các ngày trong tháng
        title: {
          text: "Ngày trong tháng",
        },
      };
      this.getDoanhThuThang();

      this.chartOptions.series = [
        {
          type: "column",
          name: "Doanh thu",
          // data: Array(daysInMonth).fill(1000), // Dữ liệu giả định cho doanh thu
          data: this.doanhThuTheoThang,
        },
      ];

      setTimeout(() => {
        Highcharts.chart("container", this.chartOptions); // Cập nhật lại chart
      });
    } else if (this.typeDoanhThu === CommonConstant.NAM) {
      // Cập nhật categories là các tháng trong năm
      this.chartOptions.xAxis = {
        categories: this.months, // Các tháng trong năm
        title: {
          text: "Tháng trong năm",
        },
      };
      // Dữ liệu giả định cho doanh thu theo tháng
      this.chartOptions.series = [
        {
          type: "column",
          name: "Doanh thu",
          data: [
            2000, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500,
            8000,
          ], // Dữ liệu doanh thu theo tháng
        },
      ];
    }
  }

  getHoaDonHomNay() {
    const today = new Date().toISOString(); // Chuyển sang định dạng ISO
    this.baocaoService.getDoanhThuTheoNgay(today).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        let data = res.data as BaoCao[];
        data.forEach((element: BaoCao) => {
          this.homnay.tongHoaDonHomNay += element.tongDonHang || 0;
          this.homnay.tongDonHangTraLaiHomNay += element.tongDonHangTraLai || 0;
        });
      }
    });
  }

  getHoaDonHomQua() {
    const yesterday = new Date(); // Lấy ngày hiện tại
    yesterday.setDate(yesterday.getDate() - 1); // Giảm 1 ngày để lấy ngày hôm qua
    const yesterdayISO = yesterday.toISOString(); // Chuyển sang định dạng ISO
    this.baocaoService.getDoanhThuTheoNgay(yesterdayISO).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        let data = res.data as BaoCao[];
        data.forEach((element: BaoCao) => {
          this.homqua.tongHoaDonHomQua += element.tongDonHang || 0;
          this.homqua.tongDonHangTraLaiHomQua += element.tongDonHangTraLai || 0;
        });
      }
    });
  }

  getDoanhThuNam() {
    this.baocaoService.getDoanhThuTheoNam(this.namSelected).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        let data = res.data as BaoCao[];
        this.doanhThuThangNay = 0;
        data.forEach((element: BaoCao) => {
          this.doanhThuThangNay += element.tongDoanhThu || 0;
        });
      }
    });
  }

  getDoanhThuThang() {
    let request = {
      nam: this.namSelected,
      thang: this.thangSelected,
    };

    this.baocaoService.getDoanhThuTheoThang(request).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        let data = res.data as BaoCao[];

        // Tính số ngày trong tháng hiện tại
        const daysInMonth = this.getDaysInMonth(
          this.thangSelected,
          this.namSelected
        );

        // Mảng doanh thu của tất cả các ngày trong tháng, khởi tạo với giá trị 0
        const doanhThuTheoNgay = Array(daysInMonth).fill(0); // Tạo mảng với số ngày trong tháng, giá trị mặc định là 0

        // Duyệt qua dữ liệu từ BE và cập nhật giá trị vào mảng doanhThuTheoNgay
        data.forEach((element: BaoCao) => {
          // `thoiGian` là ngày trong tháng
          if (element.thoiGian) {
            if (element.thoiGian >= 1 && element.thoiGian <= daysInMonth) {
              doanhThuTheoNgay[element.thoiGian - 1] =
                element.tongDoanhThu || 0;
            }
          }
        });

        this.doanhThuTheoThang = doanhThuTheoNgay;
        // Cập nhật các thông tin khác nếu cần
        console.log(doanhThuTheoNgay); // Mảng doanh thu theo ngày trong tháng

        this.chartOptions.series = [
          {
            type: "column",
            name: "Doanh thu",
            data: doanhThuTheoNgay, // Dữ liệu giả định cho doanh thu
          },
        ];
      }
    });
  }

  getDoanhThuThangNay() {
    let request = {
      nam: this.namSelected, // Lấy năm hiện tại
      thang: this.thangSelected, // Lấy tháng hiện tại (getMonth() trả về từ 0-11)
    };

    this.baocaoService.getDoanhThuTheoThang(request).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        let data = res.data as BaoCao[];
        this.doanhThuThangNay = 0;
        data.forEach((element: BaoCao) => {
          this.doanhThuThangNay += element.tongDoanhThu || 0;
        });
      }
    });
  }
  getDoanhThuThangTruoc() {
    const today = new Date();

    // Tính toán tháng trước
    let previousMonth = today.getMonth(); // Lấy tháng hiện tại (getMonth() trả về từ 0-11)
    let year = today.getFullYear();

    if (previousMonth === 0) {
      // Nếu là tháng 1, thì tháng trước là tháng 12 của năm trước
      previousMonth = 12;
      year -= 1;
    }

    let request = {
      nam: year.toString(), // Năm của tháng trước
      thang: previousMonth.toString(), // Tháng trước
    };

    this.baocaoService.getDoanhThuTheoThang(request).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        let data = res.data as BaoCao[];
        this.doanhThuThangTruoc = 0; // Reset doanh thu tháng trước
        data.forEach((element: BaoCao) => {
          this.doanhThuThangTruoc += element.tongDoanhThu || 0;
        });
      }
    });
  }

  calculatePercentageIncrease(homnay: number, homqua: number): string {
    if (homqua === 0) {
      // Nếu hôm qua không có hóa đơn, trả về tăng vô hạn hoặc một thông báo phù hợp
      return "100";
    }
    const percentIncrease = ((homnay - homqua) / homqua) * 100;
    return percentIncrease.toFixed(2); // Giới hạn 2 chữ số thập phân
  }
}
