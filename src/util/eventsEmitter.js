import Vue from "vue";
const emitter = new Vue();
const publish = function Emit(eventName, data) {
  emitter.$emit(eventName, data);
};
const subscribe = function On(eventName, callback) {
  emitter.$on(eventName, callback);
};
const subscribeOnce = function Once(eventName, callback) {
  emitter.$once(eventName, callback);
};
const unsubscribe = function Off(eventName, callback) {
  emitter.$off(eventName, callback);
};
const unsubscribeAll = (evnts) => {
  emitter.$off(evnts);
};
export const event = {
  publish,
  subscribe,
  subscribeOnce,
  unsubscribe,
  unsubscribeAll,
};
