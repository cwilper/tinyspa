# TinySPA

A small seed project for single-page javascript web applications.

**Features:**

* No runtime dependencies assumed except jQuery
* Comes with popular ESLint settings that work well in Atom
* Manages dependencies with NPM and builds with gulp
* Javascript module bundling with Browserify
* Javascript transpilation and optimization with Google Closure
* CSS preprocessing with rework, compression with UglifyCSS
* LiveReload support during development with gulp.watch and gulp-connect

## Usage

Copy this project and modify the following as appropriate for your own project.

* `package.json` should contain your own project details.
* `README.md` (this file) should describe your project.
* `src/js/app/index.js` is your app's main module.
* `src/css/app/index.css` is your app's main css file.
* `src/index.html` is your app's initial web page content.
* `src/images/` is where your app's images go.

## Building

Install dependencies:

```
npm install
```

Build for development and run on port 9100 with LiveReload

```
gulp
```

Build for development only (output in `dist/dev`)

```
gulp dev
```

Build for production (output in `dist/prod`)

```
gulp prod
```
