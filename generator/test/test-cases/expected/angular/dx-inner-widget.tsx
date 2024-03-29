import { Input, Output, EventEmitter } from "@angular/core";
export class InnerWidgetProps {
  @Input() selected?: boolean;
  @Input() value: number = 14;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() valueChange: EventEmitter<number> = new EventEmitter();
}

import {
  Component,
  NgModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewRef,
  forwardRef,
  HostListener,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const CUSTOM_VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InnerWidget),
  multi: true,
};
@Component({
  selector: "dx-inner-widget",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_VALUE_ACCESSOR_PROVIDER],
  inputs: ["selected", "value"],
  outputs: ["onSelect", "valueChange"],
  template: `<div
    [ngStyle]="__processNgStyle({ width: 100, height: 100 })"
  ></div>`,
})
export default class InnerWidget
  extends InnerWidgetProps
  implements ControlValueAccessor {
  get __restAttributes(): any {
    return {};
  }
  _detectChanges(): void {
    setTimeout(() => {
      if (this.changeDetection && !(this.changeDetection as ViewRef).destroyed)
        this.changeDetection.detectChanges();
    });
  }

  @HostListener("valueChange", ["$event"]) change() {}
  @HostListener("onBlur", ["$event"]) touched = () => {};

  writeValue(value: any): void {
    this.value = value;
    this._detectChanges();
  }

  registerOnChange(fn: () => void): void {
    this.change = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  _onSelect: any;
  _valueChange: any;
  constructor(private changeDetection: ChangeDetectorRef) {
    super();
    this._onSelect = (e: any) => {
      this.onSelect.emit(e);
    };
    this._valueChange = (e: any) => {
      this.valueChange.emit(e);
      this._detectChanges();
    };
  }

  __processNgStyle(value: any) {
    if (typeof value === "object") {
      return Object.keys(value).reduce((v: { [name: string]: any }, k) => {
        if (typeof value[k] === "number") {
          v[k] = value[k] + "px";
        } else {
          v[k] = value[k];
        }
        return v;
      }, {});
    }

    return value;
  }
}
@NgModule({
  declarations: [InnerWidget],
  imports: [CommonModule],
  exports: [InnerWidget],
})
export class DxInnerWidgetModule {}
export { InnerWidget as DxInnerWidgetComponent };
