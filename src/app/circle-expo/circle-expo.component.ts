import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Circle, Point } from '../Modules/LineGroupCollisionManager';

@Component({
  selector: 'app-circle-expo',
  templateUrl: './circle-expo.component.html',
  styleUrls: ['./circle-expo.component.css']
})
export class CircleExpoComponent implements AfterViewInit {

  lastDisplay: any;
  constructor() { }

  ngAfterViewInit(): void {
    let dpi = window.devicePixelRatio;
    this.context1 = this.canvas1.nativeElement.getContext("2d")!;
    this.context1.canvas.width = this.canvas1.nativeElement.clientWidth * dpi;
    this.context1.canvas.height = this.canvas1.nativeElement.clientHeight * dpi;
    this.context1.strokeStyle = "white";
    this.context1.fillStyle = "black";
    this.context1.fillRect(0, 0, this.context1.canvas.width, this.context1.canvas.height);
    this.context1.lineWidth = 0.5;
    this.context1.beginPath();
    this.context1.moveTo(0, this.context1.canvas.height / 2);
    this.context1.lineTo(this.context1.canvas.width, this.context1.canvas.height / 2);
    this.context1.moveTo(this.context1.canvas.width / 2, 0);
    this.context1.lineTo(this.context1.canvas.width / 2, this.context1.canvas.height);
    this.context1.stroke();
  }

  display(a: AbstractControl) {
    let cx = a.get('cx')?.value + this.context1.canvas.width / 2;
    let cy = a.get('cy')?.value + this.context1.canvas.height / 2;
    let r = a.get('r')?.value;
    let crc = new Circle(new Point(cx, cy), r);
    let tracer = 0;
    clearInterval(this.lastDisplay);
    this.lastDisplay = setInterval(() => {
      this.context1.fillRect(0, 0, this.context1.canvas.width, this.context1.canvas.height);
      this.context1.lineWidth = 0.5;
      this.context1.beginPath();
      this.context1.moveTo(0, this.context1.canvas.height / 2);
      this.context1.lineTo(this.context1.canvas.width, this.context1.canvas.height / 2);
      this.context1.moveTo(this.context1.canvas.width / 2, 0);
      this.context1.lineTo(this.context1.canvas.width / 2, this.context1.canvas.height);
      this.context1.stroke();
      this.context1.lineWidth = 1;
      let point = crc.pointFromRadians(Math.PI*2*tracer/60);
      this.context1.beginPath();
      this.context1.arc(point.x, point.y, 5, 0, 360);
      this.context1.closePath();
      this.context1.stroke();
      tracer++;
      tracer%=60;
    }, 1000 / 30);
  }

  @ViewChild('canvas1') canvas1!: ElementRef<HTMLCanvasElement>;
  context1!: CanvasRenderingContext2D;

}
