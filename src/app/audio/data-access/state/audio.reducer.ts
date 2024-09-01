import {ActionReducerMap, createReducer, MetaReducer, on} from '@ngrx/store';
import { loadAudioFailure, loadAudioSuccess } from './audio.actions';
import {TrackEntity} from "../../model/track-entity";
import {environment} from "../../../../environments/environment";

export const AUDIO_KEY = 'audio';

export interface AudioState {
  audioList: TrackEntity[];
  error: string | null;
}

const initalState: AudioState = {
  audioList: [],
  error: null,
};

export interface State {
  [AUDIO_KEY]: AudioState;
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const counterReducer = createReducer<AudioState>(
  initalState,
  on(loadAudioSuccess, (state, { audioList }) => ({
    ...state,
    audioList: audioList,
  })),
  on(loadAudioFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);

export const reducers: ActionReducerMap<State> = {
  [AUDIO_KEY]: counterReducer,
};
