/* eslint-disable no-console */
import {combo} from 'resources/index';

export class App {
  constructor() {
    this.message = 'Hello World!';
  }

  @combo('ctrl+f', 'command+f')
  findIt() {
    console.log('findIt');
  }

  @combo('ctrl+c, command+c')
  copyIt() {
    console.log('copyIt');
  }
}
