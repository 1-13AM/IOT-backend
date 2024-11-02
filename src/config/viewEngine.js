const express = require('express');
const path = require('path');

const configViewEngine = (app) => {
  app.use(express.static(path.join(__dirname, '../public')));
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));

  // Serve static files from node_modules
  app.use('/css', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/css')));
  app.use('/js', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/js')));
  app.use('/js', express.static(path.join(__dirname, '../../node_modules/jquery/dist')));
  app.use('/js', express.static(path.join(__dirname, '../../node_modules/@popperjs/core/dist/umd')));
};

module.exports = configViewEngine;
