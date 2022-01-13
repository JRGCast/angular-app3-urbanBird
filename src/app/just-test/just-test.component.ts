import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchServices } from 'src/services/fetchInAPI.service';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../shared/Offer.model';
import { Observable, interval, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'urbanBird-just-test',
  templateUrl: './just-test.component.html',
  styleUrls: ['./just-test.component.scss'],
  providers: [FetchServices]
})
export class JustTestComponent implements OnInit, OnDestroy {

  public theTempo!: Subscription
  // por quê currOffer diretamente no constructor dá pala?
  constructor(
    // public currOffer!: Offer // aqui dá pala
    private theRoute: ActivatedRoute,
    private theOfficeService: FetchServices,
  ) { }

  ngOnInit(): void {
    /* apenas para mostrar como funciona o observable:
     aqui o subscribe ficará 'assistindo' a URL por mudanças
    this.theRoute.params.subscribe({
      next: (v) => console.log(v),
      error: (e) => console.log(e),
      complete: () => console.log('completed')
    })
    */
    /* o objeto Observable vem da biblioteca rxJS, baixada junto com o Angular, e possui diversos atributos,
    como por exemplo o interval (que nas versões mais antigas eram parte do objeto Observable [Observable.interval], agora é um Observable sozinho já emite o intervalo de um observable), que retorna, infinitamente (ou se definir um completed), um incremento de número inteiro de acordo com o intervalo*/

    this.theTempo = interval(500).subscribe({ // a partir do subscribe, ele sai do tipo Observer e se torna do tipo Subscription
      next: (intervalo: any) => console.log(intervalo),
      error: (error: any) => console.log(error),
      complete: () => console.log('Completado')
    })
    // pode-se fazer o console diretamente, sem abrir o objeto com next, error e completed
    // perceba o memory leak que ocorre ao sair do OfferComponent na aplicação (continua imprimindo os consoles), bem como ao retornar (faz uma nova impressão de consoles.)
    // para que esse problema cesse, é necessário fazer o unsubscribe ao sair do componente, com o ngDestroy

    // agora para entendermos bem sobre o objetos observáveis e observadores:
    // criemos o objeto observável (antigamente era Observable.create(), agora é new Observable();)
    let theObservable = new Observable((observableObj: Observer<number>) => {
      // observableObj.next('Repassando a primeira vez') // um pouco contraintuitivo, mas o objeto aqui é o que será repassado para o observador, por isso o tipo observer
      // observableObj.next('Repassando 2a vez')
      // mudando o tipo do next emitido aqui, será necessário mudar o tipo do observableObj para Observer<number>, bem como o recebido no subscribe
      observableObj.next(55)
      observableObj.next(8000)
      // observableObj.error('Foi encontrado um erro na stream') // veja que erros já não interferem no tipo a ser enviado, e isso faz com que a cadeia de eventos do observable seja encerrada, de maneira semelhante ao complete:
      observableObj.complete() // não recebe parâmetros
      // perceba que o observable seguinte não é enviado nem com o error nem com o complete:
      observableObj.next(90909090)

    })

    // e o observador nada mais é que a próxima 'cadeia de funções', que 'captura' a ação do observável
    theObservable.subscribe(
      // (result: number) => console.log(result * 2), // caso queira somente o next, esta forma é possível, o next daquele observável é lido aqui, lembrando que 3 parâmetros no subscribe foi deprecado, sendo correta a forma abaixo: 
      {
        next: (result: number) => console.log(result * 2), // o next daquele observável é lido aqui
        error: (e: string) => console.log(e),
        complete: () => console.log('Completed')
      }

    )
  }
  ngOnDestroy(): void {
    this.theTempo.unsubscribe() // pronto, com isso o componente para o subscribe
  }
}