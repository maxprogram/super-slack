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

SlackBot.prototype.send = function(message) {
    if (typeof message.text !== 'string') {
        return Q.reject({ message:'No text specified' });
    }

    var body = _.defaults(message, {
        username: this.options.username,
        icon_url: this.options.icon_url,
        icon_emoji: this.options.icon_emoji || this.options.emoji,
        channel: this.options.channel,
        text: message.message
    });

    body = _.pick(body, [
        'text',
        'username',
        'channel',
        'icon_url',
        'icon_emoji',
        'attachments',
        'unfurl_links',
        'link_names'
    ]);

    return post({
        proxy: (this.options && this.options.proxy) || process.env.http_proxy,
        url:   this.hookURL,
        body:  JSON.stringify(body)
    });
};


SlackBot.prototype.respond = function(query) {
    return Q({
        token: token,
        team_id: team_id,
        channel_id: channel_id,
        channel_name: channel_name,
        timestamp: new Date(query.timestamp),
        user_id: user_id,
        user_name: user_name,
        text: text
    });
};

module.exports = {
    Bot: SlackBot
};
