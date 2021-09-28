import {
  Car, CarSpeed, FixedWinner, PlannedCar, Sort, Winner,
} from './types';
import { BASE_URL, Path } from './variables';

const generateQuery = (queryParameters: Sort[] = []) => (queryParameters.length
  ? `?${queryParameters.map((item) => `${item.key}=${item.value}`).join('&')}` : '');

export const getCarsCount = async (): Promise<number> => {
  const response = await fetch(`${BASE_URL}${Path.garage}?_limit=10`);
  return Number(response.headers.get('X-Total-Count'));
};

export const getCars = async (queryParameters: Sort[]): Promise<Car[]> => {
  const response = await fetch(`${BASE_URL}${Path.garage}${generateQuery(queryParameters)}`);
  const data = await response.json();
  return data;
};

export const getCar = async (id: number): Promise<Car[]> => {
  const response = await fetch(`${BASE_URL}${Path.garage}?id=${id}`);
  const car = await response.json();
  return car;
};

export const createCar = async (car: PlannedCar): Promise<Car> => {
  const response = await fetch(`${BASE_URL}${Path.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const result = await response.json();
  return result;
};

export const updateCar = async (id: number, car: PlannedCar): Promise<Car> => {
  const response = await fetch(`${BASE_URL}${Path.garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  const result = await response.json();
  return result;
};

export const deleteCar = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}${Path.garage}/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result;
};

export const switchEngine = async (id: number, status: string): Promise<CarSpeed> => {
  const response = await fetch(`${BASE_URL}${Path.engine}?id=${id}&status=${status}`);
  const engine = await response.json();
  return engine;
};

export const getWinnersCount = async (): Promise<number> => {
  const response = await fetch(`${BASE_URL}${Path.winners}?_limit=10`);
  return Number(response.headers.get('X-Total-Count'));
};

export const getWinners = async (queryParameters: Sort[]):Promise<Winner[]> => {
  const response = await fetch(`${BASE_URL}${Path.winners}${generateQuery(queryParameters)}`);
  const data = await response.json();
  return data;
};

export const getWinner = async (id: number): Promise<Winner[]> => {
  const response = await fetch(`${BASE_URL}${Path.winners}?id=${id}`);
  const winner = await response.json();
  return winner;
};

export const createWinner = async (winner: Winner): Promise<string> => {
  const response = await fetch(`${BASE_URL}${Path.winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  });
  const result = await response.json();
  return result;
};

export const updateWinner = async (id: number, winner: FixedWinner): Promise<Winner> => {
  const response = await fetch(`${BASE_URL}${Path.winners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  });
  const result = await response.json();
  return result;
};

export const deleteWinner = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}${Path.winners}/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result;
};
