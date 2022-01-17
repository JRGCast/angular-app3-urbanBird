import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { FetchServices } from 'src/services/fetchInAPI.service';
import { Offer } from '../shared/Offer.model';
import { catchError, debounceTime, distinctUntilChanged, observable, Observable, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'urbanBird-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
  providers: [FetchServices]
})
export class TopComponent implements OnInit {
  public foundSearchOffers!: Observable<Offer[]> | any
  private subjectSearch: Subject<string> = new Subject<string>()
  public theSearchedOffers!: Offer[]
  public hiddenUl: boolean = true
  public currDate!: number
  constructor(
    public http: HttpClient,
    private theFetch: FetchServices
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.currDate = Date.now()
    }, 1000)
    this.foundSearchOffers = this.subjectSearch.pipe(
      debounceTime(1000), // aqui é o tempo que será aguardado antes de encaminhar a requisição para o switchMap
      distinctUntilChanged(), // isto evita que seja feita uma nova pesquisa se a anterior tiver o termo idêntico
      switchMap((theInputValue: string): Observable<Offer[]> => {
        if (theInputValue.trim() === '') return of<Offer[]>([]) // se cortando todos os espaços em branco antes ou depois, retorne um array de ofertas vazio. Antigamente o of estava dentro de Observable (Observable.of). Isso evita que o serviço seja contatado, pois, já retorna o array vazio sem realizar o theFetch.getOfferFromSearchBar
        return this.theFetch.getOfferFromSearchBar(theInputValue)
      }),
      catchError((err: any, observ: any) => { console.log(err.message); return observ })
    )
    this.foundSearchOffers.subscribe((theSearchedOffer: Offer[]) => {
      this.theSearchedOffers = theSearchedOffer
    })
    console.log(this.foundSearchOffers)
  }

  /* aprendemos assim:
  public search(event: Event): void {
    console.log((<HTMLInputElement>event.target).value) 
    // porém um jeito mais fácil é utilizar a variável de referência, lá no template, e bastaria recuperar o que viesse, conforme o método abaixo:
  }
*/

  public search(searchInputValue: string): void {
    console.log('encaminhado', searchInputValue, 'para o subjectSearch reencaminhar')
    this.hiddenUl = false
    this.subjectSearch.next(searchInputValue) // veja que aqui reencaminha toda vez, mas, com o debounceTime filtrando, apenas após 1 segundo da última tecla liberada (keyup) é que a última string será rencaminhada para o serviço de fetch no switchMap

    // this.foundSearchOffers = this.theFetch.getOfferFromSearchBar(searchInputValue).subscribe(
    //   {
    //     next: (value: any) => console.log(value),
    //     error: (err: any) => console.log(err.message),
    //     complete: () => console.log('Observable complete!')
    //   }
    // )
  }

  public clearSearch(searchInput: HTMLInputElement): void {
    this.hiddenUl = true
    this.subjectSearch.next('')
    searchInput.value = ''
  }
}
