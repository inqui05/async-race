import './styles.sass';
import { Garage } from './components/garage/garage';
import { Header } from './components/header/header';
import { Winners } from './components/winners/winners';
import { getCarsCount } from './shared/serverRequests';
import { Classes } from './shared/variables';

export class App {
  private readonly header: Header;

  private readonly garage: Garage;

  private readonly winners: Winners;

  constructor(private readonly root: Element) {
    this.header = new Header();
    this.garage = new Garage();
    this.winners = new Winners();

    this.root.append(this.header.element, this.garage.element, this.winners.element);
  }

  async start(): Promise<void> {
    this.garage.renderCars();
    this.winners.fillWinnersInTable();

    window.addEventListener('DOMNodeRemoved', async () => {
      const count = await getCarsCount();
      if (count !== this.garage.getCarCount()) this.garage.renderCars();
    });
  }

  async render(location: string): Promise<void> {
    switch (location) {
      case '':
      case '#/':
        this.winners.element.classList.add(Classes.HIDDEN);
        this.garage.element.classList.remove(Classes.HIDDEN);
        break;
      case '#/winners':
        await this.winners.fillWinnersInTable();
        this.garage.element.classList.add(Classes.HIDDEN);
        this.winners.element.classList.remove(Classes.HIDDEN);
        break;
      default:
        break;
    }
  }
}
