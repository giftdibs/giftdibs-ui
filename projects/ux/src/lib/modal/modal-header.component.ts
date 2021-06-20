import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: 'gd-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHeaderComponent implements OnDestroy {
  @Input()
  public showCloseButton = false;

  @Output()
  public closeButtonClick = new EventEmitter<void>();

  public ngOnDestroy(): void {
    this.closeButtonClick.complete();
  }

  public onCloseClick(): void {
    this.closeButtonClick.emit();
  }
}
