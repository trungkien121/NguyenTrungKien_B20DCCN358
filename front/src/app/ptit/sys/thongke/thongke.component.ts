import { CommonConstant } from "./../../../_constant/common.constants";
import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { ToastrService } from "ngx-toastr";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { BaoCao } from "src/app/_model/baocao";
import { OptionSelect } from "src/app/_model/common/Option";
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

  typeDoanhThu = CommonConstant.NGAY;
  thangSelected: number = 0;
  namSelected: number = 0;
  ngaySelected: number = 0;

  doanhThuTheoThang: number[] = [];

  months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  nams = ["2022", "2023", "2024", "2025"];
  hours = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ];

  daysInMonth: number[] = [];

  homnay: any = {
    tongHoaDonHomNay: 0,
    tongDonHangTraLaiHomNay: 0,
  };

  homqua: any = {
    tongHoaDonHomQua: 0,
    tongDonHangTraLaiHomQua: 0,
  };

  tongHoaDon: number = 0;
  tongHoaDonTraLai: number = 0;
  tongDoanhThu: number = 0;

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
      categories: [], // Các tháng
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

  CommonConstant = CommonConstant;

  // Hàm tính số ngày trong tháng
  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate(); // Trả về số ngày trong tháng
  }

  ngOnInit(): void {
    this.getHoaDonHomNay();
    this.getHoaDonHomQua();
    this.getDoanhThuThangTruoc();

    const today = new Date();

    this.ngaySelected = Number.parseInt(today.getDate().toString());
    this.thangSelected = Number.parseInt((today.getMonth() + 1).toString());
    this.namSelected = Number.parseInt(today.getFullYear().toString());

    this.updateDaysInMonth();
    this.getDoanhThuThangNay();

    this.common();
  }

  common() {
    if (this.typeDoanhThu == CommonConstant.THANG) {
      this.getDoThiThang(this.thangSelected, this.namSelected);
    } else if (this.typeDoanhThu === CommonConstant.NAM) {
      this.getDoThiNam(this.namSelected);
    } else if (this.typeDoanhThu === CommonConstant.NGAY) {
      this.getDoThiNgay(
        this.ngaySelected,
        this.thangSelected,
        this.namSelected
      );
    }
  }

  getDoThiThang(thang: number, nam: number) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // Lấy tháng hiện tại (0-11)

    const daysInMonth = this.getDaysInMonth(currentMonth + 1, currentYear); // Lấy số ngày trong tháng hiện tại
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`); // Tạo mảng các ngày trong tháng

    console.log("days", daysArray);
    // Cập nhật categories là các ngày trong tháng
    this.chartOptions.xAxis = {
      categories: daysArray, // Các ngày trong tháng
      title: {
        text: "Ngày trong tháng",
      },
    };
    this.getDoanhThuThang(thang, nam);
  }

  getDoThiNam(nam: number) {
    this.chartOptions.xAxis = {
      categories: this.months, // Các tháng trong năm
      title: {
        text: "Tháng trong năm",
      },
    };
    // Dữ liệu giả định cho doanh thu theo tháng
    this.getDoanhThuNam(nam);
  }

  getDoThiNgay(ngay: number, thang: number, nam: number) {
    this.chartOptions.xAxis = {
      categories: this.hours, // Các tháng trong năm
      title: {
        text: "Giờ",
      },
    };
    // Dữ liệu giả định cho doanh thu theo tháng
    this.getDoanhThuNgay(ngay, thang, nam);
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

  getDoanhThuNam(nam: number) {
    this.baocaoService.getDoanhThuTheoNam(nam).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        let data = res.data as BaoCao[];

        this.tongDoanhThu = 0;
        this.tongHoaDon = 0;
        this.tongHoaDonTraLai = 0;

        const doanhThuTheoThang = Array(12).fill(0); // Tạo mảng với số ngày trong tháng, giá trị mặc định là 0

        data.forEach((element: BaoCao) => {
          if (element.tongDoanhThu) {
            this.tongDoanhThu += element.tongDoanhThu;
          }
          if (element.tongDonHang) {
            this.tongHoaDon += element.tongDonHang;
          }
          if (element.tongDonHangTraLai) {
            this.tongHoaDonTraLai += element.tongDonHangTraLai;
          }

          // `thoiGian` là ngày trong tháng
          if (element.thoiGian) {
            if (element.thoiGian >= 1 && element.thoiGian <= 12) {
              doanhThuTheoThang[element.thoiGian - 1] =
                element.tongDoanhThu || 0;
            }
          }
        });

        // Cập nhật các thông tin khác nếu cần

        this.chartOptions.series = [
          {
            type: "column",
            name: "Doanh thu",
            data: doanhThuTheoThang, // Dữ liệu giả định cho doanh thu
          },
        ];

        setTimeout(() => {
          Highcharts.chart("container", this.chartOptions); // Cập nhật lại chart
        });
      }
    });
  }

  getDoanhThuThang(thang: number, nam: number) {
    let request = {
      nam: nam,
      thang: thang,
    };

    this.baocaoService.getDoanhThuTheoThang(request).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        let data = res.data as BaoCao[];

        this.tongDoanhThu = 0;
        this.tongHoaDon = 0;
        this.tongHoaDonTraLai = 0;

        // Tính số ngày trong tháng hiện tại
        const daysInMonth = this.getDaysInMonth(thang, nam);

        // Mảng doanh thu của tất cả các ngày trong tháng, khởi tạo với giá trị 0
        const doanhThuTheoNgay = Array(daysInMonth).fill(0); // Tạo mảng với số ngày trong tháng, giá trị mặc định là 0

        // Duyệt qua dữ liệu từ BE và cập nhật giá trị vào mảng doanhThuTheoNgay
        data.forEach((element: BaoCao) => {
          if (element.tongDoanhThu) {
            this.tongDoanhThu += element.tongDoanhThu;
          }
          if (element.tongDonHang) {
            this.tongHoaDon += element.tongDonHang;
          }
          if (element.tongDonHangTraLai) {
            this.tongHoaDonTraLai += element.tongDonHangTraLai;
          }
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

        this.chartOptions.series = [
          {
            type: "column",
            name: "Doanh thu",
            data: doanhThuTheoNgay, // Dữ liệu giả định cho doanh thu
          },
        ];

        setTimeout(() => {
          Highcharts.chart("container", this.chartOptions); // Cập nhật lại chart
        });
      }
    });
  }

  getDoanhThuNgay(ngay: number, thang: number, nam: number) {
    // Tạo biến kiểu năm-tháng-ngày (yyyy-MM-dd)
    const ngayThangNam = `${nam}-${thang.toString().padStart(2, "0")}-${ngay
      .toString()
      .padStart(2, "0")}`;

    this.baocaoService.getDoanhThuTheoNgay(ngayThangNam).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        let data = res.data as BaoCao[];

        this.tongDoanhThu = 0;
        this.tongHoaDon = 0;
        this.tongHoaDonTraLai = 0;

        // Mảng doanh thu của tất cả các ngày trong tháng, khởi tạo với giá trị 0
        const doanhThuTheoNgay = Array(24).fill(0); // Tạo mảng với số ngày trong tháng, giá trị mặc định là 0

        // Duyệt qua dữ liệu từ BE và cập nhật giá trị vào mảng doanhThuTheoNgay
        data.forEach((element: BaoCao) => {
          if (element.tongDoanhThu) {
            this.tongDoanhThu += element.tongDoanhThu;
          }
          if (element.tongDonHang) {
            this.tongHoaDon += element.tongDonHang;
          }
          if (element.tongDonHangTraLai) {
            this.tongHoaDonTraLai += element.tongDonHangTraLai;
          }
          // `thoiGian` là ngày trong tháng
          if (element.thoiGian) {
            if (element.thoiGian >= 1 && element.thoiGian <= 24) {
              doanhThuTheoNgay[element.thoiGian - 1] =
                element.tongDoanhThu || 0;
            }
          }
        });

        this.doanhThuTheoThang = doanhThuTheoNgay;
        // Cập nhật các thông tin khác nếu cần

        this.chartOptions.series = [
          {
            type: "column",
            name: "Doanh thu",
            data: doanhThuTheoNgay, // Dữ liệu giả định cho doanh thu
          },
        ];

        setTimeout(() => {
          Highcharts.chart("container", this.chartOptions); // Cập nhật lại chart
        });
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

  dataOptionsChange(value: string) {
    if (this.typeDoanhThu == CommonConstant.THANG) {
      this.thangSelected = Number.parseInt(value);
    } else {
      this.namSelected = Number.parseInt(value);
    }
  }

  selectThang() {
    const today = new Date();

    this.typeDoanhThu = CommonConstant.THANG;
    this.chartOptions.series = [];

    this.thangSelected = Number.parseInt((today.getMonth() + 1).toString());
    this.namSelected = Number.parseInt(today.getFullYear().toString());

    this.common();
  }

  selectNam() {
    const today = new Date();

    this.typeDoanhThu = CommonConstant.NAM;
    this.chartOptions.series = [];
    this.namSelected = Number.parseInt(today.getFullYear().toString());
    this.common();
  }

  selectNgay() {
    const today = new Date();

    this.typeDoanhThu = CommonConstant.NGAY;
    this.chartOptions.series = [];

    this.ngaySelected = Number.parseInt(today.getDate().toString());
    this.thangSelected = Number.parseInt((today.getMonth() + 1).toString());
    this.namSelected = Number.parseInt(today.getFullYear().toString());

    this.common();
  }

  selectADay(event: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.ngaySelected = Number.parseInt(selectedValue);
    this.common();
  }
  selectAMonth(event: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.thangSelected = Number.parseInt(selectedValue);
    this.updateDaysInMonth();
    this.common();
  }

  selectAYear(event: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.namSelected = Number.parseInt(selectedValue);
    this.updateDaysInMonth();
    this.common();
  }
  updateDaysInMonth() {
    const daysInCurrentMonth = new Date(
      this.namSelected,
      this.thangSelected,
      0
    ).getDate();
    this.daysInMonth = Array.from(
      { length: daysInCurrentMonth },
      (_, i) => i + 1
    );
  }
}
