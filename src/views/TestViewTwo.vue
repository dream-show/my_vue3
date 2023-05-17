<!--
 * @Description: 响应式基础
 * @Author: 谭海军
 * @Date: 2023-05-15 22:07:52
 * @LastEditors: 谭海军
 * @LastEditTime: 2023-05-16 17:23:04
-->
<template>
  <button
    @click="
      increment();
      mutateDeeply();
    "
  ></button>
  <div>{{ state.count }}</div>
  <div></div>
  <button @click="test()"></button>
  {{ state1.count }}
</template>

<script setup lang="ts">
import { nextTick, reactive } from 'vue';

/**
 * Vue2.0
基于Object.defineProperty，不具备监听数组的能力，需要重新定义数组的原型来达到响应式。
Object.defineProperty 无法检测到对象属性的添加和删除 。
由于Vue会在初始化实例时对属性执行getter/setter转化，所有属性必须在data对象上存在才能让Vue将它转换为响应式。
深度监听需要一次性递归，对性能影响比较大。
 */
/** 
 * Vue3.0
基于Proxy和Reflect，可以原生监听数组，可以监听对象属性的添加和删除。
不需要一次性遍历data的属性，可以显著提高性能。
因为Proxy是ES6新增的属性，有些浏览器还不支持,只能兼容到IE11 。
 */
// 创建一个响应式对象
const state = reactive({ count: 0 });
const obj = reactive({ nested: { count: 0 }, arr: ['a', 'b'] });

// 更新数据的对象
const increment = (): void => {
  state.count++;
  // 数据更新->(执行特定的更新策略，也就是说更新数据和更新dom之间有延迟)->dom更新->nextTick()
  nextTick(() => {
    // dom更新后 会在mutateDeeply()console.log之后打印
    console.log('dom更新了');
  });
};

// vue3默认深层响应式（会监听数组/对象属性）
function mutateDeeply() {
  // 以下都会按照期望工作
  obj.nested.count++;
  obj.arr.push('baz');
  console.log(obj);
}

// reactive() 返回的是一个原始对象的 Proxy(代理器，监听原对象的操作)
interface rawObject {
  [key: string]: object;
}

const raw: rawObject = {};
const rawProxy = reactive(raw);
console.log(raw == rawProxy); // false

// 若原对象为代理器，返回其本身
const rawProxyProxy = reactive(rawProxy);
console.log(rawProxyProxy === rawProxy); // true

// 响应式对象的属性也是代理
const attr = {};
rawProxy.nested = attr;
console.log(rawProxy.nested == attr); // false

/**
 * reactive仅对对象数组集合起作用
 * 替换响应式对象会使得对原对象的响应消失
 */

let state1 = reactive({ count: 0 });
let test = (): void => {
  // 点击后值显示不变
  // state1 = reactive({ count: 1 });

  // 将值赋值给本地并操作或，当参数传递给函数后，失去响应
  let n = state1.count;
  // 点击后值变更
  // state1.count++;

  // 点击后值不变
  // n++;

  // 点击后值不变
  // let testNum = (num: number): number => {
  //   return num;
  // };
  // testNum(state1.count);
};
</script>

<style></style>
