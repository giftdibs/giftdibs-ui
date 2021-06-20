import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';

import { IconSize } from '../icon/icon-size';
import { IconStyle } from '../icon/icon-style';

import { ThumbnailShape } from './thumbnail-shape';
import { ThumbnailSize } from './thumbnail-size';

@Component({
  selector: 'gd-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailComponent {
  @Input()
  public set icon(value: string) {
    this._icon = value;
  }

  public get icon(): string {
    if (this._icon) {
      return this._icon;
    }

    return this.shape === `${ThumbnailShape.Circle}` ? 'user' : 'image';
  }

  @Input()
  public set iconSize(value: IconSize) {
    this._iconSize = value;
  }

  public get iconSize(): IconSize {
    if (this._iconSize) {
      return this._iconSize;
    }

    let size: IconSize;

    switch (this.size) {
      case 'fill':
      case 'static':
      case 'lg':
        size = '3x';
        break;

      case 'md':
        size = '2x';
        break;

      default:
        size = '1x';
        break;
    }

    return size;
  }

  @Input()
  public iconStyle: `${IconStyle}` = IconStyle.Default;

  @Input()
  public imageSource: string = '';

  @Input()
  public route:
    | {
        commands: any[];
        extras?: NavigationExtras;
      }
    | undefined;

  @Input()
  public externalLink: string | undefined;

  @Input()
  public size: `${ThumbnailSize}` = ThumbnailSize.Static;

  @Input()
  public altText: string = '';

  @Input()
  public shape: `${ThumbnailShape}` = ThumbnailShape.Default;

  public get classNames(): string {
    const classNames = [];

    if (!this.imageSource) {
      classNames.push('gd-thumbnail-empty');
    }

    classNames.push(`gd-thumbnail-${this.shape}`);
    classNames.push(`gd-thumbnail-${this.size}`);

    if (this.shape === `${ThumbnailShape.Circle}`) {
      classNames.push('gd-rounded-corners-circle');
    }

    return classNames.join(' ');
  }

  private _icon: string | undefined;

  private _iconSize: IconSize = '1x';
}
