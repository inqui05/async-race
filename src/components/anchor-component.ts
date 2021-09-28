export class AnchorComponent {
  readonly element: HTMLAnchorElement;

  constructor(styles: string[] = [], href: string) {
    this.element = document.createElement('a');
    this.element.classList.add(...styles);
    this.element.href = href;
  }
}
