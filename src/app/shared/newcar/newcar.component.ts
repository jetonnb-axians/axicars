import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-newcar',
  imports: [RouterModule],
  templateUrl: './newcar.component.html',
  styleUrl: './newcar.component.scss'
})
export class NewcarComponent {
    closeModal(arg0: boolean) {
      console.log('what is this?: ',arg0)
    }
}
