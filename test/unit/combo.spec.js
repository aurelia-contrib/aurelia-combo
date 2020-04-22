import {createAssertionQueue} from './utils';
import {configure, combo} from 'resources/index';
import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {inlineView} from 'aurelia-framework';

configure(); // monkey patch attached/detached

const modifierMap = {
  16: 'shiftKey',
  18: 'altKey',
  17: 'ctrlKey',
  91: 'metaKey'
};

const KEYS = {
  '⇧': 16, shift: 16,
  '⌥': 18, alt: 18, option: 18,
  '⌃': 17, ctrl: 17, control: 17,
  '⌘': 91, command: 91
};

function keydown(code, modifiers) {
  var event = document.createEvent('Event');
  event.initEvent('keydown', true, true);
  event.keyCode = code;
  if (modifiers && modifiers.length > 0) {
    for (const i in modifiers) event[modifierMap[modifiers[i]]] = true;
  }
  document.activeElement.dispatchEvent(event);
}

function keyup(code) {
  var event = document.createEvent('Event');
  event.initEvent('keyup', true, true);
  event.keyCode = code;
  document.activeElement.dispatchEvent(event);
}

const nq = createAssertionQueue();

const results = [];

@inlineView('<template><button id="btn" click.trigger="clickOnButton()">button</button></template>')
class ToTest {
  @combo('ctrl+f', 'command+f', true)
  findIt() {
    results.push('findIt');
  }

  @combo('ctrl+c, command+c')
  copyIt() {
    results.push('copyIt');
  }

  @combo('enter')
  globalEnter() {
    results.push('globalEnter');
  }

  @combo('space')
  globalSpace() {
    results.push('globalSpace');
  }

  clickOnButton() {
    results.push('clickOnButton');
  }
}

describe('combo', () => {
  let component;
  let model;

  afterEach(() => {
    results.length = 0;
    if (component) {
      component.dispose();
      component = null;
    }
  });

  beforeEach(() => {
    model = {show: true, testInput: null};

    component = StageComponent
      .withResources([ToTest])
      .inView(`
        <to-test if.bind="show"></to-test>
        <input ref="testInput" />
      `)
      .boundTo(model);
  });

  it('responds to keyboard shortcut', done => {
    component.create(bootstrap).then(() => {
      nq(() => {
        expect(results.length).toBe(0);
        keydown(70); keyup(70);
      });

      nq(() => {
        expect(results.length).toBe(0);
        // ctrl+f
        keydown(KEYS.ctrl); keydown(70, [KEYS.ctrl]); keyup(70); keyup(KEYS.ctrl);
      });

      nq(() => {
        expect(results).toEqual(['findIt']);
        // command+f
        keydown(KEYS.command); keydown(70, [KEYS.command]); keyup(70); keyup(KEYS.command);
      });

      nq(() => {
        expect(results).toEqual(['findIt', 'findIt']);
        // command+c
        keydown(KEYS.command); keydown(67, [KEYS.command]); keyup(67); keyup(KEYS.command);
      });

      nq(() => {
        expect(results).toEqual(['findIt', 'findIt', 'copyIt']);
        // focus the test input
        model.testInput.focus();
      });

      nq(() => {
        expect(model.testInput).toBe(document.activeElement);
        // command+c (should not register; input is focused)
        keydown(KEYS.command); keydown(67, [KEYS.command]); keyup(67); keyup(KEYS.command);
      });

      nq(() => {
        expect(results).toEqual(['findIt', 'findIt', 'copyIt']);
        // command+f (should register; runInsideInputs flag is set)
        keydown(KEYS.command); keydown(70, [KEYS.command]); keyup(70); keyup(KEYS.command);
      });

      nq(() => {
        expect(results).toEqual(['findIt', 'findIt', 'copyIt', 'findIt']);
        // turn off
        model.show = false;
      });

      nq(() => {
        // ctrl+f
        keydown(KEYS.ctrl); keydown(70, [KEYS.ctrl]); keyup(70); keyup(KEYS.ctrl);
      });

      nq(() => {
        // no more trigger after detached
        expect(results).toEqual(['findIt', 'findIt', 'copyIt', 'findIt']);
        done();
      });
    });
  });

  // it('responds to keyboard shortcut', done => {
  //   component.create(bootstrap).then(() => {
  //     nq(() => {
  //       expect(results.length).toBe(0);
  //       // enter
  //       keydown(13); keyup(13);
  //     });

  //     nq(() => {
  //       expect(results).toEqual(['globalEnter']);
  //       const btn = document.querySelector('#btn');
  //       btn.focus();
  //       // enter on focused button
  //       keydown(13); keyup(13);
  //     });

  //     nq(() => {
  //       expect(results).toEqual(['globalEnter', 'clickOnButton']);
  //       // space on focused button
  //       keydown(32); keyup(32);
  //     });

  //     nq(() => {
  //       expect(results).toEqual(['globalEnter', 'clickOnButton', 'clickOnButton']);
  //       // blur on button
  //       document.activeElement.blur();
  //       // space
  //       keydown(32); keyup(32);
  //     });

  //     nq(() => {
  //       expect(results).toEqual(['globalEnter', 'clickOnButton', 'clickOnButton', 'globalSpace']);
  //       done();
  //     });
  //   });
  // });
});
