import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Italia} from '../model/italia.model';
import { Territorio } from '../model/territorio.model';
import { TerritorioService } from './territorio.service';

@Injectable({
  providedIn: 'root'
})

export class ItaliaService{

  private dato$: Italia;

    constructor(private http: HttpClient, private territorioService: TerritorioService){}


    /*
    Funzione che esegue la richiesta http alle api per i dati e li trasforma in una promise catturata da bindDati()
    */
    loadDati(): any{
      let todayDate = this.territorioService.getTodayDate();
      //Trasformo l'Observable ritornato dalla richiesta get in una promise perchè viene fatta una sola volta.
      let dataPromise = this.http.get('https://api.covid19tracking.narrativa.com/api/' + todayDate + '/country/italy').toPromise();
      return dataPromise;
    }


    /*
    Funzione che serve a restituire i dati scaricati alla page
    */
    bindDati(): any{


      let todayString = this.territorioService.getTodayDate();

      this.dato$=new Italia();
      this.loadDati().then(data =>{
        let italyDatiObj = data['dates'][todayString]['countries']['Italy'];
        this.dato$.nuovi_decessi = italyDatiObj.today_new_deaths;
        this.dato$.nuovi_positivi = italyDatiObj.today_new_confirmed;
        this.dato$.nuovi_terapia_intensiva = italyDatiObj.today_new_intensive_care;
        this.dato$.nuovi_tamponi = italyDatiObj.today_new_tests;
        this.dato$.totale_decessi = italyDatiObj.today_deaths;
        this.dato$.totale_positivi = italyDatiObj.today_confirmed;
        this.dato$.totale_terapia_intensiva = italyDatiObj.today_intensive_care;
        this.dato$.totale_tamponi = italyDatiObj.today_tests;
        let dataAmericana = italyDatiObj.date;
        let from= dataAmericana;
        let temp = from.split("-");
        let dataItaliana = temp[2] + "/" + temp[1] + "/" + temp[0];
        this.dato$.ultimo_aggiornamento = dataItaliana;
      }).catch(()=>{
        this.territorioService.showErrorToast();
      });

      return this.dato$;


    }



    /*
    Funzione che serve a prendere il corretto path per l'svg della regione scelta
    */
    getRegionSVG(nomeRegione: string): string{
        let s="";
        if (nomeRegione=="Abruzzo"){
            s = "../assets/svg/regions/abruzzo.svg";
          }
          else if (nomeRegione=="Basilicata"){
            s = "../assets/svg/regions/basilicata.svg";
          }
          else if (nomeRegione=="Calabria"){
            s = "../assets/svg/regions/calabria.svg";
          }
          else if (nomeRegione=="Campania"){
            s = "../assets/svg/regions/campania.svg";
          }
          else if (nomeRegione=="Emilia-Romagna"){
            s = "../assets/svg/regions/emiliaRomagna.svg";
          }
          else if (nomeRegione=="Friuli Venezia Giulia"){
            s = "../assets/svg/regions/friuliVeneziaGiulia.svg";
          }
          else if (nomeRegione=="Lazio"){
            s = "../assets/svg/regions/lazio.svg";
          }
          else if (nomeRegione=="Liguria"){
            s = "../assets/svg/regions/liguria.svg";
          }
          else if (nomeRegione=="Lombardia"){
            s = "../assets/svg/regions/lombardia.svg";
          }
          else if (nomeRegione=="Marche"){
            s = "../assets/svg/regions/marche.svg";
          }
          else if (nomeRegione=="Molise"){
            s = "../assets/svg/regions/molise.svg";
          }
          else if (nomeRegione=="Piemonte"){
            s = "../assets/svg/regions/piemonte.svg";
          }
          else if (nomeRegione=="Puglia"){
            s = "../assets/svg/regions/puglia.svg";
          }
          else if (nomeRegione=="Sardegna"){
            s = "../assets/svg/regions/sardegna.svg";
          }
          else if (nomeRegione=="Sicilia"){
            s = "../assets/svg/regions/sicilia.svg";
          }
          else if (nomeRegione=="Toscana"){
            s = "../assets/svg/regions/toscana.svg";
          }
          else if (nomeRegione=="Trentino-Alto Adige"){
            s = "../assets/svg/regions/trentinoAltoAdige.svg";
          }
          else if (nomeRegione=="Umbria"){
            s = "../assets/svg/regions/umbria.svg";
          }
          else if (nomeRegione=="Valle d'Aosta"){
            s = "../assets/svg/regions/valleDAosta.svg";
          }
          else if (nomeRegione=="Veneto"){
            s = "../assets/svg/regions/veneto.svg";
          }
          else if (nomeRegione=="P.A. Bolzano"){
            s = "../assets/svg/regions/bolzano.svg";
          }
          else if (nomeRegione=="P.A. Trento"){
            s = "../assets/svg/regions/trento.svg";
          }
          return s;
    }
}

