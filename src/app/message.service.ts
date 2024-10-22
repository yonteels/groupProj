import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8000/allanime'; 

  constructor(private http: HttpClient) {}

  getAnime(limit: number = 50, offset: number = 0): Observable<any> {
    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());
    return this.http.get(this.apiUrl, { params });
  }
}
