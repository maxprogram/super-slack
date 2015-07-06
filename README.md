# Super Slack

A tool for creating Slack bots with Node.js. 

```js
var Slack = require('super-slack');

var slackBot = new Slack.Bot('http://slack/webhook', {
    username: 'Elon Musk Bot',
    emoji: ':rocket:',
    channel: '#general' // Default channel
});

var quotes = [
    "When something is important enough, you do it even if the odds are not in your favor.",
    "Failure is an option here. If things are not failing, you are not innovating enough.",
    "Any product that needs a manual to work is broken."
];

slackBot.send(quotes[Math.floor(Math.random() * quotes.length)])
.then(console.log)
.fail(console.error);
```

### Bot(webhook, options)

* `webhook` (*string*) Incoming Webhook provided by Slack.
* `options` (*object*)
    * `username`: Name of the bot
    * [`emoji`]: Emoji icon to use as the bot's avatar
    * [`icon_url`]: URL of custom avatar icon
    * [`channel`]: Default channel to post to

#### Bot.send(message)

* `message` (*Object|string*): The message to send to the Slack channel.
    * `text`: Text of message to send.
    * `channel`: Channel to send the message to.

#### Bot.respond(request)
