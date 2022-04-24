import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[errata]'
})
export class ErrataDirective {

  originalColor!: string;
  constructor(private e: ElementRef<HTMLElement>) { }

  @Input() errata!: AbstractControl;

  ngOnInit() {
    this.originalColor = this.e.nativeElement.style.background;
  }

  @HostListener('mouseenter') onMouseEnter (){
    if (this.errata.invalid) {
      this.e.nativeElement.style.background = "#f008";
    }
  }

  @HostListener('mouseleave') onMouseExit (){
    if (this.errata.invalid) {
      this.e.nativeElement.style.background = this.originalColor;
    }
  }
}
