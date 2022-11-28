import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {
    this._historic = JSON.parse(localStorage.getItem('historic')!) || [];
    this.gifs = JSON.parse(localStorage.getItem('gifs')!) || [];
  }

  private apiKey: string = environment.apiKey;
  private apiURL: string = environment.apiURL;
  private _historic: string[] = [];

  public gifs: Gif[] = [];

  get historic() {
    return [...this._historic];
  }

  searchGifs(query: string) {
    query = query.toLocaleLowerCase();

    if (!this._historic.includes(query)) {
      this._historic.unshift(query);
      this._historic = this._historic.splice(0, 10);
      localStorage.setItem('historic', JSON.stringify(this._historic));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.apiURL}/search`, { params })
      .subscribe((resp) => {
        this.gifs = resp.data;
        localStorage.setItem('gifs', JSON.stringify(this.gifs));
      });
  }
}
