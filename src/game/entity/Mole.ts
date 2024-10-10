import { GameObject } from '../engine/GameEngine';
import moleImage from '../../assets/mole.png';

export class Mole implements GameObject {
  private x: number;
  private y: number;
  private size: number;
  private isVisible: boolean = false;
  private timeVisible: number = 0;
  private visibleDuration: number;
  private image: HTMLImageElement;
  private imageLoaded: boolean = false;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.visibleDuration = Math.random() * 200 + 200;
    this.image = new Image();
    this.image.onload = () => {
      this.imageLoaded = true;
    };
    this.image.onerror = (error) => {
      console.error('Error loading mole image:', error);
    };
    this.image.src = moleImage;
  }

  update(deltaTime: number): void {
    if (this.isVisible) {
      this.timeVisible += deltaTime;
      if (this.timeVisible >= this.visibleDuration) {
        this.hide();
      }
    }
  } 

  render(ctx: CanvasRenderingContext2D): void {
    if (this.isVisible) {
      if (this.imageLoaded) {
        ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
      } else {
        ctx.fillStyle = 'brown';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  isClicked(clickX: number, clickY: number): boolean {
    if (!this.isVisible) return false;
    const distance = Math.sqrt((clickX - this.x) ** 2 + (clickY - this.y) ** 2);
    return distance <= this.size / 2;
  }

  show(): void {
    this.isVisible = true;
    this.timeVisible = 0;
    this.visibleDuration = Math.random() * 200 + 200;
  }

  hide(): void {
    this.isVisible = false;
  }

  getIsVisible(): boolean {
    return this.isVisible;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  isLoaded(): boolean {
    return this.imageLoaded;
  }
}