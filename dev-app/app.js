/* eslint-disable no-console */
import {combo} from '../src/index';

export class App {
  enabled = false;
  logs = [];

  afterQ(log) {
    this.logs.push(log);
  }

  @combo('q')
  hitQ() {
    this.logs.push('app q');
  }

  @combo('ctrl+f', 'command+f', true)
  findIt() {
    this.logs.push('findIt');
  }

  @combo('ctrl+c, command+c', true)
  copyIt() {
    this.logs.push('copyIt');
  }

  @combo('e')
  editIt() {
    this.logs.push('editIt');
  }

  @combo('ctrl+x')
  cutIt() {
    this.logs.push('cutIt');
  }

  @combo('enter', true)
  globalEnter() {
    this.logs.push('globalEnter');
  }

  @combo('space')
  globalSpace() {
    this.logs.push('globalSpace');
  }

  resetLogs() {
    this.logs = [];
  }

  clickOnButton() {
    this.logs.push('clickOnButton');
  }

  focusButton() {
    this.btn.focus();
  }
}
