import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gd-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFooterComponent {}
