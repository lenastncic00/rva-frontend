import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Status } from 'src/app/models/status';
import { Student } from 'src/app/models/student';
import { StatusService } from 'src/app/services/status.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {

  statusi: Status[];
  public flag: number;
  statusSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StudentDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public  data: Student,
              public studentService: StudentService,
              public statusService: StatusService) { }

  ngOnInit(): void {
    this.statusSubscription=this.statusService.getAllStatusi()
    .subscribe(statusi=>{
      this.statusi=statusi;
    }), (error: Error) => {
      console.log(error.name + ' --> ' + error.message);
      this.snackBar.open('Dogodila se greška. Pokusajte ponovo!', 'Zatvori',
      {duration: 2500});
    };
  }
  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
  }

  compareTo(a,b) {
    return a.id = b.id;
  }

  public add(): void{
    this.studentService.addStudent(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspešno dodat student: ', 'U redu!',
      {duration: 2500});
    }),
    (error: Error) => {
      console.log(error.name + ' --> ' + error.message);
      this.snackBar.open('Dogodila se greška. Pokusajte ponovo!', 'Zatvori!',
      {duration: 2500});
    };
  }

  public update(): void{
    this.studentService.updateStudent(this.data)
    .subscribe(data =>{
      this.snackBar.open('Uspešno modifikovan student: ', 'U redu!',
      {duration: 2500});
    }),
    (error: Error) => {
      console.log(error.name + ' --> ' + error.message);
      this.snackBar.open('Dogodila se greška. Pokusajte ponovo!', 'Zatvori!',
      {duration: 2500});
    };
  }

  public delete(): void {
    this.studentService.deleteStudent(this.data.id)
    .subscribe(() =>{
      this.snackBar.open('Uspešno obrisan student', 'U redu!',
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
