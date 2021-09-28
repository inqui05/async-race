import { Base } from '../shared/types';

export class BaseComponent {
  readonly element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = [], params: Base = { inner: '' }) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.element.innerHTML = params.inner;
  }
}
