import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {ApiAudioService} from '../../../core/http/api.service';
import { loadAudio, loadAudioFailure, loadAudioSuccess } from './audio.actions';
import { trackDTOAdapter } from './audio-dto.adapter';

export const loadAudioEffects = createEffect(
    () => {

    const actions$ = inject(Actions);
    const apiService = inject(ApiAudioService);

    return actions$.pipe(
      ofType(loadAudio),
      switchMap(() =>
        apiService.getAudioData().pipe(
          map((data) => {
            return loadAudioSuccess({ audioList: data.results[0].tracks
              .map((track) => trackDTOAdapter.DTOtoEntity(track)),})
          }
          ),
          catchError((error: string) => {
            return of(loadAudioFailure({ error }));
          })
        )
      )
    );
  }, { functional: true }
);
