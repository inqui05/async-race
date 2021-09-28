import './sportcar.sass';
import {
  BaseComponent, ButtonComponent, ChangeCar, animation, deleteCar, deleteWinner, getWinner, switchEngine, returnCarSVG,
  Engine, FINISH_IMAGE, SLOW_DOWN_INDEX, START_CAR_POSITION, Result,
} from './exports';

export class SportCar extends BaseComponent {
  private readonly carControl: BaseComponent;

  private readonly select: ButtonComponent;

  private readonly remove: ButtonComponent;

  private readonly carName: BaseComponent;

  private readonly movement: BaseComponent;

  private readonly engineControl: BaseComponent;

  private readonly go: ButtonComponent;

  private readonly stop: ButtonComponent;

  private readonly carContainer: BaseComponent;

  private readonly carView: BaseComponent;

  private readonly finish: BaseComponent;

  private form: ChangeCar;

  private carID: number;

  private color: string;

  private animationID : Record<string, number>;

  constructor(id: number, carName: string, color: string) {
    super('div', ['car']);
    this.carControl = new BaseComponent('div', ['car-control']);
    this.select = new ButtonComponent({ styles: ['button', 'button__select'], name: 'select' });
    this.remove = new ButtonComponent({ styles: ['button', 'button__remove'], name: 'remove' });
    this.carName = new BaseComponent('p', ['car__model'], { inner: carName });
    this.movement = new BaseComponent('div', ['car__movement']);
    this.engineControl = new BaseComponent('div', ['car__engine-control']);
    this.go = new ButtonComponent({ styles: ['button', 'button__gold', 'button__go'], name: 'g' });
    this.stop = new ButtonComponent({ styles: ['button', 'button__gold', 'button__stop'], name: 's', disabled: true });
    this.carContainer = new BaseComponent('div', ['car-container']);
    this.carView = new BaseComponent('div', ['car__view'], { inner: returnCarSVG(color) });
    this.finish = new BaseComponent('div', ['car__finish'], { inner: FINISH_IMAGE });
    this.form = ChangeCar.getInstance();
    this.carID = id;
    this.color = color;
    this.animationID = { id: 0 };

    this.go.element.addEventListener('click', () => this.startRacing());
    this.stop.element.addEventListener('click', () => this.stopRacing());
    this.remove.element.addEventListener('click', () => this.removeCar());
    this.select.element.addEventListener('click', () => this.sendCarInformationToInputs());

    this.carControl.element.append(this.select.element, this.remove.element, this.carName.element);
    this.engineControl.element.append(this.go.element, this.stop.element);
    this.carContainer.element.append(this.carView.element, this.finish.element);
    this.movement.element.append(this.engineControl.element, this.carContainer.element);
    this.element.append(this.carControl.element, this.movement.element);
  }

  async startRacing(id: number = this.carID): Promise<Result> {
    this.go.element.disabled = true;

    const speed = await switchEngine(id, Engine.START);
    let expectedRaceTime = speed.distance / speed.velocity;
    const timeToStop = expectedRaceTime * SLOW_DOWN_INDEX;

    this.animationID = animation(this.carView, timeToStop);
    this.stop.element.disabled = false;

    const result = switchEngine(id, Engine.DRIVE);
    await result.catch(() => {
      window.cancelAnimationFrame(this.animationID.id);
      expectedRaceTime = 0;
      return { id, expectedRaceTime };
    });
    return { id, expectedRaceTime };
  }

  async stopRacing(id: number = this.carID): Promise<void> {
    window.cancelAnimationFrame(this.animationID.id);
    await switchEngine(id, Engine.STOP);
    this.carView.element.style.left = START_CAR_POSITION;

    this.go.element.disabled = false;
    this.stop.element.disabled = true;
  }

  async removeCar(id: number = this.carID): Promise<void> {
    const winnerExist = await getWinner(id);
    if (winnerExist.length !== 0) deleteWinner(id);
    await deleteCar(id);

    this.element.remove();
  }

  sendCarInformationToInputs(): void {
    const { form } = this.form.updateInputForm;
    this.form.carsID.id = this.carID;
    if (form) {
      form.cleanInputs(false);
      form.setColorValue(this.color);
      form.setNameValue(this.carName.element.innerHTML);
    }
  }

  getCar(): number {
    return this.carID;
  }

  getID(): number {
    return this.carID;
  }

  blockControllButtons(): void {
    this.select.element.disabled = true;
    this.remove.element.disabled = true;
    this.stop.element.disabled = true;
  }

  unBlockControllButtons(): void {
    this.select.element.disabled = false;
    this.remove.element.disabled = false;
    this.stop.element.disabled = false;
  }

  changeCar(color: string, name: string): void {
    this.carName.element.innerHTML = name;
    this.carView.element.innerHTML = returnCarSVG(color);
  }
}
