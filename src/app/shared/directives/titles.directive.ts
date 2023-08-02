import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTitles]'
})
export class TitlesDirective implements OnChanges {

  @Input()
  appTitles = '';

  constructor( private elementRef:ElementRef, private renderer2:Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
      this.titleFontSize();
  }

  titleFontSize(): void {
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'font-size',
      this.appTitles ? this.appTitles : this.appTitles = '30px'
    )
  }

}
