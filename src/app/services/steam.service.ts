import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, map } from 'rxjs';
import { Environment } from '../env/environment';


@Injectable({
  providedIn: 'root'
})
export class SteamService {

    API_URL = Environment.douAPIUrl + 'Steam/';

    constructor(private http: HttpClient) { }

    getAchievements(): Observable<any> {
        return this.http.get(this.API_URL + 'achievements');
    }
}