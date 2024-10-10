import { Mole } from "../entity/Mole";
import { Hole } from "../entity/Hole";
import wemadebgm from "../../assets/wemadebgm.mp3";
import popsfx from "../../assets/pop.mp3";
import { debounce } from "../utils/debounce";

export class GameEngine {
  // game
  private nextMoleTime: number = 0;
  private moleSpawnInterval: number = 1000;
  private gameStarted: boolean = false;
  private isPaused: boolean = false;
  private _isSoundOn: boolean = true;
  private canSpawnMole: boolean = true;

  // score
  private score: number = 0;

  // entity
  private moles: Mole[] = [];
  private holes: Hole[] = [];

  // canvas
  private width: number;
  private height: number;
  private canvas: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  // context
  private setScore: (score: number) => void;
  private setTimer: (timer: number) => void;

  // time
  private gameTime: number = 30000;
  private remainingTime: number = this.gameTime;
  private lastTime: number = 0;

  // bgm
  private bgm: HTMLAudioElement;

  // sfx
  private sfx: HTMLAudioElement;

  private debouncedAllowMoleSpawn: () => void;

  constructor(
    canvasId: string,
    setScore: (score: number) => void,
    setTimer: (timer: number) => void,
    width: number,
    height: number
  ) {
    this.debouncedAllowMoleSpawn = debounce(() => {
      this.canSpawnMole = true;
    }, 500) as () => void;

    // context
    this.setScore = setScore;
    this.setTimer = setTimer;

    // bgm
    this.bgm = new Audio(wemadebgm);
    this.bgm.loop = true;

    // sfx
    this.sfx = new Audio(popsfx);
    this.sfx.loop = false;

    // canvas
    this.width = width;
    this.height = height;
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!this.canvas) {
      console.error("Canvas element not found");
      return;
    }
    this.ctx = this.canvas.getContext("2d")!;
    if (!this.ctx) {
      console.error("Unable to get 2D context");
      return;
    }
    this.canvas.addEventListener("click", this.handleClick.bind(this));

    window.addEventListener("blur", this.handleWindowBlur.bind(this));
    window.addEventListener("focus", this.handleWindowFocus.bind(this));
  }

  public async start(): Promise<void> {
    await this.createHoles();
    this.gameStarted = true;
    this.remainingTime = this.gameTime;
    this.score = 0;
    this.setScore(this.score);
    this.setTimer(Math.ceil(this.remainingTime / 1000));
    this.playBGM();
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);
  }

  public stop(): void {
    this.gameStarted = false;
    this.isPaused = true;
    this.remainingTime = this.gameTime;
    this.setTimer(Math.ceil(this.remainingTime / 1000));
    this.stopBGM();
  }

  public cleanup(): void {
    this.stop();
    this.bgm.pause();
    this.bgm.currentTime = 0;
    this.bgm.src = "";
    this.canvas.removeEventListener("click", this.handleClick.bind(this));
    window.removeEventListener("blur", this.handleWindowBlur.bind(this));
    window.removeEventListener("focus", this.handleWindowFocus.bind(this));
  }

  private createHoles(): void {
    const cols = 3;
    const spacing = Math.min(this.width, this.height) / 5;
    const holeSize = spacing * 0.8;
    const initialX = (this.width - (cols - 1) * spacing) / 2;
    const initialY = this.height / 2;

    for (let j = 0; j < cols; j++) {
      const hole = new Hole(initialX + j * spacing, initialY, holeSize);
      this.holes.push(hole);
    }

    this.moles = this.holes.map(
      (hole) => new Mole(hole.getX(), hole.getY(), hole.getSize() * 0.8)
    );
  }

  private gameLoop(timestamp: number): void {
    if (!this.gameStarted || this.isPaused) return;

    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private update(deltaTime: number): void {
    const fixedTimeStep = 1000 / 60;
    const numSteps = Math.floor(deltaTime / fixedTimeStep);

    for (let i = 0; i < numSteps; i++) {
      this.updateGameState(fixedTimeStep);
    }

    const remainingTime = deltaTime - numSteps * fixedTimeStep;
    this.updateGameState(remainingTime);
  }

  private updateGameState(deltaTime: number): void {
    this.remainingTime -= deltaTime;
    if (this.remainingTime <= 0) {
      this.stop();
      return;
    }

    this.setTimer(Math.ceil(this.remainingTime / 1000));

    this.nextMoleTime -= deltaTime;
    if (this.nextMoleTime <= 0 && this.canSpawnMole) {
      this.showRandomMole();
      this.nextMoleTime = this.moleSpawnInterval;
    }

    for (const mole of this.moles) {
      mole.update(deltaTime);
    }
  }

  private render(): void {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.holes.forEach((hole) => {
      hole.render(this.ctx);
    });
    this.moles.forEach((mole) => {
      mole.render(this.ctx);
    });
  }

  private handleClick(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (const mole of this.moles) {
      if (mole.isClicked(x, y)) {
        this.score += 1;
        this.setScore(this.score);
        mole.hide();
        this.playSFX();
        break;
      }
    }

    this.canSpawnMole = false;
    this.debouncedAllowMoleSpawn();
  }

  private showRandomMole(): void {
    const hiddenMoles = this.moles.filter((mole) => !mole.getIsVisible());
    if (hiddenMoles.length > 0) {
      const randomMole =
        hiddenMoles[Math.floor(Math.random() * hiddenMoles.length)];
      randomMole.show();
    }
  }

  private playBGM(): void {
    if (this._isSoundOn) {
      this.bgm.play().catch((error) => {
        console.error("Error playing BGM:", error);
      });
    }
  }

  private stopBGM(): void {
    this.bgm.pause();
  }

  private handleWindowBlur(): void {
    this.isPaused = true;
    this.stopBGM();
  }

  private handleWindowFocus(): void {
    this.isPaused = false;
    this.lastTime = performance.now();
    this.playBGM();
    this.gameLoop(this.lastTime);
  }

  private playSFX(): void {
    if (this._isSoundOn) {
      this.sfx.currentTime = 0;
      this.sfx.play().catch((error) => {
        console.error("Error playing SFX:", error);
      });
    }
  }

  get isSoundOn(): boolean {
    return this._isSoundOn;
  }

  set isSoundOn(value: boolean) {
    if (this._isSoundOn !== value) {
      this._isSoundOn = value;
      this.handleSoundChange();
    }
  }

  private handleSoundChange(): void {
    if (this._isSoundOn) {
      if (this.gameStarted && !this.isPaused) {
        this.playBGM();
      }
    } else {
      this.stopBGM();
    }
  }
}

export interface GameObject {
  update(deltaTime: number): void;
  render(ctx: CanvasRenderingContext2D): void;
}
