import { Input } from '../shared/types';

export class InputComponent {
  readonly element: HTMLInputElement;

  constructor(params: Input) {
    this.element = document.createElement('input');
    this.element.classList.add(...params.styles);
    this.element.type = params.type;
    if (params.value) this.element.value = params.value;
    if (params.disabled) this.element.disabled = params.disabled;
  }
}
