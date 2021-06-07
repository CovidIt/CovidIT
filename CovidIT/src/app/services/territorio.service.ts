import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL} from '../constants';
import { TerritorioModel } from "../model/territorio.model";
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class TerritorioService{


    constructor(private http: HttpClient) {
    }

    /*
    nuoviDecessi: number;
  nuoviPositivi: number;
  nuoviTamponi: number;
  nuoviTerapieIntensive: number;
  totDecessi: number;
  totPositivi: number;
  totTamponi: number;
  totTerapieIntensive: number;
    */

    //Carica i dati odierni del territorio selezionato, che può essere italia o regione.
    loadDatiOdierni(territorio: String): Observable<TerritorioModel>{
        return this.http.get<TerritorioModel>(URL.TERRITORIO + "/" + territorio);
    }

    


}