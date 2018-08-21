// async queue
export function createAssertionQueue(timeout = 0) {
  let queue = [];

  let next;
  next = () => {
    if (queue.length) {
      setTimeout(() => {
        let func = queue.shift();
        func();
        next();
      }, timeout);
    }
  };

  return (func) => {
    queue.push(func);
    if (queue.length === 1) {
      next();
    }
  };
}
