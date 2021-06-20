import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalFooterComponent {}
