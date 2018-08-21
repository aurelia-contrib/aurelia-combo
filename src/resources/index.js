import {Controller} from 'aurelia-templating';
import key from 'keymaster';

export function configure() {
  const attached = Controller.prototype.attached;
  const detached = Controller.prototype.detached;

  Controller.prototype.attached = function() {
    // attached() gets called twice but only does things when isAttached is false
    let isAttached = this.isAttached;
    attached.call(this);

    if (!isAttached) {
      for (const name in this.viewModel) {
        const value = this.viewModel[name];
        if (typeof value === 'function' && value.combo) {
          key(value.combo, e => {
            const result = value.call(this.viewModel, e);
            // return true to skip preventDefault
            if (result !== true) {
              e.preventDefault && e.preventDefault();
            }
          });
        }
      }
    }
  };

  Controller.prototype.detached = function() {
    // detached() gets called twice but only does things when isAttached is true
    let isAttached = this.isAttached;
    detached.call(this);

    if (isAttached) {
      for (const name in this.viewModel) {
        const value = this.viewModel[name];
        if (typeof value === 'function' && value.combo) {
          key.unbind(value.combo);
        }
      }
    }
  };
}

export function combo(...shortcuts) {
  if (!shortcuts || !shortcuts.length) return;

  return function(target, key, descriptor) {
    if (typeof descriptor.value !== 'function') {
      throw new Error('@combo(...) can only decorate a method');
    }

    descriptor.value.combo = shortcuts.join(', ');
    return descriptor;
  };
}