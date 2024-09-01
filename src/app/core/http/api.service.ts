import {HttpClient, HttpParams} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {RootObjectDTO} from "../../audio/model/root";


@Injectable({
  providedIn: 'root',
})
export class ApiAudioService {
  private readonly http = inject(HttpClient);

  baseUrl = 'https://api.jamendo.com/v3.0/artists/tracks/'; // или injectionToken

  getAudioData(): Observable<RootObjectDTO> {
    const params = new HttpParams().set('client_id', '72dbb55c').set('format', 'jsonpretty').set('order', 'track_name_desc').set('name', 'Both');
    return this.http.get<RootObjectDTO>(
      `${this.baseUrl}`, // https://api.jamendo.com/v3.0/artists/tracks/?client_id=72dbb55c&format=jsonpretty&order=track_name_desc&name=Both
      {
        params,
      }
    );
  }
}
