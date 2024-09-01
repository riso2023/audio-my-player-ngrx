import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {TrackEntity} from "../../model/track-entity";
import {NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgStyle
  ],
  standalone: true
})
export class PlayerComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);

  private _audioData: TrackEntity = {
    id: '',
    name: '',
    audio: '',
  };

  //private _audioData: TrackEntity | null = null;


  @Input() set audioData(value: TrackEntity) {
    this._audioData = value;

    this.audio.src = this.audioData.audio;
    this.id = this.audioData.id;
    this.title = this.audioData.name;

    this.isPlay = true;

    if (this.audioData.id !== '') {
      this.audioUpdateHandler();
    }
  }

  get audioData(): TrackEntity {
    return this._audioData;
  }

  private readonly audio = new Audio();

  public isPlay = false;
  public isLoaded = true;
  public timeLineCurrent = '0:00';
  public timeLine = '0:00';
  private timeLineNumber = 0;
  public timeLinePercent = 0;
  private timeCurrent = 0;

  public id = '';
  public title = '';

  ngOnInit(): void {
    this.audio.volume = 0.5;
  }

  audioUpdateHandler(): void {
    this.isLoaded = false;
    this.audio.play().finally(() => {
      this.isLoaded = true;
      this.cdr.detectChanges();
    });

    this.audio.addEventListener('loadeddata', () => {
      this.timeLineNumber = this.audio.duration;
      this.timeLine = this.secondInMinute(this.timeLineNumber);
    });

    this.audio.addEventListener('timeupdate', () => {
      this.timeCurrent = this.audio.currentTime;
      this.timeLineCurrent = this.secondInMinute(this.timeCurrent);
      this.timeLinePercent = (this.timeCurrent / this.timeLineNumber) * 100;
    });
  }

  playAudio(): void {
    if (this.isPlay) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlay = !this.isPlay;
  }

  setVolume(e: Event): void {
    const target = e.target as HTMLInputElement | null;
    if (target && this.audio) {
      this.audio.volume = target.valueAsNumber;
    }
  }

  rewindAudio(e: MouseEvent): void {
    const targetElement = e.target as HTMLElement;
    const divWidth = targetElement.offsetWidth;
    const clickWidth = e.offsetX;

    this.timeLinePercent = (clickWidth / divWidth) * 100;
    this.audio.currentTime = (this.timeLineNumber / 100) * this.timeLinePercent;
  }

  secondInMinute(time: number): string {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time - 60 * minute);
    let secondStr = '';

    if (second < 10) {
      secondStr = `0${second}`;
    } else {
      secondStr = `${second}`;
    }
    this.cdr.detectChanges();
    return `${minute}:${secondStr}`;
  }
}
