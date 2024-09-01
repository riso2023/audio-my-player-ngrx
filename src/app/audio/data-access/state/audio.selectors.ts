import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUDIO_KEY, AudioState } from './audio.reducer';

export const featureSelector = createFeatureSelector<AudioState>(AUDIO_KEY);

export const audioListSelector = createSelector(
  featureSelector,
  (state) => state.audioList
);

export const errorAudioListSelector = createSelector(
  featureSelector,
  (state) => state.error
);
