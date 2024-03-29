export const COMPONENT_INPUT_CLASS = "c3";
import { Input, ViewChild, ElementRef } from "@angular/core";
export class WidgetProps {
  @Input() height?: number = 10;
  @Input() width?: number = 10;
  __slotChildren?: ElementRef<HTMLDivElement>;

  get children() {
    const childNodes = this.__slotChildren?.nativeElement?.childNodes;
    return childNodes && childNodes.length > 2;
  }
}

import {
  Component,
  NgModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "dx-widget",
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ["height", "width"],
  template: `<div></div
    ><ng-template #dxchildren><ng-content></ng-content></ng-template>`,
})
export default class Widget extends WidgetProps {
  __onClick(): any {
    const v = this.height;
  }
  get __restAttributes(): any {
    return {};
  }
  _detectChanges(): void {
    setTimeout(() => {
      if (this.changeDetection && !(this.changeDetection as ViewRef).destroyed)
        this.changeDetection.detectChanges();
    });
  }

  constructor(private changeDetection: ChangeDetectorRef) {
    super();
  }
  @ViewChild("slotChildren") set slotChildren(
    slot: ElementRef<HTMLDivElement>
  ) {
    const oldValue = this.children;
    this.__slotChildren = slot;
    const newValue = this.children;
    if (!!oldValue !== !!newValue) {
      this._detectChanges();
    }
  }
}
@NgModule({
  declarations: [Widget],
  imports: [CommonModule],

  exports: [Widget],
})
export class DxWidgetModule {}
export { Widget as DxWidgetComponent };
