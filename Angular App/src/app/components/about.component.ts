import {Controller} from "../controller/controller";
import {AppState} from "../interface/app-state";
import {Response} from "../interface/response";
import {DataState} from "../enum/data-state.enum";
import {Component, Input, OnInit} from '@angular/core';
import {map, Observable, of, startWith} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'about',
  templateUrl: './about.component.html'

})
export class AboutComponent {
  constructor(private services: Controller) {
  }



}
