import Vue from "vue";
// const controls = [
//   "learn/subtopic",
//   'learn/lessonGraph',
//   'learn/formBarHeader',
//   'addOption',
//   'finance/detailBar',
//   'library/bookCard',
//   'library/reverseCard',
//   'library/quickStat',
//   'library/issueLogModal',
//   'digitalLibrary/storageView',
//   'digitalLibrary/file',
//   'digitalLibrary/folder',
//   'digitalLibrary/makeFile',
//   'digitalLibrary/viewPropertiseModal',
//   'learn/card',
//   'dash/dashheader' 
// ];

// controls.forEach((item) => {
//   const name = item.includes("/") ? item.split("/")[1] : item;
//   // console.log(name);
//   Vue.component(name, () => import("./" + item + ".vue"));
// });



const files = require.context('./', true, /\.vue$/i)

files.keys().map(key => {
    Vue.component(files(key).default.name ?? key.split('/').pop().split('.')[0], files(key).default);
})