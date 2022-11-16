import Vue from "vue";
// const controls = [
//   "eSvg",
//   "eMenuItem",
//   "eAsideMenu",
//   "eContainer",
//   "eHeader",
//   "eTable",
//   "eInput",
//   "eSteps",
//   "eRadio",
//   "eDatePicker",
//   "eSelect",
//   "eButton",
//   "eDashcard",
//   "eDropdown",
//   "eProfilePic",
//   "eModuleContainer",
//   "eCard",
//   "eForm",
//   "eDialog",
//   "eScrollTop",
//   "eKeyValue",
//   "table/eImgName",
//   "eContainerLite",
//   "eProgress",
//   "eMoreMenu",
//   "eTag",
//   "eTagCard",
//   "eSpacer",
//   "eToggleButton",
// ];
// controls.forEach((item) => {
//   const name = item.includes("/") ? item.split("/")[1] : item;
//   Vue.component(name, () => import("./" + item + ".vue"), {
//     name: name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
//   });
// })
 
const files = require.context('./../', true, /\.vue$/i)

files.keys().map(key => {
    Vue.component(files(key).default.name ?? key.split('/').pop().split('.')[0], files(key).default);
})
