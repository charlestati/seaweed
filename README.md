# Seaweed

## Overview

**Seaweed** is a workflow boilerplate for front-end web development based on [Web Starter Kit](https://developers.google.com/web/tools/starter-kit/)

![Seaweed](https://hd.unsplash.com/photo-1419843596342-f3053fb71845)

## What's different?

- Use [Pug](https://pugjs.org/api/getting-started.html) for HTML templating
- Use [JavaScript Standard Style](http://standardjs.com/index.html) for Javascript styleguide
- Use Bootstrap reboot file and utilities (with [Coolstrap](https://github.com/charlestati/coolstrap))
- Use a config file for the output directory, the ESLint auto fix feature and the autoprefixer options

## Quickstart

1. [Download](https://github.com/charlestati/seaweed/archive/master.zip) or clone this boilerplate
3. `npm start`

By default, **Seaweed** builds your project in `dist/`

You can type `npm run serve` to launch Browser Sync and automatically reload the window when a file is modified

## Usage with GitHub Pages

Edit the `config.json` file to change the `outputDir` value to `./`

**If you do that, `gulp clean` will try to delete the current working directory!**

## License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)  
Bootstrap is under [the MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE)  
Original work Copyright 2015 Google Inc  
Modified work Copyright 2016 Charles Tatibouet
