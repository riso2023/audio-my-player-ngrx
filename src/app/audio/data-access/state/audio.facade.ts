import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AudioActions from './audio.actions';
import * as AudioSelectors from './audio.selectors';

@Injectable({ providedIn: 'root' })
export class AudioFacade {
  private readonly store = inject(Store);

  public readonly audioList$ = this.store.select(
    AudioSelectors.audioListSelector
  );
  public readonly errorAudioList$ = this.store.select(
    AudioSelectors.errorAudioListSelector
  );

  public loadFolders(): void {
    this.store.dispatch(AudioActions.loadAudio());
  }
}
