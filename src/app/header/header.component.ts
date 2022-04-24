import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Line, Point, PolygonLineGroup } from '../Modules/LineGroupCollisionManager';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {

  logo = new PolygonLineGroup(new Point(150, 150), 100, 3, 0);
  constructor() { }

  ngAfterViewInit(): void {
    this.canvas1.nativeElement.style.width = "300px";
    this.canvas1.nativeElement.style.height = "300px";
    this.canvas1.nativeElement.style.zIndex = "0";
    this.context1 = this.canvas1.nativeElement.getContext("2d")!;
    this.context1.canvas.width = 300;
    this.context1.canvas.height = 300;
    this.context1.lineWidth = 2;
    this.traceCanvas1.nativeElement.style.color = "rgb(65,205,255)";
    this.traceCanvas1.nativeElement.style.transition = `all ${15/30}s linear`;
    let context1_buffer: Line[][] = [];
    let tracer = context1_buffer.length * 120;
    let traceSwitch = true;
    setInterval(() => {
      let buffer: Line[] = [];
      for (let i = 0; i < this.logo.lineArray.length; i++) {
        buffer.push(this.logo.lineArray[i]);
      }
      if (context1_buffer.length > 12) {
        context1_buffer.shift();
      }
      context1_buffer.push(buffer);
      this.context1.clearRect(0, 0, this.context1.canvas.width, this.context1.canvas.height);
      context1_buffer.forEach((value, index) => {
        this.context1.strokeStyle = `rgba( 65, ${25 + index * 10}, ${108 + index * 9}, ${1 - index/(context1_buffer.length-1)/2})`;
        tracer++;
        tracer%= context1_buffer.length * 180;
        if (tracer % (context1_buffer.length * 15 + 1) == 0){
          if (traceSwitch){
            this.traceCanvas1.nativeElement.style.color = `rgb( 65, ${205 - index * 15}, ${255 - index * 9})`;
            this.traceCanvas1.nativeElement.style.textShadow = `0 0 5px rgb( 65, ${25 + index * 15}, ${108 + index * 9})`;
          } else {
            this.traceCanvas1.nativeElement.style.color = `rgb( 65, ${25 + index * 15}, ${108 + index * 9})`;
            this.traceCanvas1.nativeElement.style.textShadow = `0 0 5px rgb( 65, ${205 - index * 15}, ${255 - index * 9})`;
          }
          if (tracer == 0 || tracer == context1_buffer.length * 180 + 1){
            traceSwitch=!traceSwitch;
          }
        }
        this.context1.beginPath();
        value.forEach((line) => {          
          this.context1.moveTo(line.x, line.y);
          this.context1.lineTo(line.x2, line.y2);
        });
        this.context1.stroke();
      });
      this.logo = new PolygonLineGroup(new Point(150, 150), 100, 3, this.logo.initAngle +  Math.PI / 45);
    }, 1000 / 30);
  }

  @ViewChild('canvas1') canvas1!: ElementRef<HTMLCanvasElement>;
  context1!: CanvasRenderingContext2D;
  @ViewChild('traceCanvas1') traceCanvas1!: ElementRef<HTMLSpanElement>;
}
