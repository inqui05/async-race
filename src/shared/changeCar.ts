import { Form } from '../components/garage/form/form';
import { CarID } from './types';

export class ChangeCar {
  private static instance: ChangeCar;

  public updateInputForm: Record<string, Form | null> = {
    form: null,
  };

  public carsID: CarID = {
    id: 0,
  };

  public static getInstance(): ChangeCar {
    if (!ChangeCar.instance) {
      ChangeCar.instance = new ChangeCar();
    }

    return ChangeCar.instance;
  }
}
