import {PaginationInstance} from 'ngx-pagination';

export class PaginationConfig {

  public static readonly PAGE_SIZE = 10;

  public static paginateConfig(): PaginationInstance {
    const configDefault: PaginationInstance = {
      id: 'pagination',
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
    return configDefault;
  }

  public static controlConfig() {
    return {
      maxSize: 5,
      autoHide: true,
      previousLabel: 'Previous',
      nextLabel: 'Next'
    };
  }
}
