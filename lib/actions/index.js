'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var addArticle = exports.addArticle = function addArticle(article) {
  return { type: 'ADD_ARTICLE', payload: article };
};