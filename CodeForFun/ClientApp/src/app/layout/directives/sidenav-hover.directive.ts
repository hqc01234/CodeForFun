import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appSidenavHover]'
})
export class SideNavHoverDirective {

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2
    ) {
    }

    @HostListener('mouseenter', ['$event'])
    @HostListener('mouseleave', ['$event'])
    public onMouseHover(event: MouseEvent) {
        const x = event.clientX;
        const y = event.clientY;
        const hostRect = (this._elementRef.nativeElement as HTMLElement).getBoundingClientRect();

        if (hostRect.left > x || hostRect.right <= x || hostRect.top > y || hostRect.bottom <= y) {
            this._renderer.removeClass(this._elementRef.nativeElement, 'hover');
        } else {
            this._renderer.addClass(this._elementRef.nativeElement, 'hover');
        }
    }
}
