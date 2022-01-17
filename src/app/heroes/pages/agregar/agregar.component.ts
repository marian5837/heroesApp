import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_image: ''
  }

  constructor(private heroeService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    if(!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroeService.getHeroePorId(id))
    )
    .subscribe(
      heroe => this.heroe = heroe
    );
  }

  guardar() {
    if (this.heroe.superhero.trim().length===0) {
      return;
    }

    if(this.heroe.id) {
      //Actualizar
      console.log('Actualizar');
      this.heroeService.actualizarHeroe(this.heroe).subscribe(
        heroe => this.mostrarSnackbar('Registro Actualizado')
      );
    } else {
      console.log('Agregar');
      this.heroeService.agregarHeroe(this.heroe).subscribe(
        heroe => {
          this.router.navigate(['/heroes/editar/', heroe.id]),
          this.mostrarSnackbar('Registro Agregado')
      }

      );
    }
  }
  
  eliminar() {

    const dialogRef = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialogRef.afterClosed().subscribe(
      (result) => 
      {console.log('result',result)
        if (result) {
          this.heroeService.eliminarHeroe(this.heroe.id!).subscribe(
          resp => this.router.navigate(['/heroes'])
          );
        }
      }
    );
  }

  mostrarSnackbar(mensaje: string){
    this._snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }
}
