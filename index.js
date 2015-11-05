var _ = require('lodash');
var Q = require('q');
var request  = require('request');

function post(url) {
    return Q.nfapply(request, [url]).then(function(res) {
        if (res[0].statusCode == 200) {
            return res[1];
        } else {
            throw res[0].statusCode;
        }
    })
}

function SlackBot(hookURL, ops) {
    this.hookURL = hookURL;
    this.options = ops;
}

SlackBot.prototype._createMsg = function(message) {
    if (typeof message === 'string') {
        message = { text: message };
    }

    var body = _.defaults(message, {
        username: this.options.username,
        icon_url: this.options.icon_url,
        icon_emoji: this.options.icon_emoji || this.options.emoji,
        channel: this.options.channel,
        text: message.message
    });

    return _.pick(body, [
        'text',
        'username',
        'channel',
        'icon_url',
        'icon_emoji',
        'attachments',
        'unfurl_links',
        'link_names'
    ]);
};

SlackBot.prototype.send = function(message) {
    if (typeof message.text !== 'string' && typeof message !== 'string') {
        return Q.reject({ message:'No text specified' });
    }

    return post({
        proxy: (this.options && this.options.proxy) || process.env.http_proxy,
        url:   this.hookURL,
        body:  JSON.stringify(this._createMsg(message))
    });
};


SlackBot.prototype.respond = function(query, response) {
    var newResponse = response({
        token: query.token,
        team_id: query.team_id,
        channel_id: query.channel_id,
        channel_name: query.channel_name,
        channel: query.channel_name,
        timestamp: new Date(query.timestamp),
        user_id: query.user_id,
        user_name: query.user_name,
        username: query.user_name,
        text: query.text
    });

    return Q(this._createMsg(newResponse));
};

module.exports = {
    Bot: SlackBot
};
