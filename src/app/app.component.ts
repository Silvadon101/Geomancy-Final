import { AfterViewInit, Component, HostListener } from '@angular/core';
import { LineGroup, Point } from './Modules/LineGroupCollisionManager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Geomancy';
  mouse!: HTMLCanvasElement;
  mouse_shape = new LineGroup(...[new Point(1, 0), new Point(1, 30), new Point(8.5, 22), new Point(20, 22)], new Point(1, 0));
  mouse_ctx: CanvasRenderingContext2D | null = null;

  constructor() {

  }

  ngAfterViewInit(): void {
    let dpi = window.devicePixelRatio;
    this.mouse = document.createElement("canvas");
    this.mouse.style.position = "fixed";
    this.mouse.style.pointerEvents = "none";
    this.mouse.style.top = `0px`;
    this.mouse.style.left = `0px`;
    this.mouse.style.width = `${20/dpi}px`;
    this.mouse.style.height = `${30/dpi}px`;
    this.mouse_ctx = this.mouse!.getContext("2d");
    this.mouse_ctx!.canvas.width = 20;
    this.mouse_ctx!.canvas.height = 30;
    this.mouse_ctx!.strokeStyle = "black";
    this.mouse_ctx!.lineWidth = 1;
    this.mouse_ctx!.fillStyle = "white";
    let region = new Path2D();
    region.moveTo(this.mouse_shape.lineArray[0].x, this.mouse_shape.lineArray[0].y);
    this.mouse_shape.lineArray.forEach((line) => {
      region.lineTo(line.x2, line.y2);
    });
    region.closePath();
    this.mouse_ctx!.fill(region);
    this.mouse_ctx!.stroke(region);
    document.lastChild!.lastChild!.appendChild(this.mouse);
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.mouse.style.visibility = "hidden";
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.mouse.style.visibility = "visible";
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    this.mouse.style.top = `${event.y}px`;
    this.mouse.style.left = `${event.x}px`;
  }
}
