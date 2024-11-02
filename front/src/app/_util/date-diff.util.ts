export class DateDiffUtil {
  static dayOfMonth = 30;
  static dayOfYear = 365;

  static convertToObj(year: any, month: any, day: any): any {
    year = !year || year < 1 ? 0 : year;
    month = !month || month < 1 ? 0 : month;
    day = !day || day < 1 ? 0 : day;
    const obj: any = {
      yearNum: year,
      monthNum: month,
      dayNum: day,
    };

    return obj;
  }

  public static diff(days: number): any {
    if (!days || days < 0) {
      return null;
    }
    const yearRemainder = Math.floor(days / this.dayOfYear);
    const monthRemainder = Math.floor(
      (days - yearRemainder * this.dayOfYear) / this.dayOfMonth
    );
    const dayRemainder =
      days - yearRemainder * this.dayOfYear - monthRemainder * this.dayOfMonth;

    return this.convertToObj(yearRemainder, monthRemainder, dayRemainder);
  }

  static diffDays(startDate: Date, endDate: Date) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let timeDifference = Math.abs(end.getTime() - start.getTime());
    return Math.round(timeDifference / (1000 * 60 * 60 * 24));
  }

  static calculateTimeDifference(startTime: any, endTime: any): string {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const diff = end.getTime() - start.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h:${minutes}m`;
  }

  static getTimeDifference(startTime: any, endTime: any) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();

    const diffSeconds = Math.floor(diffMs / 1000); // Đổi sang giây
    const diffMinutes = Math.floor(diffMs / (1000 * 60)); // Đổi sang phút
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Đổi sang giờ
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // Đổi sang ngày
    const diffMonths = Math.floor(diffDays / 30); // Đổi sang tháng (1 tháng ~ 30 ngày)

    if (diffSeconds < 60) {
      return `JUST ${diffSeconds} SEC AGO`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} MIN AGO`;
    } else if (diffHours < 24) {
      return `${diffHours} HRS AGO`;
    } else if (diffDays < 30) {
      return `${diffDays} DAYS AGO`;
    } else {
      return `${diffMonths} MONTH AGO`;
    }
  }
}
