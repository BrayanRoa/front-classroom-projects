import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentInterface } from '../interfaces/document.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private URL: string = environment.API_NODE

  constructor(
    private readonly http: HttpClient
  ) { }

  getAll(): Observable<DocumentInterface> {
    return this.http.get<DocumentInterface>(`${this.URL}/documents`)
  }
}
