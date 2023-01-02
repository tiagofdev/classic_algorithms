// Coin Change

import {Controller} from "../controller/controller";
import {AppState} from "../interface/app-state";
import {Response} from "../interface/response";
import {DataState} from "../enum/data-state.enum";
import {map, Observable, of, startWith} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgForm} from "@angular/forms";

export class JobSequencing {
  constructor(private services: Controller) { }

  readonly  dataState = DataState;

  jobSequencingResponse$!: Observable<AppState<Response>>;
  getResponse(form: NgForm): Observable<AppState<Response>> {
    this.jobSequencingResponse$ = this.services.jobSequencing$(form.value.inputJobs,
      form.value.inputDeadline)
      .pipe(
        map(results => {
          return { dataState: DataState.LOADED_STATE, response: results }
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((err: string) => {
          return of({ dataState: DataState.ERROR_STATE, error: err })
        })
      );
    return this.jobSequencingResponse$;
  }

  data = {
    title: "Job Sequencing with Deadline",
    description: "Given a list of jobs with deadlines and an associated profit, find the maximum " +
      "profit earned, provided each job is completed within its deadline. Consider all jobs are " +
      "executed at one time unit equally.",
    examples: "\n  Input:\n" +
      "  Jobs = (A,9,15)(B,2,3)(C,5,18)\n" +
      "         (D,7,2)(E,4,24)(F,2,20)\n" +
      "         (G,5,8)(H,7,10)(I,4,12)\n" +
      "  Output:\n" +
      "  Job Sequence: F-E-I-C-G-H-D-A\n" +
      "   Notice job B was not scheduled in the \n" +
      "   sequence for it was not profitable!\n" +
      "  Maximum Profit: 109\n",
    inputNotes: "Jobs = (Id, Deadline, Profit)" ,
    inputs: ["Jobs: ", "Deadline: "],
    parameters: ["inputJobs", "inputDeadline"],
    patterns: ["letters-numbers-commas-parentheses", "numberInt"],
    results: ["Jobs Sequence: ", "Maximum Profit: "],
    references: ["https://www.geeksforgeeks.org/job-sequencing-problem/"],
    algorithm: ""
  }

  getData(): any {
    return this.data;
  }
}
