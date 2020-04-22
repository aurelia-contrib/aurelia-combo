/* eslint-disable no-console */
import {combo} from 'resources/index';

export class App {
  constructor() {
    this.message = 'Hello World!';
  }

  @combo('ctrl+f', 'command+f', true)
  findIt() {
    console.log('findIt');
  }

  @combo('ctrl+c, command+c', true)
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

  @combo('enter')
  globalEnter() {
    console.log('globalEnter');
  }

  @combo('space')
  globalSpace() {
    console.log('globalSpace');
  }

  clickOnButton() {
    console.log('clickOnButton');
  }

  focusButton() {
    this.btn.focus();
  }
}
