import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {}
