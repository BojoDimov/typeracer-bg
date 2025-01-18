import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import B from './parsed_bible.json';

const bible = <string[]>B;

const MAX_WRONG = 5;

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentSnapshot = '';
  // Count of completed characters
  completed = 0;
  // Count of wrong symbols
  wrong = 0;
  // Count of remaining symbols
  remaining = 0;
  // Index of the current cursor. This is completed + wrong
  cursor = 0;
  input = '';
  startTime?: Date;
  wpm?: number;

  start() {
    this.currentSnapshot = this.snapshot();
    this.input = '';
    this.completed = 0;
    this.wrong = 0;
    this.cursor = 0;
    this.remaining = this.currentSnapshot.length;
    this.startTime = new Date();
  }

  updateProgress(event: Event) {
    let character = (<InputEvent>event).data;
    if (character === null && this.wrong > 0) {
      this.wrong--;
      this.remaining++;
    } else if (character !== null) {
      if (
        this.wrong > 0 ||
        character !== this.currentSnapshot[this.completed]
      ) {
        if (this.wrong < MAX_WRONG) {
          this.wrong++;
          this.remaining--;
        }
      } else {
        this.completed++;
        this.remaining--;
        // Reset input on whole word guessed
        if (character === ' ') {
          this.input = '';
        }
      }
    }

    if (this.startTime) {
      let minutes = (Date.now() - this.startTime.getTime()) / (60 * 1000);
      let words = this.completed / 5;
      this.wpm = Math.round(words / minutes);
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
