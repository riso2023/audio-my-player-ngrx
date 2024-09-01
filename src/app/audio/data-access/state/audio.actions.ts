import { createAction, props } from '@ngrx/store';
import {TrackEntity} from "../../model/track-entity";

export const loadAudio = createAction('[AUDIO] load audio');
export const loadAudioSuccess = createAction(
  '[AUDIO] load audio success',
  props<{ audioList: TrackEntity[] }>()
);
export const loadAudioFailure = createAction(
  '[AUDIO] load audio failure',
  props<{ error: string }>()
);
