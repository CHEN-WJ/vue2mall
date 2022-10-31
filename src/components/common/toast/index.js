import Toast from './Toast.vue'

const obj = {}

obj.install = function (Vue) {
  /**
   * 第一件事：将Toast组件的模板添加到body节点
   */
  //1. 创建组件构造器;组件为参数传入
  const toastConstructor = Vue.extend(Toast)

  //2. 用new的方式，根据组件构造器，创建组件对象
  const toast = new toastConstructor()

  //3. 将组件对象手动挂载到某个元素上
  toast.$mount(document.createElement('div'))

  //4. 将组件模板添加到body节点
  document.body.appendChild(toast.$el)

  /**
   * 第二件事：将toast组件对象添加到Vue原型，新增属性$toast
   */
  Vue.prototype.$toast = toast
}

export default obj