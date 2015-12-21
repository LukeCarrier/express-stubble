# Stubble for Express

![latest npm release](https://img.shields.io/npm/v/express-stubble.svg)

A lightweight Express view engine for rendering Handlebars templates. Supports
multiple view directories at the expense of niceties like layouts and partials.

* * *

## Installation

    npm install --save express-stubble

## Usage

    express.engine('hbs', expressStubble({
      // The Handlebars instance to render the views with
      handlebars: handlebars
    }));
    express.set('view engine', 'hbs');

## To do

* Support precompilation of templates
