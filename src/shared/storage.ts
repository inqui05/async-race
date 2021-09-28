import { SportCar } from '../components/garage/sportcar/sportcar';
import { CarsOnPage } from './types';

export class Storage {
  private static instance: Storage;

  public data: CarsOnPage = {
    carOnPage: 0,
  };

  public cars: Set<SportCar> = new Set();

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }

    return Storage.instance;
  }
}
