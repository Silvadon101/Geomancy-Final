import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';
import { AbstractControl, FormGroup } from '@angular/forms';
import { LineGroup, Point } from '../Modules/LineGroupCollisionManager';

@Component({
  selector: 'app-line-expo',
  templateUrl: './line-expo.component.html',
  styleUrls: ['./line-expo.component.css']
})
export class LineExpoComponent implements AfterViewInit {

  points: number = 2;
  _points(): string[] {
    let a = [];
    for (let i = 0; i < this.points; i++) {
      a.push("");
    }
    return a;
  }
  constructor() { }

  ngAfterViewInit(): void {
    let dpi = window.devicePixelRatio;
    this.context1 = this.canvas1.nativeElement.getContext("2d")!;
    this.context1.canvas.width = this.canvas1.nativeElement.clientWidth * dpi;
    this.context1.canvas.height = this.canvas1.nativeElement.clientHeight * dpi;
    this.context1.strokeStyle = "white";
    this.context1.fillStyle = "black";
    this.context1.fillRect( 0, 0, this.context1.canvas.width, this.context1.canvas.height);
    this.context1.lineWidth = 0.5;
    this.context1.beginPath();
    this.context1.moveTo(0, this.context1.canvas.height / 2);
    this.context1.lineTo(this.context1.canvas.width, this.context1.canvas.height / 2);
    this.context1.moveTo(this.context1.canvas.width / 2, 0);
    this.context1.lineTo(this.context1.canvas.width / 2, this.context1.canvas.height);
    this.context1.stroke();
  }

  display(a: AbstractControl) {
    let buffer: Point[] = [];
    for (let i = 0; i < this.points; i++) {
      let x = parseInt(a.get(i.toString() + "x")?.value) + this.context1.canvas.width / 2;
      let y = parseInt(a.get(i.toString() + "y")?.value) + this.context1.canvas.height / 2;
      buffer.push(new Point(x, y));
    }
    let lg = new LineGroup(...buffer);
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
    lg.lineArray.forEach((line) => {
      this.context1.arc(line.x, line.y, 3, 0, 360);
      this.context1.moveTo(line.x, line.y);
      this.context1.lineTo(line.x2, line.y2);
    });
    this.context1.stroke();
  }

  @ViewChild('canvas1') canvas1!: ElementRef<HTMLCanvasElement>;
  context1!: CanvasRenderingContext2D;
}