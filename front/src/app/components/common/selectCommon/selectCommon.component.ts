import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-select-common",
  templateUrl: "./selectCommon.component.html",
  styleUrls: ["./selectCommon.component.css"],
})
export class SelectCommonComponent implements OnInit {
  constructor() {}

  @Input() options: any;

  @Input() optionLabel: any;

  @Input() optionValue: any;

  @Input()
  isOptionSelectType: boolean = false;

  @Output() selectionChange = new EventEmitter<string>();

  @Input()
  selectedOptionValue: string | undefined;

  ngOnInit() {
    if (this.isOptionSelectType) {
      this.setOptionLabel();
    }
  }

  setOptionLabel(): void {
    this.optionLabel = "name";
  }

  onOptionChange(newValue: string) {
    this.selectionChange.emit(newValue);
  }
}
