import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import B from './parsed_bible.json';

const bible = <string[]>B;

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentSnapshot = '';
  completed = '';
  remaining = '';
  input = '';

  start() {
    this.currentSnapshot = this.snapshot();
    this.input = '';
    this.completed = '';
    this.remaining = this.currentSnapshot;
  }

  updateProgress(event: Event) {
    console.log(event);
    let character = (<InputEvent>event).data;

    if (this.currentSnapshot[this.completed.length] === character) {
      this.completed += character;
      this.remaining = this.currentSnapshot.slice(this.completed.length);
    }

    if (character === null) {
      this.input = this.input.slice(0, -1);
    } else {
      this.input += character;
    }

    if (character === ' ') {
      this.input = '';
    }
  }

  private snapshot() {
    let length = Math.random() * (5 - 5) + 5;
    let offset = getRandomInRange(0, bible.length - length);

    return bible
      .slice(offset, offset + length)
      .map((s) => s.replaceAll(/\d+\./gm, '').trim())
      .join(' ');
  }
}

function getRandomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
