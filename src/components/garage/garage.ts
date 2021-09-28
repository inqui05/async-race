import './garage.sass';
import {
  BaseComponent, Form, ButtonComponent, SportCar, createCar, getCar, getCars, getCarsCount,
  updateCar, Storage, addWinnerToServer, generateHundredCars, ChangeCar, Buttons,
  MAX_CAR_IN_PAGE, SECOND, Result, Classes, SortWay, FormValue, Car,
} from './exports';

export class Garage extends BaseComponent {
  private readonly controller: BaseComponent;

  private readonly createForm: Form;

  private readonly changeForm: Form;

  private readonly buttonWrapper: BaseComponent;

  private readonly race: ButtonComponent;

  private readonly reset: ButtonComponent;

  private readonly generate: ButtonComponent;

  private readonly ourGarage: BaseComponent;

  private readonly title: BaseComponent;

  private readonly garage: BaseComponent;

  private readonly ourCars: BaseComponent;

  private readonly pageControll: BaseComponent;

  private readonly prevPage: ButtonComponent;

  private readonly nextPage: ButtonComponent;

  private readonly congratulation: BaseComponent;

  private storage: Storage;

  private form: ChangeCar;

  private carCount = 0;

  private page = 1;

  constructor() {
    super('main', ['garage-wrapper']);
    this.controller = new BaseComponent('div', ['control-wrapper']);
    this.createForm = new Form({
      classes: ['changes', 'add'],
      nameClasses: ['changes__name'],
      colorClasses: ['changes__color'],
      buttonClasses: ['changes__create', 'button'],
      name: 'create',
    } as FormValue);
    this.changeForm = new Form({
      classes: ['changes', 'update'],
      nameClasses: ['changes__name', 'changes__name_grey'],
      colorClasses: ['changes__color', 'changes__color_grey'],
      buttonClasses: ['changes__update', 'button'],
      name: 'update',
      disabled: true,
    } as FormValue);
    this.buttonWrapper = new BaseComponent('div', ['button-wrapper']);
    this.race = new ButtonComponent({ styles: ['button', 'button__aqua'], name: 'race' });
    this.reset = new ButtonComponent({ styles: ['button', 'button__aqua'], name: 'reset' });
    this.generate = new ButtonComponent({ styles: ['button'], name: 'generate cars' });
    this.ourGarage = new BaseComponent('div', ['garage']);
    this.title = new BaseComponent('h2', ['garage__name']);
    this.garage = new BaseComponent('p', ['garage__page']);
    this.ourCars = new BaseComponent('div', ['cars']);
    this.pageControll = new BaseComponent('div', ['page-control']);
    this.prevPage = new ButtonComponent({
      styles: ['button', 'button__grey', 'button__prev'], name: 'prev', disabled: true,
    });
    this.nextPage = new ButtonComponent({
      styles: ['button', 'button__grey', 'button__next'], name: 'next', disabled: true,
    });
    this.congratulation = new BaseComponent('div', ['congratulation', Classes.HIDDEN]);
    this.storage = Storage.getInstance();
    this.form = ChangeCar.getInstance();

    this.pageControll.element.addEventListener('click', (event) => this.changePage(event));
    this.controller.element.addEventListener('click', (event) => this.gameControlButtons(event));
    this.generate.element.addEventListener('click', () => this.addHundredCars());
    this.form.updateInputForm.form = this.changeForm;

    this.buttonWrapper.element.append(this.race.element, this.reset.element, this.generate.element);
    this.controller.element.append(this.createForm.element, this.changeForm.element, this.buttonWrapper.element);
    this.ourGarage.element.append(this.title.element, this.garage.element, this.ourCars.element);
    this.pageControll.element.append(this.prevPage.element, this.nextPage.element);
    this.ourGarage.element.append(this.pageControll.element);
    this.element.append(this.controller.element, this.ourGarage.element);
  }

  async changePage(event: Event): Promise<void> {
    const target = event.target as HTMLElement;

    this.resetCarsEngine();
    this.race.element.disabled = false;

    if (target.classList.contains(Classes.NEXT)) {
      this.blockNavButtons();

      this.page++;
      this.changeForm.cleanInputs(true);
      await this.renderCars();
    } else if (target.classList.contains(Classes.PREV)) {
      this.blockNavButtons();

      this.page--;
      this.changeForm.cleanInputs(true);
      await this.renderCars();
    }
  }

  async renderCars(): Promise<void> {
    this.storage.cars = new Set();
    await this.updateCarCount();

    this.ourCars.element.innerHTML = '';
    this.garage.element.innerHTML = `Page #${this.page}`;

    if (this.carCount) {
      const cars = await getCars([{ key: SortWay.PAGE, value: this.page },
        { key: SortWay.LIMIT, value: MAX_CAR_IN_PAGE }, { key: SortWay.SORT, value: SortWay.TIME },
        { key: SortWay.ORDER, value: SortWay.ASC }]);
      this.storage.data.carOnPage = cars.length;

      cars.forEach((item) => {
        const newCar = new SportCar(+item.id, item.name, item.color);
        this.storage.cars.add(newCar);
        this.ourCars.element.append(newCar.element);
      });
    }
    this.disableNavButtons();
  }

  async addHundredCars(): Promise<void> {
    this.generate.element.disabled = true;

    const cars = generateHundredCars();
    const promises: Promise<Car>[] = [];

    cars.forEach((item) => promises.push(createCar(item)));
    await Promise.all(promises);

    this.renderCars();
    this.generate.element.disabled = false;
  }

  gameControlButtons(event: Event): void {
    const target = <HTMLElement>event.target;
    if (target.tagName === 'BUTTON') {
      event.preventDefault();

      if (target.innerHTML === Buttons.CREATE_BUTTON) {
        this.createCar();
      } else if (target.innerHTML === Buttons.RESET_BUTTON) {
        this.resetCarsEngine();
      } else if (target.innerHTML === Buttons.RACE_BUTTON) {
        this.racing();
      } else if (target.innerHTML === Buttons.UPDATE_BUTTON) {
        this.sendCarChangesToServer();
      }
    }
  }

  async sendCarChangesToServer(): Promise<void> {
    const car = this.changeForm.getCar();
    const carID = this.form.carsID.id;

    await updateCar(carID, car);

    this.changeForm.cleanInputs(true);
    this.renderCars();
  }

  async racing(): Promise<void> {
    this.blockButtonsDuringRace();

    const promises: Promise<Result>[] = [];
    const indexes: Array<number> = [];

    this.storage.cars.forEach((item) => {
      promises.push(item.startRacing());
      indexes.push(item.getID());
    });

    const result = await this.findTheWinner(promises, indexes) as Result;
    addWinnerToServer(result);
    this.showTheWinner(result);

    await Promise.all(promises);
    this.unBlockButtonsAfterRace();
  }

  async showTheWinner(winner: Result): Promise<void> {
    const car = await getCar(winner.id);
    const greetingText = `${car[0].name} went first in ${(winner.expectedRaceTime / SECOND).toFixed(2)}s!`;
    this.congratulation.element.classList.remove(Classes.HIDDEN);
    this.congratulation.element.innerHTML = greetingText;

    this.garage.element.append(this.congratulation.element);
  }

  async findTheWinner(promises: Promise<Result>[], indexes: Array<number>): Promise<Result> {
    let result = await Promise.race(promises);
    if (promises.length === 1) return result;

    if (result.expectedRaceTime === 0) {
      let failedСarIndex: number;
      indexes.forEach((item, index) => {
        if (item === result.id) {
          failedСarIndex = index;
          promises.splice(failedСarIndex, 1);
          indexes.splice(failedСarIndex, 1);
        }
      });
      if (promises.length !== 0) result = await this.findTheWinner(promises, indexes);
    }
    return result;
  }

  async createCar(): Promise<void> {
    const car = this.createForm.getCar();
    this.createForm.cleanInputs(false);

    const request = await createCar(car);

    if (this.storage.data.carOnPage !== MAX_CAR_IN_PAGE) {
      const newCar = new SportCar(+request.id, request.name, request.color);
      this.storage.cars.add(newCar);
      this.ourCars.element.append(newCar.element);

      let carCountOnPage = this.storage.data.carOnPage;
      if (carCountOnPage) carCountOnPage++;
      this.storage.data.carOnPage = carCountOnPage;
    }
    await this.updateCarCount();
    this.disableNavButtons();
  }

  async updateCarCount(): Promise<void> {
    const count = await getCarsCount();
    this.carCount = count;
    if (count % MAX_CAR_IN_PAGE === 0 && this.page !== 1 && count / MAX_CAR_IN_PAGE !== this.page) this.page--;

    this.title.element.innerHTML = `Garage (${this.carCount})`;
  }

  async resetCarsEngine(): Promise<void> {
    this.congratulation.element.classList.add(Classes.HIDDEN);
    this.race.element.disabled = true;

    const promises:Array<Promise<void>> = [];
    this.storage.cars.forEach((item) => {
      promises.push(item.stopRacing());
    });

    await Promise.all(promises);

    this.race.element.disabled = false;
  }

  blockButtonsDuringRace(): void {
    this.race.element.disabled = true;
    this.prevPage.element.disabled = true;
    this.nextPage.element.disabled = true;
    this.generate.element.disabled = true;
    this.storage.cars.forEach((item) => item.blockControllButtons());
  }

  unBlockButtonsAfterRace(): void {
    this.race.element.disabled = true;
    this.generate.element.disabled = false;
    this.disableNavButtons();
    this.storage.cars.forEach((item) => item.unBlockControllButtons());
  }

  disableNavButtons(): void {
    this.prevPage.element.disabled = !(this.page > 1);
    this.nextPage.element.disabled = !(((this.page) * MAX_CAR_IN_PAGE) < this.carCount);
  }

  blockNavButtons(): void {
    this.prevPage.element.disabled = true;
    this.nextPage.element.disabled = true;
  }

  getCarCount(): number {
    return this.carCount;
  }
}
