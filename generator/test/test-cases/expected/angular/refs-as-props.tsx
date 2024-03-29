import WidgetWithRefProp, {
  DxWidgetWithRefPropModule,
} from "./dx-widget-with-ref-prop";
import { Input } from "@angular/core";
class WidgetInput {
  @Input() nullableRef?: HTMLDivElement;
}

import {
  Component,
  NgModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewRef,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "dx-widget",
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ["nullableRef"],
  template: `<div #divRef
    ><dx-widget-with-ref-prop
      [parentRef]="divRef"
      [nullableRef]="nullableRef"
    ></dx-widget-with-ref-prop
  ></div>`,
})
export default class Widget extends WidgetInput {
  @ViewChild("divRef", { static: false }) divRef!: ElementRef<HTMLDivElement>;
  __getDirectly(): any {
    const divRefOuter = this.divRef.nativeElement?.outerHTML ?? "";
    const nullableRefOuter = this.nullableRef?.outerHTML ?? "";
    return divRefOuter + nullableRefOuter;
  }
  __getDestructed(): any {
    const divRefOuter = this.divRef.nativeElement?.outerHTML ?? "";
    const nullableRefOuter = this.nullableRef?.outerHTML ?? "";
    return divRefOuter + nullableRefOuter;
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
}
@NgModule({
  declarations: [Widget],
  imports: [DxWidgetWithRefPropModule, CommonModule],
  entryComponents: [WidgetWithRefProp],
  exports: [Widget],
})
export class DxWidgetModule {}
export { Widget as DxWidgetComponent };
