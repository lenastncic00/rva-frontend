import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Departman } from 'src/app/models/departman';
import { Fakultet } from 'src/app/models/fakultet';
import { FakultetService } from 'src/app/services/fakultet.service';
import { DepartmanService } from 'src/app/services/departman.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-departman-dialog',
  templateUrl: './departman-dialog.component.html',
  styleUrls: ['./departman-dialog.component.css']
})
export class DepartmanDialogComponent implements OnInit {

  fakulteti: Fakultet[];

  public flag: number;

  fakultetSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef< DepartmanDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public  data: Departman,
    public departmanService: DepartmanService,
    public fakultetService: FakultetService) { }
 
  ngOnInit(): void {
    this.fakultetSubscription=this.fakultetService.getAllFakulteti()
    .subscribe(fakulteti =>{
      this.fakulteti=fakulteti;
    }),
    (error: Error) => {
      console.log(error.name + ' --> ' + error.message);
    };
  }

  ngOnDestroy(): void {
    this.fakultetSubscription.unsubscribe();
  }

  compareTo(a,b) {
    return a.id = b.id;
  }

  public add(): void{
    this.departmanService.addDepartman(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspešno dodat departman: ' + this.data.naziv, 'U redu!',
      {duration: 2500});
    }),
    (error: Error) => {
      console.log(error.name + ' --> ' + error.message);
      this.snackBar.open('Dogodila se greška. Pokusajte ponovo!', 'Zatvori!',
      {duration: 2500});
    };
  }


  public update(): void{
    this.departmanService.updateDepartman(this.data)
    .subscribe(data =>{
      this.snackBar.open('Uspešno modifikovan departman: ' + this.data.naziv, 'U redu!',
      {duration: 2500});
    }),
    (error: Error) => {
      console.log(error.name + ' --> ' + error.message);
      this.snackBar.open('Dogodila se greška. Pokusajte ponovo!', 'Zatvori!',
      {duration: 2500});
    };
  }

  public delete(): void {
    this.departmanService.deleteDepartman(this.data.id)
    .subscribe(() =>{
      this.snackBar.open('Uspešno obrisan departman', 'U redu!',
      {duration: 2500});
    }),
    (error: Error) => {
      console.log(error.name + ' --> ' + error.message);
      this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori!',
      {duration: 2500});
    };

  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od ove aktivnosti', 'U redu',
    {duration: 1000});
  }



}
