import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {tap, catchError} from "rxjs/operators";
import {Response} from "../interface/response";

@Injectable({ providedIn: 'root' })
export class Controller {

  constructor(private http: HttpClient) { }

  // This is a procedural approach
  // getTwoSum() : Observable<CustomResponse> {
  //   return this.http.get<CustomResponse>('http://localhost:8080/twosum');
  // }

  private readonly  apiUrl = 'https://classics-springboot-4o5v3rpzga-ue.a.run.app';
  //private readonly  apiUrl = 'http://localhost:8080';
  // This is a reactive approach


  doubleIt$ = (input: string) => <Observable<Response>>
      this.http.get<Response>(`${this.apiUrl}/doubleit/${input}`)
        .pipe(
          tap(console.log),
          catchError(Controller.handleError)
        );

  twoSum$ = (inputArray: string[], inputTarget: string) => <Observable<Response>>
    this.http.get<Response>(`${this.apiUrl}/twosum/${inputArray}+${inputTarget}`)
      .pipe(
        tap(console.log),
        catchError(Controller.handleError)
      );

  knapsack$ = (inputValues: number[], inputWeights: number[], inputMaximum: number) => <Observable<Response>>
    this.http.get<Response>(`${this.apiUrl}/knapsack/${inputValues}+${inputWeights}+${inputMaximum}`)
      .pipe(
        tap(console.log),
        catchError(Controller.handleError)
      );

  quicksort$ = (inputArray: number[]) => <Observable<Response>>
    this.http.get<Response>(`${this.apiUrl}/quicksort/${inputArray}`)
      .pipe(
        tap(console.log),
        catchError(Controller.handleError)
      );

  dijkstras$ = (inputEdges: string, inputSource: string) => <Observable<Response>>
    this.http.get<Response>(`${this.apiUrl}/dijkstras/${inputEdges}+${inputSource}`)
      .pipe(
        tap(console.log),
        catchError(Controller.handleError)
      );

  dfs$ = (inputEdges: string, inputSource: string) => <Observable<Response>>
    this.http.get<Response>(`${this.apiUrl}/dfs/${inputEdges}+${inputSource}`)
      .pipe(
        tap(console.log),
        catchError(Controller.handleError)
      );

  kmp$ = (inputPattern: string, inputString: string) => <Observable<Response>>
    this.http.get<Response>(`${this.apiUrl}/kmp/${inputPattern}+${inputString}`)
      .pipe(
        tap(console.log),
        catchError(Controller.handleError)
      );

  coinChange$ = (inputCoins: number[], inputChange: number) => <Observable<Response>>
    this.http.get<Response>(`${this.apiUrl}/coin-change/${inputCoins}+${inputChange}`)
      .pipe(
        tap(console.log),
        catchError(Controller.handleError)
      );

  jobSequencing$ = (inputJobs: string, inputDeadline: number) => <Observable<Response>>
    this.http.get<Response>(`${this.apiUrl}/job-sequencing/${inputJobs}+${inputDeadline}`)
      .pipe(
        tap(console.log),
        catchError(Controller.handleError)
      );

  coloring$ = (inputEdges: string) => <Observable<Response>>
    this.http.get<Response>(`${this.apiUrl}/graph-coloring/${inputEdges}`)
      .pipe(
        tap(console.log),
        catchError(Controller.handleError)
      );

  kruskal$ = (inputEdges: string) => <Observable<Response>>
    this.http.get<Response>(`${this.apiUrl}/kruskal/${inputEdges}`)
      .pipe(
        tap(console.log),
        catchError(Controller.handleError)
      );

  private static handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`Error occurred - Error Code: ${error.status}`);
  }
}


