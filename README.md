# 🥣 Cereal

A serial data viewer

![cereal demo](cereal_demo.gif)

Cereal is an exercicie on building a system to both gather and graph time series data.

⚠️ This is pre-alpha code and **clearly not fit for production**.

## Local development

This repo includes the code for both the web server and the client. After some unsuccessful attempts at defining a proper `docker-compose` setup, for now, both the server and the server which serves the client need to be started independently.

### External dependencies

In addition to the dependencies defined by the respective package managers, the following dependencies are assumed to be present.

- The server depends on `sqlite3` being installed in the development machine. In case your on macOS you can use `brew` to install it:

    ```
    $ brew install sqlite3
    ```
- The client assumes that the browser in which will be run supports:
   - The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), that is, the presence of `fetch` in the global envirnoment.
   - The [`datetime-local`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local) HTML `input` type.

  Both are supported in modern web browsers, in particular on Chrome 107, which was used to develop and test this app.

### Server

The server code lives under `./server`, and it consists in a Rails 7 application (API only). It has been developed and tested on Ruby 3.0.0. There is a `.ruby-version` file in it. Therefore, if you use [RVM](https://rvm.io/) you can set it with:

```
$ cd server
$ rvm use
```

Install the dependencies with Bundler

```
$ bundle install
```
Next, we can create the local SQLite DB, run the single migration and populate it with the seed with demo data by running:

```
$ rails db:setup
```

This may take some time as the seed script inserts 3000 rows in the single `metrics` table. It's a bit of random noise for now, but hey, this is what we've got so far.

Finally, the local server can be started with:

```
$ rails server
```

This will try to run the sever app on port 3000.

### Client

The client code lives under the `./client` folder. It uses React 17 and Typescript 4. It is an ejected instance of [create-react-app](https://create-react-app.dev/) with minor modifications. This is why it has such a huge number of dev dependencies. Some cleanup may be needed in order to leave only the ones needed.

It has been developed and tested on Node 18.12.1. There is a `.nvmrc` file in it. Therefore, if you use [NVM](https://github.com/nvm-sh/nvm), you can set it with:


```
$ rvm use
```

Install the dependencies with Yarn

```
$ yarn
```

and, finally, run the Webpack Dev server with:

```
$ yarn start
```

This will try to run the dev server on port 4000.

As you can see in the `"proxy"` key in `package.json` all requests for all paths besides the root will be proxied back to the port 4000. This lets the web client connect to the server app running there.

## Tests

Since this is the result of a first demo put together under time constraints, tests were _not_ written first and what we have right now is certainly lacking. They are both functional tests, so to speak, and describe part of the external behaviour of the system they test.

### Server

For now, there are only tests for the single controller in the application. They can be run with

```
$ rails test
```

[Guard](https://github.com/guard/guard) and its [Minitest plugin](https://github.com/guard/guard-minitest) are installed in order to run the tests under watch mode. For this, run:

```
$ guard
```
### Client

The client has, for now, only functional tests which check part of the behaviour of its main component. You can run them with:

```
$ yarn test
```

The CRA script called with that passes the `--watch` option to Jest automatically.

## Technical notes

The current structure of the app is as follows:

### Client

- The main [`DataViewer`](./client/src/components/data-viewer.tsx) mounts an instance of [`LineChart`](https://recharts.org/en-US/api/LineChart) from the Recharts library. It's this library which does the visualization itself by rendering SVG graphs.
- [`DataViewer`](./client/src/components/data-viewer.tsx) is, so to speak, the main presentational component, where "presentational" means here that it's a component whose only concern is to render HTML as a function of the values of the received props.
- A bit higher up we find [`DataViewerContainer`](./client/src/containers/data-viewer-container.tsx). As the name implies, this is a container for `DataViewer`, where "container" here means that it does not invole itself with rendering anything to the DOM but instead only _connects_ `DataViewer` with the state management infrastructure.
- As you can see in [`DataViewerContainer`](./client/src/containers/data-viewer-container.tsx), it uses the [`useReducer`](https://en.reactjs.org/docs/hooks-reference.html#usereducer) React hook, which in turn is the React built-in implementation of the [Flux Architecture](https://facebook.github.io/flux/) (or [Elm Architecture](https://guide.elm-lang.org/architecture/) maybe?). This hook receives the `rootReducer` from [client/src/state-management/reducer.ts](./client/src/state-management/reducer.ts) which is where the state changes per each received action are defined. On the other hand, [`DataViewerContainer`](./client/src/containers/data-viewer-container.tsx) also uses several [event handlers](./client/src/state-management/event-handlers.ts) which are in charge of dispatching the correct actions to the reducer as a result of DOM events.

### Server

### Storage

## To Do and Next Steps

### Client

### Server

### Storage
