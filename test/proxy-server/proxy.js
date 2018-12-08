const ARGS = require('minimist')(process.argv.slice(2));
const PROXY_PORT = ARGS.port || 10500;
const PROXY_CONFIG_PATH = ARGS.cfg || './config-mock.json';

const app = require('express')();
const proxy = require('http-proxy-middleware');
const utils = require('../../utils');
const _ = require('lodash');

const config = utils.file2object(PROXY_CONFIG_PATH);
_.forEach(config, (url, path) => app.use(path, proxy(url, {secure: false, changeOrigin: true})));

app.use((req, res) => {
    res.status(404).send(`no proxy: ${req.url}`);
});

app.listen(PROXY_PORT, () => {
    console.log(`API PROXY: listening on port ${PROXY_PORT}`, 'config:', config);
});
