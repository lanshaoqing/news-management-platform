<template>
  <router-view />
</template>

<script >
// 解决ERROR ResizeObserver loop completed with undelivered notifications.

//问题的

const debounce = (fn, delay) => {
  let timer = null;

  return function () {
    let context = this;

    let args = arguments;

    clearTimeout(timer);

    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

// 解决ERROR ResizeObserver loop completed with undelivered notifications.

const _ResizeObserver = window.ResizeObserver;

window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);

    super(callback);
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;

}

::-webkit-scrollbar-thumb {
  background: #1890ff;
}

::-webkit-scrollbar-track {
  background: #ddd;
}
</style>
