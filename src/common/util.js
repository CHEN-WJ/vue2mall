//防抖函数
export function debounce (func, delay) {
  //1. 保存定时器
  let timer = null
  //2. 返回一个函数
  return function (...args) {
    //3. 清除之前的定时器
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}