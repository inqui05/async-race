import './form.sass';
import { ButtonComponent } from '../../button-component';
import { InputComponent } from '../../input-component';
import { Colors, InputType } from '../../../shared/variables';
import { FormValue, PlannedCar } from '../../../shared/types';

export class Form {
  readonly element: HTMLFormElement;

  private nameInput: InputComponent;

  private colorInput: InputComponent;

  private readonly button: ButtonComponent;

  constructor(params: FormValue) {
    this.element = document.createElement('form');
    this.element.classList.add(...params.classes);
    this.nameInput = new InputComponent({
      styles: params.nameClasses, type: InputType.TEXT, disabled: params.disabled,
    });
    this.colorInput = new InputComponent({
      styles: params.colorClasses, type: InputType.COLOR, value: Colors.WHITE, disabled: params.disabled,
    });
    this.button = new ButtonComponent({ styles: params.buttonClasses, name: params.name, disabled: true });

    this.nameInput.element.addEventListener('input', () => this.unlockButton());

    this.element.append(this.nameInput.element, this.colorInput.element, this.button.element);
  }

  cleanInputs(blockInput: boolean): void {
    this.colorInput.element.value = Colors.WHITE;
    this.nameInput.element.value = '';
    this.button.element.disabled = blockInput;
    this.nameInput.element.disabled = blockInput;
    this.colorInput.element.disabled = blockInput;
  }

  unlockButton(): void {
    if (this.nameInput.element.value) {
      this.button.element.disabled = false;
    } else {
      this.button.element.disabled = true;
    }
  }

  getCar(): PlannedCar {
    const name = this.nameInput.element.value;
    const color = this.colorInput.element.value;
    return { name, color } as PlannedCar;
  }

  setNameValue(value: string): void {
    this.nameInput.element.value = value;
  }

  setColorValue(value: string): void {
    this.colorInput.element.value = value;
  }
}
