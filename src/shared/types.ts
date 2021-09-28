export type CarsOnPage = {
  carOnPage: number | null
};

export type AnimationID = {
  id: number
};

export type Result = {
  id: number,
  expectedRaceTime: number,
};

export type FormValue = {
  classes: string[],
  nameClasses: string[],
  colorClasses: string[],
  buttonClasses: string[],
  disabled: boolean,
  name: string,
};

export type Input = {
  styles: string[],
  type: string,
  disabled?: boolean,
  value?: string
};

export type Button = {
  styles: string[],
  name: string,
  disabled?: boolean,
};

export type Base = {
  inner: string,
};

export type Car = {
  name: string,
  color: string,
  id: number
};

export type PlannedCar = {
  name: string,
  color: string,
};

export type Winner = {
  id: number,
  wins: number,
  time: number
};

export type FixedWinner = {
  wins: number,
  time: number
};

export type CarID = {
  id: number,
};

export type Sort = {
  key: string,
  value: string | number,
};

export type CarSpeed = {
  velocity: number,
  distance: number,
};
