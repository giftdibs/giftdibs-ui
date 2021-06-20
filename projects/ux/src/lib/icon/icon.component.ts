import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { IconSize } from './icon-size';
import { IconStyle } from './icon-style';

@Component({
  selector: 'gd-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  @Input()
  public icon: string | undefined;

  @Input()
  public iconSize: IconSize = '1x';

  @Input()
  public set iconStyle(value: `${IconStyle}`) {
    this._iconStyle = value;
  }

  public get iconStyle(): `${IconStyle}` {
    return this._iconStyle || IconStyle.Default;
  }

  @Input()
  public enableSpin = false;

  public classNames: string = '';

  private _iconStyle: `${IconStyle}` = IconStyle.Default;

  public ngOnInit(): void {
    const classNames = ['fa-' + this.icon, 'fa-' + this.iconSize];

    if (this.enableSpin) {
      classNames.push('fa-pulse');
    }

    this.classNames = classNames.join(' ');
  }
}
