import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-title-section',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './title-section.component.html',
  styleUrl: './title-section.component.css'
})
export class TitleSectionComponent {

}
