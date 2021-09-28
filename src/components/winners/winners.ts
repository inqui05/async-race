import './winners.sass';
import {
  BaseComponent, ButtonComponent, TableRow, getCar, getWinnersCount, getWinnerList, MAX_ROW_IN_PAGE, SortWay,
  TIME_CELL_HTML, WIN_CELL_HTML, Classes,
} from './exports';

export class Winners extends BaseComponent {
  private readonly title: BaseComponent;

  private readonly page: BaseComponent;

  private readonly table: BaseComponent;

  private readonly tableHeader: BaseComponent;

  private readonly numberCell: BaseComponent;

  private readonly colorCell: BaseComponent;

  private readonly nameCell: BaseComponent;

  private readonly countCell: BaseComponent;

  private readonly timeCell: BaseComponent;

  private readonly pageControll: BaseComponent;

  private readonly prevPage: ButtonComponent;

  private readonly nextPage: ButtonComponent;

  private pageNumber = 1;

  private winnerCount = 0;

  constructor() {
    super('main', ['winners-wrapper', 'hidden']);
    this.title = new BaseComponent('h2', ['winners__name']);
    this.page = new BaseComponent('p', ['winners__page']);
    this.table = new BaseComponent('table', ['winners']);
    this.tableHeader = new BaseComponent('tr', ['winners__head']);
    this.numberCell = new BaseComponent('th', [Classes.WINNERS_CELL], { inner: 'Number' });
    this.colorCell = new BaseComponent('th', [Classes.WINNERS_CELL], { inner: 'Car' });
    this.nameCell = new BaseComponent('th', [Classes.WINNERS_CELL], { inner: 'Name' });
    this.countCell = new BaseComponent('th', [Classes.WINNERS_CELL, Classes.CELL_WIN, Classes.ARROW_HIDDEN],
      { inner: WIN_CELL_HTML });
    this.timeCell = new BaseComponent('th', [Classes.WINNERS_CELL, Classes.CELL_TIME], { inner: TIME_CELL_HTML });
    this.pageControll = new BaseComponent('div', ['page-control']);
    this.prevPage = new ButtonComponent({
      styles: ['button', 'button__grey', Classes.PREV], name: 'prev', disabled: true,
    });
    this.nextPage = new ButtonComponent({
      styles: ['button', 'button__grey', Classes.NEXT], name: 'next', disabled: true,
    });

    this.pageControll.element.addEventListener('click', (event) => this.changePage(event));
    this.tableHeader.element.addEventListener('click', (event) => this.sortTable(event));

    this.pageControll.element.append(this.prevPage.element, this.nextPage.element);
    this.tableHeader.element.append(this.numberCell.element, this.colorCell.element, this.nameCell.element,
      this.countCell.element, this.timeCell.element);
    this.table.element.append(this.tableHeader.element);
    this.element.append(this.title.element, this.page.element, this.table.element, this.pageControll.element);
  }

  sortTable(event: Event): void {
    const target = event.target as HTMLElement;
    let element: BaseComponent;

    if (target.classList.contains(Classes.CELL_WIN)) element = this.countCell;
    else if (target.classList.contains(Classes.CELL_TIME)) element = this.timeCell;
    else return;

    if (target.classList.contains(Classes.ARROW_HIDDEN)) {
      this.callRendering(element, SortWay.ASC);
      target.classList.remove(Classes.ARROW_HIDDEN);
      this.removeClasses(element);
    } else if (target.classList.contains(Classes.ARROW_INVERSE)) {
      this.callRendering(element, SortWay.ASC);
      target.classList.remove(Classes.ARROW_INVERSE);
      this.removeClasses(element);
    } else if (!target.classList.contains(Classes.ARROW_HIDDEN) && !target.classList.contains(Classes.ARROW_INVERSE)) {
      this.callRendering(element, SortWay.DESC);
      target.classList.add(Classes.ARROW_INVERSE);
      this.removeClasses(element);
    }
  }

  removeClasses(element: BaseComponent): void {
    if (element === this.countCell) {
      this.timeCell.element.classList.remove(Classes.ARROW_INVERSE);
      this.timeCell.element.classList.add(Classes.ARROW_HIDDEN);
    } else {
      this.countCell.element.classList.remove(Classes.ARROW_INVERSE);
      this.countCell.element.classList.add(Classes.ARROW_HIDDEN);
    }
  }

  callRendering(element: BaseComponent, order: SortWay): void {
    const sort = element === this.countCell ? SortWay.WINS : SortWay.TIME;
    this.fillWinnersInTable(this.pageNumber, sort, order);
  }

  changePage(event: Event): void {
    if ((<HTMLElement>event.target).classList.contains(Classes.NEXT)) {
      this.pageNumber++;
      this.fillWinnersInTable();
    } else if ((<HTMLElement>event.target).classList.contains(Classes.PREV)) {
      this.pageNumber--;
      this.fillWinnersInTable();
    }
  }

  async fillWinnersInTable(page = this.pageNumber, sort = SortWay.TIME, order = SortWay.ASC): Promise<void> {
    this.table.element.innerHTML = '';
    this.table.element.append(this.tableHeader.element);

    const rows: Array<TableRow> = [];
    const count = await getWinnersCount();
    this.winnerCount = count;

    this.title.element.innerHTML = `Winners (${this.winnerCount})`;
    this.page.element.innerHTML = `Page #${this.pageNumber}`;

    if (this.winnerCount) {
      const winners = await getWinnerList(page, sort, order);
      winners.forEach((item, index) => {
        const currentCar = getCar(item.id);
        currentCar.then((resolve) => {
          const car = resolve[0];
          const number = String((this.pageNumber - 1) * MAX_ROW_IN_PAGE + index + 1);
          const newWinner = new TableRow(number, car.color, car.name, item.wins, item.time);

          rows.push(newWinner);
          this.appendElementsToPage(rows);
        });
      });
    }
    this.disableNavButtons();
  }

  appendElementsToPage(rows: Array<TableRow>): void {
    this.table.element.append(rows[0].element);
    rows.splice(0, 1);
    if (rows.length === 0) return;
    this.appendElementsToPage(rows);
  }

  disableNavButtons(): void {
    this.prevPage.element.disabled = !(this.pageNumber > 1);
    this.nextPage.element.disabled = !(((this.pageNumber) * MAX_ROW_IN_PAGE) < this.winnerCount);
  }

  getWinnerCount(): number {
    return this.winnerCount;
  }
}
