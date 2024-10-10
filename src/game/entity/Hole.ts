import { GameObject } from '../engine/GameEngine';

export class Hole implements GameObject {
  private x: number;
  private y: number;
  private size: number;
  private color: string;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = '#4A5A31';
  }

  update(deltaTime: number): void {
    console.log('Hole updated', deltaTime);
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getSize(): number {
    return this.size;
  }
}