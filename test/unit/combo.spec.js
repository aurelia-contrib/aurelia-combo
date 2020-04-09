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
  document.dispatchEvent(event);
}

function keyup(code) {
  var event = document.createEvent('Event');
  event.initEvent('keyup', true, true);
  event.keyCode = code;
  document.dispatchEvent(event);
}

const nq = createAssertionQueue();

const results = [];

@inlineView('<template></template>')
class ToTest {
  @combo('ctrl+f', 'command+f')
  findIt() {
    results.push('findIt');
  }

  @combo('ctrl+c, command+c')
  copyIt() {
    results.push('copyIt');
  }
}

describe('combo', () => {
  let component;

  afterEach(() => {
    results.length = 0;
    if (component) {
      component.dispose();
      component = null;
    }
  });

  it('responds to keyboard shortcut', done => {
    const model = {show: true};

    component = StageComponent
      .withResources([ToTest])
      .inView(`<to-test if.bind="show"></to-test>`)
      .boundTo(model);

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
        // turn off
        model.show = false;
      });

      nq(() => {
        // ctrl+f
        keydown(KEYS.ctrl); keydown(70, [KEYS.ctrl]); keyup(70); keyup(KEYS.ctrl);
      });

      nq(() => {
        // no more trigger after detached
        expect(results).toEqual(['findIt', 'findIt', 'copyIt']);

        done();
      });
    });
  });
});
