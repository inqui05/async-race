import './tableRow.sass';
import { returnCarSVG } from '../../../shared/support';
import { BaseComponent } from '../../base-component';
import { Classes } from '../../garage/exports';

export class TableRow extends BaseComponent {
  private readonly numberCell: BaseComponent;

  private readonly colorCell: BaseComponent;

  private readonly nameCell: BaseComponent;

  private readonly countCell: BaseComponent;

  private readonly timeCell: BaseComponent;

  private readonly imageContainer: BaseComponent;

  constructor(number: string, color: string, name: string, winCount: number, bestTime: number) {
    super('tr', ['winners__record']);
    this.numberCell = new BaseComponent('td', [Classes.WINNERS_CELL]);
    this.colorCell = new BaseComponent('td', [Classes.WINNERS_CELL]);
    this.nameCell = new BaseComponent('td', [Classes.WINNERS_CELL]);
    this.countCell = new BaseComponent('td', [Classes.WINNERS_CELL]);
    this.timeCell = new BaseComponent('td', [Classes.WINNERS_CELL]);
    this.imageContainer = new BaseComponent('div', ['table-image']);

    this.numberCell.element.innerHTML = number;
    this.imageContainer.element.innerHTML = `${returnCarSVG(color, 'table-auto')}`;
    this.nameCell.element.innerHTML = name;
    this.countCell.element.innerHTML = String(winCount);
    this.timeCell.element.innerHTML = String(bestTime);

    this.colorCell.element.append(this.imageContainer.element);
    this.element.append(this.numberCell.element, this.colorCell.element, this.nameCell.element, this.countCell.element,
      this.timeCell.element);
  }
}
