import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Output() btnclicked: EventEmitter<string> = new EventEmitter<string>();

  onClicked(): void {
    this.btnclicked.emit();
  }
}
