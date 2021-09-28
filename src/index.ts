import './index.html';
import { App } from './app';

window.onload = () => {
  const mainElement = document.querySelector('body');
  if (!mainElement) {
    throw new Error('The element not found!');
  }

  const app = new App(mainElement);
  app.start();

  window.onpopstate = () => {
    const location = window.location.hash;
    if (location) {
      app.render(location);
    }
  };
};
