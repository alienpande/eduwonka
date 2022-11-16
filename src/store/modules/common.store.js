import Vue from "vue";
const _ = Vue.prototype;
const state = {
  asideMenuCollapse: false,
  menu: {
    menu: [],
    title: "",
  },
  view: _.$currentViewport ? _.$currentViewport.label : "s",
  asideWidth: "290px",
  examMenu: {
    subject: {},
    standard: {},
  },
  standardMenu: {
    title: "",
    standard: "",
    routes: [],
    sections: [],
  },
  bgColor:'white',
};

//#region getters
const getters = {
  menu: (state) => state.menu,
  view: (state) => state.view,
  asideWidth: (state) => state.asideWidth,
  examMenu: (state) => state.examMenu,
  standardMenu: (state) => state.standardMenu,
  asideMenuCollapse: (state) => state.asideMenuCollapse,
  bgColor:(state)=> state.bgColor,
};
//#endregion

// mutations
const mutations = {
  setView(state, data) {
    state.view = data;
  },
  setMenu(state, data) {
    state.menu = data;
  },
  setAsideWidth(state, data) {
    state.asideWidth = data;
  },
  hideAsideMenuMobile(state) { 
    if(state.view === 's'){
        state.asideWidth = "0px";
    }else{
        state.asideWidth = "290px";
    }
  },
  setExamMenu(state, data) {
    state.examMenu = data;
  },
  setStandardMenu(state, data) {
    state.standardMenu = data;
  },
  setAsideMenuCollapse(state, data) {
    state.asideMenuCollapse = data;
    setTimeout(() => {
      state.asideWidth = data ? "100px" : "290px";
    }, 100);
  },
  setBg(state,data) {
    state.bgColor = data;
  },
};

// actions
/* eslint-disable */
const actions = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};