import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  TemplateRef,
} from '@angular/core';

import { AffixHorizontalAlignment } from '../affix/affix-horizontal-alignment';
import { AffixVerticalAlignment } from '../affix/affix-vertical-alignment';

import { DropdownMenuConfig } from './dropdown-menu-config';
import { DropdownMenuInstance } from './dropdown-menu-instance';
import { DropdownMenuItem } from './dropdown-menu-item';
import { DropdownMenuService } from './dropdown-menu.service';

@Directive({
  selector: '[gdDropdownMenuTrigger]',
})
export class DropdownMenuTriggerDirective {
  @Input()
  public menuHorizontalAlignment: AffixHorizontalAlignment | undefined;

  @Input()
  public menuVerticalAlignment: AffixVerticalAlignment | undefined;

  @Input()
  public menuItemTemplate: TemplateRef<any> | undefined;

  @Input()
  public set menuItems(value: DropdownMenuItem[]) {
    this._menuItems = value;
  }

  public get menuItems(): DropdownMenuItem[] {
    return this._menuItems || [];
  }

  private menuInstance: DropdownMenuInstance | undefined;

  private _menuItems: DropdownMenuItem[] = [];

  constructor(
    private dropdownMenuService: DropdownMenuService,
    private elementRef: ElementRef,
  ) {}

  @HostListener('click', ['$event'])
  public onClick(): void {
    if (this.menuInstance) {
      this.menuInstance.componentInstance.close();
      this.menuInstance = undefined;
      return;
    }

    const config: DropdownMenuConfig = {
      affix: {},
      caller: this.elementRef,
      items: this.menuItems,
      itemTemplate: this.menuItemTemplate,
    };

    if (this.menuHorizontalAlignment) {
      config.affix!.horizontalAlignment = this.menuHorizontalAlignment;
    }

    if (this.menuVerticalAlignment) {
      config.affix!.verticalAlignment = this.menuVerticalAlignment;
    }

    this.menuInstance = this.dropdownMenuService.open(config);

    this.menuInstance.closed.subscribe(() => {
      this.menuInstance = undefined;
    });
  }
}
