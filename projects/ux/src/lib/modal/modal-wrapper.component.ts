import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injector,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { Observable } from 'rxjs';

import { ModalConfig } from './modal-config';
import { ModalSize } from './modal-size';

@Component({
  selector: 'gd-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalWrapperComponent implements OnDestroy {
  public get closed(): Observable<void> {
    return this._closed;
  }

  public get size(): ModalSize {
    return this._size || ModalSize.Medium;
  }

  public set size(value: ModalSize) {
    this._size = value;
  }

  @ViewChild('target', { read: ViewContainerRef, static: true })
  private targetRef: ViewContainerRef | undefined;

  private _closed = new EventEmitter<void>();
  private _size: ModalSize = ModalSize.Medium;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {}

  public ngOnDestroy(): void {
    this._closed.complete();
  }

  public attach<T>(component: Type<T>, config: ModalConfig): ComponentRef<T> {
    const injector = Injector.create({
      providers: config.providers || [],
      parent: this.injector,
    });

    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef = this.targetRef!.createComponent(
      factory,
      undefined,
      injector,
    );

    this.size = config.size || ModalSize.Medium;
    this.changeDetector.markForCheck();

    return componentRef;
  }

  public close(): void {
    this._closed.emit();
    this._closed.complete();
    this.changeDetector.markForCheck();
  }
}
