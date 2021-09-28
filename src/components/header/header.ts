import './header.sass';
import { BaseComponent } from '../base-component';
import { AnchorComponent } from '../anchor-component';
import { Classes, GameControl } from '../garage/exports';

export class Header extends BaseComponent {
  private readonly menu: BaseComponent;

  private readonly menuList: BaseComponent;

  private readonly garageItem: BaseComponent;

  private readonly winnersItem: BaseComponent;

  private readonly garageAnchor: AnchorComponent;

  private readonly winnersAnchor: AnchorComponent;

  private readonly title: BaseComponent;

  constructor() {
    super('header', ['header']);
    this.menu = new BaseComponent('nav', ['menu']);
    this.menuList = new BaseComponent('ul', ['menu__list']);
    this.garageItem = new BaseComponent('li', ['menu__item', Classes.MENU_ACTIVE]);
    this.winnersItem = new BaseComponent('li', ['menu__item']);
    this.garageAnchor = new AnchorComponent(['menu__link'], '#/');
    this.winnersAnchor = new AnchorComponent(['menu__link'], '#/winners');
    this.title = new BaseComponent('h1', ['game-name']);

    this.garageAnchor.element.innerHTML = GameControl.GARAGE;
    this.winnersAnchor.element.innerHTML = GameControl.WINNERS;
    this.title.element.innerHTML = GameControl.GAME_NAME;
    [this.garageItem, this.winnersItem].forEach((item) => item.element.addEventListener('click', () => {
      this.switchActiveItem(item);
    }));

    this.garageItem.element.append(this.garageAnchor.element);
    this.winnersItem.element.append(this.winnersAnchor.element);
    this.menuList.element.append(this.garageItem.element, this.winnersItem.element);
    this.menu.element.append(this.menuList.element);
    this.element.append(this.menu.element, this.title.element);
  }

  switchActiveItem(item: BaseComponent):void {
    [this.garageItem, this.winnersItem].forEach((elem) => elem.element.classList.remove(Classes.MENU_ACTIVE));
    item.element.classList.add(Classes.MENU_ACTIVE);
  }
}
