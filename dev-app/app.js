/* eslint-disable no-console */
import {combo} from 'resources/index';

export class App {
  constructor() {
    this.message = 'Hello World!';
  }

  @combo('ctrl+f, command+f')
  findIt() {
    console.log('findIt');
  }

  @combo('ctrl+c, command+c')
  copyIt() {
    console.log('copyIt');
  }

  @combo('e')
  editIt() {
    console.log('editIt');
  }

  @combo('ctrl+x')
  cutIt() {
    console.log('cutIt');
  }
}
