import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild("editor")
  editor!: ElementRef<HTMLInputElement>;

  title: string | undefined = 'app';

  updateTitle(): void {
    this.title = this.editor.nativeElement.value;
  }
}
