export const name = "Line Group Collision Manager";
const X = 'x';
const Y = 'y';

/**
 * Creates a structure representing the data of a single coordinate
 * @param x - The horizontal coordinate
 * @param y - The vertical coordinate
 */
export class Point {
    protected _x: number;
    public get x(): number {
        return this._x;
    }
    protected _y: number;
    public get y(): number {
        return this._y;
    }
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
}

/**
 * @description Creates a structure generating the data of a single line between two points
 * @param point1 The starting point
 * @param point2 The ending point
 * @param etc. Singular coordinate entry mode
 */
export class Line {

    protected _x: number;
    public get x(): number {
        return this._x
    }
    protected _y: number;
    public get y(): number {
        return this._y;
    }
    protected _x2: number;
    public get x2(): number {
        return this._x2;
    }
    protected _y2: number;
    public get y2(): number {
        return this._y2;
    }
    protected _m: number;
    public get m(): number {
        return this._m;
    }
    protected _c: number;
    public get c(): number {
        return this._c;
    }
    private lowBoundX: number;
    private upperBoundX: number;
    public get XBounds(): Point {
        return new Point(this.lowBoundX, this.upperBoundX);
    }
    private lowBoundY: number;
    private upperBoundY: number;
    public get YBounds(): Point {
        return new Point(this.lowBoundY, this.upperBoundY);
    }
    private _length: number;
    public get length(): number {
        return this._length;
    }

    constructor(point1: Point | null, point2: Point | null, x?: number, y?: number, x2?: number, y2?: number) {
        if (point1 == point2) {
            throw new Error("A line must have a length.");
        }
        this._x = x ?? point1!.x;
        this._y = y ?? point1!.y;
        this._x2 = x2 ?? point2!.x;
        this._y2 = y2 ?? point2!.y;
        this._m = (this._y2 - this._y) / (this._x2 - this._x);
        this._m = this._m;
        this._c = this._y - this._m * this._x;
        this._c = this._c;
        this.lowBoundX = this._x < this._x2 ? this._x : this._x2;
        this.upperBoundX = this._x > this._x2 ? this._x : this._x2;
        this.lowBoundY = this._y < this._y2 ? this._y : this._y2;
        this.upperBoundY = this._y > this._y2 ? this._y : this._y2;
        this._length = Math.pow(Math.pow(Math.abs(this._x - this._x2), 2) + Math.pow(Math.abs(this._y - this._y2), 2), 0.5);
    }

    /**
     * @description Returns true if a certain point lies upon the line
     * @param point The aforementioned point
     * @returns Wether or not the point is on the line
     */
    pointOnLine(point: Point): boolean {
        if ((Math.round(point.x * 1000) == Math.round(this._x * 1000) && Math.round(point.y * 1000) == Math.round(this._y * 1000)) || (Math.round(point.x * 1000) == Math.round(this._x2 * 1000) && Math.round(point.y * 1000) == Math.round(this._y2 * 1000))) {
            return true;
        } else if (Math.round(this.xgiveny(point.y) * 1000) == Math.round(point.x * 1000)) {
            let inX = Math.round(point.x * 1000) >= Math.round(this.lowBoundX * 1000) && Math.round(point.x * 1000) <= Math.round(this.upperBoundX * 1000);
            let inY = Math.round(point.y * 1000) >= Math.round(this.lowBoundY * 1000) && Math.round(point.y * 1000) <= Math.round(this.upperBoundY * 1000);
            return inX && inY;
        } else {
            return false;
        }
    }

    /**
     * @description Provides an x value given a corresponding y value
     * @param y The y coordinate
     * @returns The x coordinate
     */
    xgiveny(y: number): number {
        return !Number.isFinite(this.m) ? this._x : (y - this._c) / this.m;
    }

    /**
     * @description Provides a y value given an x value, but if the line is vertical a boolean is returned stating wether or not that x value is that of the line
     * @param x The x coordinate
     * @returns The y coordinate
     */
    ygivenx(x: number): number | boolean {
        let aligned = Math.round(x * 1000) == Math.round(this._x * 1000);
        return !Number.isFinite(this.m) ? aligned : ((this._m * x) + this._c);
    }

    /**
     * @description Provides a point along the line with a corresponding length
     * @param length The length along the line group to travel
     * @returns The point
     */
    pointFromLength(length: number): Point {
        let newLine = new Line2(new Point(this._x, this._y), Math.atan(this._m), length, new Point(this._x2, this._y2));
        return new Point(newLine.x2, newLine.y2);
    }
}

/**
 * @description Creates a structure generating the data of a single line between two points
 */
export class Line2 extends Line {
    constructor(point: Point, rads: number, length: number, directive: Point) {
        let opp = Math.sin(rads) * length;
        let adj = Math.cos(rads) * length;
        let left = point.x > directive.x;
        let right = !left;
        let equal = point.x == directive.x;
        let up = point.y > directive.y;
        let down = !up;
        if (left){
            super(point, new Point(point.x - adj, point.y - opp));
        } else if (right){
            super(point, new Point(point.x + adj, point.y + opp));
        } else if (equal){
            if (up){
                super(point, new Point(point.x + adj, point.y - opp));
            } else if (down){
                super(point, new Point(point.x - adj, point.y + opp));
            }
        }
    }
}

/**
 * @description Creates a structure generating the data of a circle
 * @param point The center point
 * @param r The length of the radius
 */
export class Circle extends Point {
    protected _r: number;
    public get r(): number {
        return this._r;
    }

    constructor(point: Point, r: number) {
        r = r == 0 ? 1 : r;
        super(point.x, point.y);
        this._r = r;
    }

    /**
     * @description Provides a point indicated by the radians of the angle from the centre of the circle
     * @param rads Radian value
     * @returns The point
     */
    pointFromRadians(rads: number): Point {
        rads %= (2 * Math.PI);
        let point = new Point((this._r * Math.cos(rads) + this.x), (this._r * Math.sin(rads) + this._y));
        return point;
    }

    /**
     * @description Provides the radians of the angle from the centre of the circle that would intersect a certain points
     * @param point The aforementioned point
     * @returns The point
     */
    radiansFromPoint(point: Point): number {
        let rads = Math.atan2(point.y - this.y, point.x - this.x);
        return rads;
    }

    /**
     * @description Provides the line from the centre of the circle indicated by the radians provided
     * @param rads The radians
     * @returns The line
     */
    lineFromRadians(rads: number): Line {
        rads %= (2 * Math.PI);
        let point = new Point((this._r * Math.cos(rads)) + this.x, (this._r * Math.sin(rads) + this._y));
        return new Line(point, new Point(this._x, this._y));
    }
}

export class LineGroup {
    private _lineArray: Line[] = [];
    public get lineArray(): Line[] {
        return this._lineArray;
    }
    private _length: number = 0;
    public get length(): number {
        return this._length;
    }

    private topBound: number = Number.POSITIVE_INFINITY;
    private leftBound: number = Number.POSITIVE_INFINITY;
    private bottomBound: number = Number.NEGATIVE_INFINITY;
    private rightBound: number = Number.NEGATIVE_INFINITY;

    constructor(...points: Point[]) {
        points.forEach((value, index) => {
            let buffer;
            if (index != points.length - 1) {
                buffer = new Line(value, points[index + 1]);
                this._lineArray.push(buffer);
                this._length += buffer.length;
            }
            if (this.topBound >= value.y) this.topBound = value.y;
            if (this.leftBound >= value.x) this.leftBound = value.x;
            if (this.bottomBound <= value.y) this.topBound = value.y;
            if (this.rightBound <= value.x) this.leftBound = value.x;
        });
    }

    /**
     * @description Provides the first point that would be intersected in the line group provided a line
     * @param line The aforementioned line
     * @returns The point
     */
    pointFromLine(line: Line): Point | null {
        for (let i = 0; i < this._lineArray.length; i++) {
            let element = this._lineArray[i];
            if (!Number.isFinite(line.m) && !Number.isFinite(element.m)) {
                if (element.x >= line.XBounds.x && element.x <= line.XBounds.y) {
                    if (element.y >= line.YBounds.x && element.y <= line.YBounds.y) {
                        return new Point(element.x, element.y);
                    }
                }
                if (element.x2 >= line.XBounds.x && element.x2 <= line.XBounds.y) {
                    if (element.y2 >= line.YBounds.x && element.y2 <= line.YBounds.y) {
                        return new Point(element.x2, element.y2);
                    }
                }
                if (line.x2 >= element.XBounds.x && line.x2 <= element.XBounds.y) {
                    if (line.y2 >= element.YBounds.x && line.y2 <= element.YBounds.y) {
                        return new Point(line.x2, line.y2);
                    }
                }
                if (line.x >= element.XBounds.x && line.x <= element.XBounds.y) {
                    if (line.y >= element.YBounds.x && line.y <= element.YBounds.y) {
                        return new Point(line.x, line.y);
                    }
                }
            }
            let interx: number;
            let intery: number;
            if (!Number.isFinite(line.m)) {
                interx = line.x;
                intery = element.ygivenx(line.x) as number;
            } else if (!Number.isFinite(element.m)) {
                interx = element.x;
                intery = line.ygivenx(element.x) as number;
            } else {
                interx = (line.c - element.c) / (element.m - line.m);
                intery = ((element.m * line.c) - (element.c * line.m)) / (element.m - line.m);
            }
            let intersect = new Point(interx, intery);
            if (element.pointOnLine(intersect)) {
                if (line.pointOnLine(intersect)) {
                    return new Point(interx, intery);
                }
            }
        }
        return null;
    }

    /**
     * @description Provides the point indicated by a length along the line group
     * @param length The length
     * @returns The point
     */
    pointFromLength(length: number): Point | null {
        for (let i = 0; i < this.lineArray.length; i++) {
            length -= this.lineArray[i].length;
            if (length <= 0) {
                length += this.lineArray[i].length;
                return this.lineArray[i].pointFromLength(length);
            }
        }
        return null;
    }
}

export class PolygonLineGroup extends LineGroup {

    private _initAngle: number;
    public get initAngle(): number {
        return this._initAngle;
    }
    private _faces: number;
    public get faces(): number {
        return this._faces;
    }
    private _PolyBaseCircle: Circle;
    public get PolyBaseCircle(): Circle {
        return this._PolyBaseCircle;
    }
    constructor(point: Point, r: number, sides: number, startr: number) {
        r = r == 0 ? 1 : r;
        sides = sides ?? 3;
        sides = sides < 3 ? 3 : sides;
        let PolyBaseCircle = new Circle(point, r);
        let unit = (2 * Math.PI) / sides;
        let points: Point[] = [];
        for (let i = 0; i < sides; i++) {
            let a = PolyBaseCircle.pointFromRadians((startr + (unit * i)) % (2 * Math.PI));
            points.push(a);
        }
        points.push(PolyBaseCircle.pointFromRadians(startr % (2 * Math.PI)));
        super(...points);
        this._PolyBaseCircle = PolyBaseCircle;
        this._initAngle = startr;
        this._faces = sides;
    }

    /**
     * @description Provides a point indicated by the radians of the angle from the centre of the circle
     * @param r Radian value
     * @returns The point
     */
    pointFromRadians(r: number): Point {
        let keyLine = this._PolyBaseCircle.lineFromRadians(r);
        return this.pointFromLine(keyLine)!;
    }

    /**
     * @description Provides the radians of the angle from the centre of the circle that would intersect a certain points
     * @param point The aforementioned point
     * @returns The point
     */
    radiansFromPoint(point: Point): number {
        return this._PolyBaseCircle.radiansFromPoint(point);
    }
}

function between(target: number, bound1: number, bound2: number) {
    let lowbound = bound1 < bound2 ? bound1 : bound2;
    let highbound = bound1 > bound2 ? bound1 : bound2;
    return target > lowbound && target < highbound
}

function inc_between(target: number, bound1: number, bound2: number) {
    let lowbound = bound1 < bound2 ? bound1 : bound2;
    let highbound = bound1 > bound2 ? bound1 : bound2;
    return target >= lowbound && target <= highbound
}