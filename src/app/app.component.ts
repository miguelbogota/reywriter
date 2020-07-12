import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private swUpdate: SwUpdate) { }

  ngOnInit(): void {
    this.reloadCache(); // Check for new versions
  }

  // This function check if an update is available and refresh the page
  reloadCache() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        // Message to the user to update
        if (confirm('¡Nueva version disponible de la app! ¿Te gustaría actualizar?')) {
          // Refresh page if there's any update
          window.location.reload();
        }
      });
    }
  }

}
