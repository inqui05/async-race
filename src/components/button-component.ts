import { Button } from '../shared/types';

export class ButtonComponent {
  readonly element: HTMLButtonElement;

  constructor(params: Button) {
    this.element = document.createElement('button');
    this.element.classList.add(...params.styles);
    this.element.innerHTML = params.name;
    if (params.disabled) this.element.disabled = params.disabled;
  }
}
