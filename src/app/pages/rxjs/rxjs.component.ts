import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, map, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 

    // this.retornObservable().pipe(
    //   retry(1)
    // ).subscribe( 
    //   valor => console.log('Subs',valor),
    //   err => console.warn('Error:', err),
    //   () => console.info('Observable terminado')
    // );

   this.intervalSubs = this.retornarItntervalo().subscribe(console.log);

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.intervalSubs.unsubscribe();
  }

  retornarItntervalo(): Observable<number>{

    return interval(100).pipe(
      //take( 10 ),
      map( valor => valor + 1 ),
      filter( valor => ( valor % 2 === 0) ? true : false)
    );

  }

  retornObservable(){
    let i = -1;

    const obs$ = new Observable<number>( observer => {

     const intervalo = setInterval( () => {
       
        i++;
        observer.next(i);

        if( i === 7 ){
          clearInterval( intervalo );
          observer.complete();
        }

        // if( i == 3 ){
        //   i = 0;
        //   observer.error('i llego a 3');
        // }

      },1000);

    });

    return obs$;
  }

}
