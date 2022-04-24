import { AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Point, PolygonLineGroup } from '../Modules/LineGroupCollisionManager';

@Component({
  selector: 'app-poly-expo',
  templateUrl: './poly-expo.component.html',
  styleUrls: ['./poly-expo.component.css']
})
export class PolyExpoComponent implements AfterViewInit {

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
    let s = a.get('s')?.value;
    let angle = a.get('a')?.value;
    let ply = new PolygonLineGroup(new Point(cx, cy), r, s, angle);
    this.context1.fillRect( 0, 0, this.context1.canvas.width, this.context1.canvas.height);
    this.context1.lineWidth = 0.5;
    this.context1.beginPath();
    this.context1.moveTo(0, this.context1.canvas.height / 2);
    this.context1.lineTo(this.context1.canvas.width, this.context1.canvas.height / 2);
    this.context1.moveTo(this.context1.canvas.width / 2, 0);
    this.context1.lineTo(this.context1.canvas.width / 2, this.context1.canvas.height);
    this.context1.stroke();
    this.context1.lineWidth = 1;
    this.context1.beginPath();
    ply.lineArray.forEach((line) => {
      this.context1.arc(line.x, line.y, 3, 0, 360);
      this.context1.moveTo(line.x, line.y);
      this.context1.lineTo(line.x2, line.y2);
    });
    this.context1.stroke();
  }

  @ViewChild('canvas1') canvas1!: ElementRef<HTMLCanvasElement>;
  context1!: CanvasRenderingContext2D;

}
