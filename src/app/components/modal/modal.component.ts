import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(ModalContentComponent);
  }

}

@Component({
  selector: 'app-modal-content',
  templateUrl: 'modal.content.html',
})
export class ModalContentComponent {
  constructor(private dialogRef: MatDialogRef<ModalContentComponent>) { }
  public close() {
    this.dialogRef.close();
  }
}
