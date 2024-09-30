import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoiaService {
  private apiUrl = 'https://api.foia.gov/api/agency_components';
  private apiKey = 'xb3IkVrdbwfCvt60BJZFutdBkhMyWtl8lvT3wUlg'; // Replace with your actual API key

  constructor(private http: HttpClient) {}

  // Fetch data with optional pagination
  getAgencies(limit: number = 10, offset: number = 0): Observable<any> {
    const headers = new HttpHeaders({
      'X-API-Key': this.apiKey
    });
    const url = `${this.apiUrl}?&fields[agency_component]=title,abbreviation,website,submission_address&page[limit]=${limit}&page[offset]=${offset}`;
    return this.http.get(url, { headers });
  }
}
