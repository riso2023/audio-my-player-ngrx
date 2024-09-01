import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AudioFacade } from '../../data-access/state/audio.facade';
import {TrackEntity} from "../../model/track-entity";
import {AudioListComponent} from "../audio-list/audio-list.component";
import {PlayerComponent} from "../player/player.component";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-audio-container',
  templateUrl: './audio-container.component.html',
  styleUrls: ['./audio-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AudioListComponent,
    PlayerComponent,
    AsyncPipe,
    NgIf
  ],
  standalone: true
})
export class AudioContainerComponent implements OnInit {
  private readonly audioFacade = inject(AudioFacade);

  public readonly audioList$ = this.audioFacade.audioList$;
  public readonly errorAudioList$ = this.audioFacade.errorAudioList$;

  ngOnInit(): void {
    this.audioFacade.loadFolders();
  }

  selectAudio(row: TrackEntity): void {
    this.selectedAudio = {
      id: row.id,
      name: row.name,
      audio: row.audio,
    };
  }

  selectedAudio: TrackEntity | null = null;
}


