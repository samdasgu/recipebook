import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropDown]'
})
export class DropDownDirective {

    // @HostBinding('class.open') isOpen: boolean = false;
    isOpen: boolean = false;

    constructor(private element: ElementRef, private renderer: Renderer2) {}

    @HostListener('click')
    mouseClick() {
        if(!this.isOpen) {
            this.renderer.addClass(this.element.nativeElement, 'open');
        } else {
            this.renderer.removeClass(this.element.nativeElement, 'open')
        }
        this.isOpen = !this.isOpen;
    }

}