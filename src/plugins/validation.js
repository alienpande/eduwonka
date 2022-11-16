import Vue from "vue";
import { ValidationProvider, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { messages } from "vee-validate/dist/locale/en.json";
import { required, email } from 'vee-validate/dist/rules';


Object.keys(rules).forEach((rule) => {
  extend(rule, { ...rules[rule], message: messages[rule] });
});

// Custom validation goes here.
extend("secret", {
  validate: (value) => value === "example",
  message: "This is not the magic word",
});
extend("positive", {
  validate: (value) => value >= 0,
  message: "This is not the magic word",
});
extend("odd", (value) => {
  if (value % 2 !== 0) {
    return true;
  }
  return "This field must be an odd number";
});

// Add the required rule
extend('required', {
  ...required,
  message: 'This field is required'
});

// Add the email rule
extend('email', {
  ...email,
  message: 'This field must be a valid email'
});

Vue.component("validate", ValidationProvider);
