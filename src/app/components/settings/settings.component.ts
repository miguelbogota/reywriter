import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

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
    this.dialog.open(SettingsFormComponent);
  }
}

@Component({
  selector: 'app-settings-form',
  templateUrl: 'settings-form.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsFormComponent implements OnInit {

  settingsForm: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private dialogRef: MatDialogRef<SettingsFormComponent>
  ) { }

  ngOnInit(): void {
    this.auth.getData().subscribe(u => {
      // Settings form structure
      this.settingsForm = this.fb.group({
        title: [u.title, Validators.required],
        about: [u.about, Validators.required],
        photoUrl: [u.photoUrl, Validators.required],
        coverUrl: [u.coverUrl],
        quote: this.fb.group({
          text: [u.quote?.text],
          author: [u.quote?.author]
        })
      });
      this.loading = false;
    });
  }

  // Submit event for the form
  submit() {
    if (!this.settingsForm.invalid) {
      this.auth.setData(this.settingsForm.value);
      this.dialogRef.close();
    }
  }

}

