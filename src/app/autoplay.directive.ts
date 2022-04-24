import { AfterViewInit, Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[auto]',
})
export class AutoplayDirective implements AfterViewInit {

  constructor(private e: ElementRef<HTMLVideoElement>) {

  }
  ngAfterViewInit(): void {
    this.e.nativeElement.muted = true;
    this.e.nativeElement.play();
  }
}