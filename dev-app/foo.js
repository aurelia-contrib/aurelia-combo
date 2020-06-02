/* eslint-disable no-console */
import {noView, bindable} from 'aurelia-framework';
import {combo} from '../src/index';

@noView
export class Foo {
  @bindable action;

  @combo('q')
  hitQ() {
    this.action({log: 'foo q'});
  }
}