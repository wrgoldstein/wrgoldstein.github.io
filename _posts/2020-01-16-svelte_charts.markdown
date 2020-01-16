---
layout: post
title:  svelte-charts
date:   2020-01-16
---

In some of my recent projects I've been using the very good [chart.js](https://www.chartjs.org/) library, but I've always wanted to have a little more control over my charts. I planned to implement them in d3.js eventually, but I recently read Paul Sweeney on [why he doesn't use d3 anymore](https://medium.com/@PepsRyuu/why-i-no-longer-use-d3-js-b8288f306c9a) and the [counterpunch](https://medium.com/@mbostock/why-you-should-use-d3-ae63c276e958) from Mike Bostock and decided to do exactly as Mike suggests- use d3, but only for the fiddly bits I don't want to calculate myself (like nice tick marks) and not for DOM selection and mutation. 

A goal is to create a charting element like Tableau or Looker that allows for quite a bit of easy configuring, for example easily toggling from a bar chart to a line chart.

It's still very early days, but it felt worth mentioning, especially as I haven't really blogged about Svelte at all. Svelte is a delight to work with, I'm having a lot of fun with it.

The code is [here](https://github.com/wrgoldstein/svelte-charts/), and below is a small demo of it in action. (I'm changing the kind of data between time series, categorical, and numerical as well as changing the type of plot between line, stacked bar, etc.):


![/assets/svelte-charts-demo.gif]
