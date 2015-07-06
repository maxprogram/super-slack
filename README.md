# Super Slack

A tool for creating Slack bots with Node.js. 

```js
var Slack = require('super-slack');

var slackBot = new Slack.Bot('http://slack/webhook', {
    username: 'Elon Musk Bot',
    emoji: ':rocket:'
});

var quotes = [
    "When something is important enough, you do it even if the odds are not in your favor.",
    "Failure is an option here. If things are not failing, you are not innovating enough.",
    "Any product that needs a manual to work is broken."
];

slackBot.send({
    text: quotes[Math.floor(Math.random() * quotes.length)]
})
.then(console.log)
.fail(console.error);
```