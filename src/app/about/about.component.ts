import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Line, Point } from '../Modules/LineGroupCollisionManager';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {

  design: Line[] = [new Line(new Point(0, 0), new Point(0, 0))];
  constructor() { }

  ngAfterViewInit(): void {
    let dpi = window.devicePixelRatio;
    this.canvas1.nativeElement.style.position = "absolute";
    this.canvas1.nativeElement.style.zIndex = "-1";
    this.canvas1.nativeElement.style.minHeight = "75vh";
    this.canvas1.nativeElement.style.minWidth = "100vh";
    this.canvas1.nativeElement.style.height = "600px";
    this.canvas1.nativeElement.style.width = "800px";
    this.canvas1.nativeElement.style.top = "0";
    this.canvas1.nativeElement.style.right = "0";
    this.context1 = this.canvas1.nativeElement.getContext("2d")!;
    this.context1.canvas.width = this.canvas1.nativeElement.clientWidth * dpi;
    this.context1.canvas.height = this.canvas1.nativeElement.clientHeight * dpi;
    this.context1.fillStyle = "rgb(65, 55, 117)";
    this.context1.beginPath();
    this.context1.moveTo(0, this.context1.canvas.height);
    this.context1.lineTo(this.context1.canvas.width * 0.8, 0);
    this.context1.lineTo(this.context1.canvas.width * 0.8 + 50, 0);
    this.context1.lineTo(50, this.context1.canvas.height);
    this.context1.closePath();
    this.context1.fill();
    this.context1.fillStyle = "rgb(65, 85, 135)";
    this.context1.beginPath();
    this.context1.moveTo(this.context1.canvas.width * 0.1, this.context1.canvas.height);
    this.context1.lineTo(this.context1.canvas.width * 0.9, 0);
    this.context1.lineTo(this.context1.canvas.width * 0.9 + 100, 0);
    this.context1.lineTo(this.context1.canvas.width * 0.1 + 100, this.context1.canvas.height);
    this.context1.closePath();
    this.context1.fill();
    this.context1.fillStyle = "rgb(65, 115, 153)";
    this.context1.beginPath();
    this.context1.moveTo(this.context1.canvas.width * 0.25, this.context1.canvas.height);
    this.context1.lineTo(this.context1.canvas.width * 1.05, 0);
    this.context1.lineTo(this.context1.canvas.width * 1.05 + 200, 0);
    this.context1.lineTo(this.context1.canvas.width * 0.25 + 200, this.context1.canvas.height);
    this.context1.closePath();
    this.context1.fill();
    this.context1.fillStyle = "rgb(65, 145, 171)";
    this.context1.beginPath();
    this.context1.moveTo(this.context1.canvas.width * 0.5, this.context1.canvas.height);
    this.context1.lineTo(this.context1.canvas.width * 1.3, 0);
    this.context1.lineTo(this.context1.canvas.width * 1.3 + 400, 0);
    this.context1.lineTo(this.context1.canvas.width * 0.5 + 400, this.context1.canvas.height);
    this.context1.closePath();
    this.context1.fill();
  }

  @ViewChild('canvas1') canvas1!: ElementRef<HTMLCanvasElement>;
  context1!: CanvasRenderingContext2D;
}
