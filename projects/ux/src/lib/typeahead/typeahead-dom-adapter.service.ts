import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

@Injectable()
export class TypeaheadDomAdapterService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(undefined, null);
  }

  public matchWidth(subject: ElementRef, target: ElementRef): void {
    const width = target.nativeElement.getBoundingClientRect().width;
    this.renderer.setStyle(subject.nativeElement, 'width', `${width}px`);
  }
}
