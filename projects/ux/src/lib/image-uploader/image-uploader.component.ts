import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ImageUploaderOrientation } from './image-uploader-orientation';

@Component({
  selector: 'gd-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      /* tslint:disable-next-line:no-forward-ref */
      useExisting: forwardRef(() => ImageUploaderComponent),
      multi: true,
    },
  ],
})
export class ImageUploaderComponent implements OnDestroy, ControlValueAccessor {
  @Input()
  public allowUrl = true;

  @Input()
  public orientation: `${ImageUploaderOrientation}` =
    ImageUploaderOrientation.Horizontal;

  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
  }

  public disabled = false;

  public imageSource: string = '';

  @Output()
  public selectFile = new EventEmitter<{ file: any }>();

  @Output()
  public removeFile = new EventEmitter<void>();

  @Output()
  public urlButtonClick = new EventEmitter<void>();

  @ViewChild('fileInput')
  public fileInput: ElementRef | undefined;

  private _value: string = '';

  constructor(private changeDetector: ChangeDetectorRef) {}

  public ngOnDestroy(): void {
    this.selectFile.complete();
    this.removeFile.complete();
    this.urlButtonClick.complete();
  }

  public triggerFileSelect(): void {
    if (this.fileInput) {
      const input = this.fileInput.nativeElement;
      input.value = '';
      input.click();
    }
  }

  public triggerUrlSelect(): void {
    this.urlButtonClick.next();
  }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectFile.next({ file });
  }

  public writeValue(value: any): void {
    this.imageSource = value;
    this.value = value;
    this.changeDetector.markForCheck();
  }

  // Angular automatically constructs these methods.
  public onChange = (value: any) => {};
  public onTouched = () => {};

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetector.markForCheck();
  }

  public clearSelection(): void {
    this.removeFile.next();
  }
}
