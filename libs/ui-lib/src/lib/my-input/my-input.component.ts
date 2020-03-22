import {ChangeDetectorRef, Component, ElementRef, Inject, Input, NgZone, OnInit, Optional, Renderer2, Self} from '@angular/core';
import {MAT_INPUT_VALUE_ACCESSOR} from '@angular/material/input';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {Platform} from '@angular/cdk/platform';
import {ErrorStateMatcher} from '@angular/material/core';
import {AutofillMonitor} from '@angular/cdk/text-field';

@Component({
  selector: 'm-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css']
})
export class MyInputComponent implements ControlValueAccessor, OnInit {

  @Input()
  id: string = 'asdf';

  @Input()
  placeholder: string = 'my input ph';

  @Input()
  readonly: boolean;

  @Input()
  required: boolean;


  @Input()
  isNativeSelect: boolean = false;

  @Input()
  errorState: boolean = false;

  @Input()
  disabled: boolean = false;


  @Input()
  value: any;


  @Input()
  type: string;

  onChange = (_: any) => {
  };
  onTouched = () => {
  };


  constructor(protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
              protected _platform: Platform,
              private _cd: ChangeDetectorRef,
              @Optional() @Self() public _ngControl: NgControl,
              @Optional() protected parentForm: NgForm,
              @Optional() protected parentFormGroup: FormGroupDirective,
              _defaultErrorStateMatcher: ErrorStateMatcher,
              @Optional() @Self() @Inject(MAT_INPUT_VALUE_ACCESSOR) private inputValueAccessor: any,
              private autofillMonitor: AutofillMonitor,
              private _renderer: Renderer2,
              ngZone: NgZone) {

    if (this._ngControl != null) {
      this._ngControl.valueAccessor = this;
    }

  }


  ngOnInit(): void {

    // this.disabled = false;
    // this.readonly = false;
    // this.required = true;

  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }

  onInput(value: string) {
    console.info('on Input= ', value);
  }


  _compositionStart(): void {

  }


  _compositionEnd(value: any): void {
    this.onChange(value);
  }

  _focusChanged(b: boolean) {

  }
}
