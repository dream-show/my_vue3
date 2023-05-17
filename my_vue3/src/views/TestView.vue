<!--
 * @Description: 模板语法
 * @Author: 谭海军
 * @Date: 2023-05-13 09:31:27
 * @LastEditors: 谭海军
 * @LastEditTime: 2023-05-15 21:52:38
-->
<template>
  <!-- 模板语法 -->
  <div>
    <!-- 文本插值 -->
    <h1>This is an {{ testStr }}</h1>
    <!-- v-text等效于{{}} -->
    <h1 v-text="testText"></h1>
    <!-- 插入html使用v-html -->
    <h1 v-html="testHtml"></h1>
  </div>

  <!-- 属性绑定 -->
  <div :class="color"></div>
  <!-- 布尔值表示是否存在这个属性 
  当为false时 f12会发现无disabled属性，true或‘’时有该属性值-->
  <button :disabled="disabledFlag"></button>
  <!-- 多属性值绑定使用对象(不带参数) -->
  <div :="objectOfAttrs"></div>

  <!-- 数据绑定可使用js
  但是只支持有合法值得表达式 -->
  {{ ok ? 'ok' : 'no' }}

  <!-- 不支持语句，包括条件语句 会报错 -->
  <!-- {{var a = 1}}
  {{if(of) {
    return 'yes'

  }}} -->

  <!-- 可以使用组件暴露的方法 -->
  {{ num }}
  {{ addNum(num) }}

  <!-- 指令 -->
  <p v-if="ok">if为true可见</p>

  <!-- 参数 -->
  <a :href="url">百度</a>

  <!-- 监听 v-on/@ -->
  <div :class="color" @click="click()"></div>

  <!-- 动态参数 被绑定的属性
  指令参数也可以使用js表达式
  使用[]-->
  <!-- attributeName 值为href -->
  <a :[attributeName]="url">百度</a>
  <!-- eventName的值为click -->
  <div :class="color" @[eventName]="click()"></div>

  <!-- 动态参数的值只能是字符串或者null（移除） -->
  <!-- 不能含有引号/空格等，复杂的表达式使用计算属性 -->

  <!-- 修饰符 Modifier 
  .prevent表示对触发事件的对象调用event.preventDefault()-->
  <!-- event.preventDefault()方法是用于取消事件的默认行为 -->
</template>

<script>
export default {
  setup() {
    let testStr = '文本插值';
    let testHtml = '<p>插入html</p>';
    let testText = '<p>插入html</p>';
    let color = 'black';
    let disabledFlag = true;
    let objectOfAttrs = {
      id: 'center',
      class: 'black'
    };
    let url = 'https://www.baidu.com/';
    let ok = true;
    let num = 1;
    let attributeName = 'href';
    let eventName = 'click';

    let addNum = num => {
      return num + 1;
    };

    let click = () => {
      console.log('点击');
    };

    return {
      testStr,
      testHtml,
      testText,
      color,
      disabledFlag,
      objectOfAttrs,
      ok,
      num,
      url,
      attributeName,
      eventName,
      addNum,
      click
    };
  }
};
</script>

<style>
.black {
  width: 10px;
  height: 10px;
  background-color: black;
}
.white {
  width: 10px;
  height: 10px;
  background-color: aliceblue;
}
#center {
  margin: 0 auto;
}
</style>
