import {Controller} from 'aurelia-templating';
import key from './keymaster';

let patched = false;

export function configure() {
  // Only does monkey patch once.
  if (patched) return;
  patched = true;

  const attached = Controller.prototype.attached;
  const detached = Controller.prototype.detached;

  const defaultKeymasterFilter = key.filter;
  key.filter = () => true; // disable Keymaster's built-in filter

  Controller.prototype.attached = function() {
    // attached() gets called twice but only does things when isAttached is false
    let isAttached = this.isAttached;
    attached.call(this);

    if (!isAttached) {
      eachMethod(this.viewModel, value => {
        value.combo.dispose = key(value.combo.shortcuts, e => {
          if (!value.combo.runInsideInputs && !defaultKeymasterFilter(e)) {
            return;
          }

          const result = value.call(this.viewModel, e);
          // return true to skip preventDefault
          if (result !== true) {
            e.preventDefault && e.preventDefault();
          }
        });
      });
    }
  };

  Controller.prototype.detached = function() {
    // detached() gets called twice but only does things when isAttached is true
    let isAttached = this.isAttached;
    detached.call(this);

    if (isAttached) {
      eachMethod(this.viewModel, value => {
        if (value.combo.dispose) {
          value.combo.dispose();
          delete value.combo.dispose;
        }
      });
    }
  };
}

function eachMethod(obj, callback) {
  const names = Object.getOwnPropertyNames(obj);
  for (const name of names) {
    if (name !== 'constructor') {
      const descriptor = Object.getOwnPropertyDescriptor(obj, name);
      if (descriptor && typeof descriptor.value === 'function' && descriptor.value.combo) {
        callback(descriptor.value);
      }
    }
  }
  const proto = Object.getPrototypeOf(obj);
  if (proto) {
    return eachMethod(proto, callback);
  }
}

export function combo(...shortcuts) {
  if (!shortcuts || !shortcuts.length) return;

  let runInsideInputs = false;
  if (shortcuts.length && typeof shortcuts[shortcuts.length - 1] === 'boolean') {
    runInsideInputs = shortcuts.pop();
  }

  return function(target, _key, descriptor) {
    if (typeof descriptor.value !== 'function') {
      throw new Error('@combo(...) can only decorate a method');
    }

    descriptor.value.combo = {
      shortcuts: shortcuts.join(','),
      runInsideInputs
    };

    return descriptor;
  };
}
