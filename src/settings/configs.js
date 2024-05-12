const ENV = require('./env').ENV;


class MongoDBConfig {
    constructor() {
        this.username = ENV.MONGODB_USERNAME;
        this.password = ENV.MONGODB_PASSWORD;
        this.hostname = ENV.MONGODB_HOSTNAME || 'localhost';
        this.port = ENV.MONGODB_PORT || '27017';
        this.name = ENV.MONGODB_NAME;
    }

    get url() {
        return `mongodb://${this.username}:${this.password}@${this.hostname}:${this.port}`;
    }

    get dbURL() {
        return `${this.url}/${this.name}`;
    }
}


class BlockCypherConfig {
    constructor() {
        this.token = ENV.BLOCKCYPHER_TOKEN;
    }
}


class WebHookConfig {
    constructor() {
        this.ENDPOINT = ENV.WEBHOOK_ENDPOINT;
    }
}

const mongoDBConfig = new  MongoDBConfig();
const blockCypherConfig = new BlockCypherConfig();
const webHookConfig = new WebHookConfig();

module.exports = {
    mongoDBConfig,
    blockCypherConfig,
    webHookConfig
}