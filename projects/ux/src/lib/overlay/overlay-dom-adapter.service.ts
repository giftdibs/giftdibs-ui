import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { WindowRefService } from '../window/window-ref.service';

@Injectable({
  providedIn: 'root',
})
export class OverlayDomAdapterService {
  private hostElement: any;
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private windowRef: WindowRefService,
  ) {
    this.renderer = this.rendererFactory.createRenderer(undefined, null);
  }

  public appendToBody(element: any): void {
    const body = this.windowRef.nativeWindow.document.body;
    this.hostElement = element;
    this.renderer.appendChild(body, element);
  }

  public removeHostElement(): void {
    const documentObj = this.windowRef.nativeWindow.document;
    this.renderer.removeChild(documentObj.body, this.hostElement);
  }

  public restrictBodyScroll(): void {
    this.renderer.setStyle(
      this.windowRef.nativeWindow.document.body,
      'overflow',
      'hidden',
    );
  }

  public releaseBodyScroll(): void {
    this.renderer.removeStyle(
      this.windowRef.nativeWindow.document.body,
      'overflow',
    );
  }
}
