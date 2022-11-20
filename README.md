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

The client code lives under the `./client` folder. It is an ejected instance of [create-react-app](https://create-react-app.dev/) with minor modifications. This is why it has such a huge number of dev dependencies. Some cleanup may be needed in order to leave only the ones needed.

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

## Technical approach

## To Do

## Next steps


