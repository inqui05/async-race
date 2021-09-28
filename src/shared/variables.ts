import finishImage from '../../public/finish.svg';

export const SECOND = 1000;
export const CAR_COLOR = '0123456789ABCDEF';
export const MAX_CAR_IN_PAGE = 7;
export const GENERATE_CAR = 100;
export const MAX_ROW_IN_PAGE = 10;
export const START_CAR_POSITION = '1%';
export const SLOW_DOWN_INDEX = 1.09;
export const FULL_DISTANCE = 82;
export const START_POSITION = 1;
export const BASE_URL = 'http://localhost:3000/';

export const FINISH_IMAGE = `<img src=${finishImage} alt="finish" class="finish">`;
export const WIN_CELL_HTML = 'Wins&nbsp;<span class="arrow">&uarr;</span>';
export const TIME_CELL_HTML = 'Best Time (seconds)&nbsp;<p class="arrow">&uarr;</p>';

export const CAR_PRODUCER = ['Honda', 'Mazda', 'Lexus', 'Nissan', 'Toyota', 'Mitsubishi', 'Infiniti', 'Chevrolet',
  'Ford', 'Tesla', 'Cadillac', 'Hyundai', 'Kia', 'Aston Martin', 'Bentley', 'Jaguar', 'Ferrari', 'Lamborghini',
  'Maserati', 'Audi', 'BMW', 'Mercedes', 'Porsche', 'Volkswagen', 'Renault', 'Peugeot', 'Volvo', 'VAZ'];
export const CAR_MODEL = ['Civic', '6', 'MX-5', 'LC 500', 'GTR', 'Supra', 'Eclipse', 'Q50', 'Camaro', 'Corvette',
  'Mustang', 'Model X', 'Model S', 'CTS-V', 'Genesis', 'Stinger', 'Lagonda', 'DB9', 'Continental GT', 'F-Type',
  '458 Italia', '458 Spider', 'Aventador', 'Huracan', 'Ghibli', 'Gran Turismo', 'R8', 'TT', 'M6', 'i8', 'S65 AMG',
  'AMG GT', '911', 'Cayman GT', 'Scirocco', 'Golf GTI', 'Talisman', '308 R', 'S60', 'S90', 'Kalina Sport'];

export enum Buttons {
  CREATE_BUTTON = 'create',
  RESET_BUTTON = 'reset',
  RACE_BUTTON = 'race',
  UPDATE_BUTTON = 'update',
}

export enum Classes {
  NEXT = 'button__next',
  PREV = 'button__prev',
  HIDDEN = 'hidden',
  CELL_WIN = 'winners__cell_win',
  CELL_TIME = 'winners__cell_time',
  ARROW_HIDDEN = 'arrow__hidden',
  ARROW_INVERSE = 'arrow__inverse',
  MENU_ACTIVE = 'menu__item_active',
  WINNERS_CELL = 'winners__cell',
}

export enum SortWay {
  PAGE = '_page',
  LIMIT = '_limit',
  SORT = '_sort',
  ORDER = '_order',
  ASC = 'ASC',
  DESC = 'DESC',
  TIME = 'time',
  WINS = 'wins',
}

export enum Engine {
  START = 'started',
  DRIVE = 'drive',
  STOP = 'stopped',
}

export enum Colors {
  WHITE = '#ffffff',
}

export enum InputType {
  TEXT = 'text',
  COLOR = 'color',
}

export enum GameControl {
  GARAGE = 'to garage',
  WINNERS = 'to winners',
  GAME_NAME = 'Async-race',
}

export enum Path {
  garage = 'garage',
  engine = 'engine',
  winners = 'winners',
}
