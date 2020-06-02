# aurelia-combo ![CI](https://github.com/aurelia-contrib/aurelia-combo/workflows/CI/badge.svg)

An Aurelia plugin for easy keyboard combo short-cuts.

# Install Package

`npm i aurelia-combo` or `yarn add aurelia-combo`

## Usage

In your main.js file

```js
aurelia.use.plugin(PLATFORM.moduleName('aurelia-combo'));
```

It uses [keymaster](https://github.com/madrobby/keymaster) underneath to support keyboard short-cut. Read it to understand the supported short-cut format.

> aurelia-combo has an embedded keymaster which contains unpublished fixes and additional fix on removing registered event handlers.

Note @combo decorator injects piece of code into two Aurelia life-cycle callbacks: attached and detached. This means @combo only works on Aurelia custom elements or components. It doesn't work on generic JavaScript classes which has no attached/detached callbacks.

```js
import {combo} from 'aurelia-combo';
export class MyVm {
  @combo('ctrl+f', 'command+f') // array of short-cuts
  findIt(e) {
    console.log('findIt');
  }

  @combo('ctrl+c, command+c') // or a string of all, keymaster understands
  copyIt(e) {
    console.log('copyIt');
  }
}
```

Take `findIt` as example, the above code is very similar to what you do manually:
```js
import key from 'keymaster';
export class MyVm {
  attached() {
    key('ctrl+f, command+f', e => {
      // By default, preventDefault will be called for the keyboard event.
      // User can skip the behavior by returning true from the decorated method.
      if (true !== this.findIt(e)) e.preventDefault();
    })
  }

  detached() {
    key.unbind('ctrl+f, command+f')
  }

  findIt(e) {
    console.log('findIt');
  }
}
```

### Inside input, select or textarea

By default, keymaster ignores all keyboard events originating from `<input>`, `<select>`, and `<textarea>` elements. To enable short-cuts from `<input>` and the other two elements, pass in an optional boolean option to enable it.

```js
// pass true at the end of arguments,
// to enable ctrl+f inside <input>.
@combo('ctrl+f', 'command+f', true)

// pass true at the end of arguments.
@combo('ctrl+c, command+c', true)
```

## License

MIT.
