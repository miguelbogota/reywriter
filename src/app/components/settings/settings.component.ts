import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(SettingsFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-settings-form',
  templateUrl: 'settings-form.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsFormComponent {

  constructor(
    private fb: FormBuilder
  ) {}

  // Settings form structure
  settingsForm = this.fb.group({
    title: ['', Validators.required],
    about: ['', Validators.required],
    photoUrl: ['', Validators.required],
    coverUrl: ['', Validators.required],
    quote: this.fb.group({
      text: [''],
      author: ['']
    })
  });

  // Submit event for the form
  submit() {
    console.log(this.settingsForm.value);
  }

}

