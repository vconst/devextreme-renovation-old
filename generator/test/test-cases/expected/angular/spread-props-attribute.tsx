import InnerWidget, { DxInnerWidgetModule } from './dx-inner-widget';

import { Input, Output, EventEmitter } from '@angular/core';
export class WidgetInput {
	@Input() visible?: boolean;
	@Input() value?: boolean;
	@Output() valueChange: EventEmitter<boolean> = new EventEmitter();
}

import { Component, NgModule, forwardRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

const CUSTOM_VALUE_ACCESSOR_PROVIDER = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Widget),
    multi: true
}

@Component({
	selector: 'dx-widget',
    providers: [ CUSTOM_VALUE_ACCESSOR_PROVIDER ],
	template: `<dx-inner-widget
              [value]="value"
              (valueChange)="valueChange.emit($event)"
            ></dx-inner-widget>`,
})
export default class Widget extends WidgetInput implements ControlValueAccessor {
	get __restAttributes():any {
		return {};
	}

    @HostListener('valueChange', ['$event']) change(_) { }
    @HostListener('onBlur', ['$event']) touched = (_) => {};

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: (_: any) => void): void { this.change = fn; }
    registerOnTouched(fn: () => void): void { this.touched = fn; }
}
@NgModule({
    declarations: [Widget],
    imports: [
        DxInnerWidgetModule,
        CommonModule
    ],
	  exports: [Widget],
})
export class DxWidgetModule {}
