import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, map } from 'rxjs';
import { Environment } from '../env/environment';


@Injectable({
  providedIn: 'root'
})
export class MusicService {

    API_URL = Environment.douAPIUrl + 'audio/';

    constructor(private http: HttpClient) { }

    getSong(file: string): Observable<any> {
        return this.http.get(this.API_URL + 'stream/' + file, { responseType: 'blob' });
    }

    getRandomSong(): Observable<{
        audioBlob: Blob;
        fileName: string;
        metadata: {
          title: string;
          artists: string[];
          album: string;
          cover: string;
        };
      }> {
        return this.http.get(this.API_URL + 'random-audio', { observe: 'response', responseType: 'blob' }).pipe(
          map(response => {
            const fileName = response.headers.get('X-Audio-Filename') || '';
            const metadata = {
              title: decodeURIComponent(response.headers.get('X-Audio-Title') || ''),
              artists: decodeURIComponent(response.headers.get('X-Audio-Artist') || '').split(', '),
              album: decodeURIComponent(response.headers.get('X-Audio-Album') || ''),
              cover: decodeURIComponent(response.headers.get('X-Audio-Cover') || '')
            };
            console.log('File Name:', fileName); // Log the file name for debugging
            console.log('Metadata:', metadata); // Log the metadata for debugging
            return {
              audioBlob: response.body as Blob,
              fileName,
              metadata
            };
          })
        );
      }
      
       

}