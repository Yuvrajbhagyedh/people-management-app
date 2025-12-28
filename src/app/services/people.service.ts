import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Person } from '../models/person.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Get all people
  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}/people`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get a single person by ID
  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/people/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new person
  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.apiUrl}/people`, person, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an existing person
  updatePerson(id: number, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/people/${id}`, person, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a person
  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/people/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

