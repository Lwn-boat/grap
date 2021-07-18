//ログイン処理
const Discord = require('discord.js');
const client = new Discord.Client();
const token = '';
const KeepAlive = require('./server')
const moment = require('moment');
const slotItems = ["🍇", "🍉", "🍊", "🍎", "🎰", "🍓", "🍒"];
const signatureblue = '0070FF'
const talkedRecently = new Set();

const prefix = '%';

client.on('ready', () => {
    console.log('ready...');
});
//Bot自身の発言を無視する呪い
client.on('message', message =>{
    if(message.author.bot){
        return;
    }
	if (message.content.match(/こんば/)) {
	let channel = message.channel;
	let author = message.author.username;
	let reply_text =`こんばんは〜`;
	message.reply(reply_text)
		.then(message => console.log(`Sent message: ${reply_text}`))
		.catch(console.error);
	return;
	}

	if (message.content.match(/おはよ/)) {
	let channel = message.channel;
	let author = message.author.username;
	let reply_text =`おはようございます！`;
	message.reply(reply_text)
		.then(message => console.log(`Sent message: ${reply_text}`))
		.catch(console.error);
	return;
	}

	if (message.content.match(/はじめまして/)) {
	let channel = message.channel;
	let author = message.author.username;
	let reply_text =`はじめまして！よろしくおねがいします！`;
	message.reply(reply_text)
		.then(message => console.log(`Sent message: ${reply_text}`))
		.catch(console.error);
	return;
	}

	if (message.content.match(/こんにちは/)) {
	let channel = message.channel;
	let author = message.author.username;
	let reply_text =`こんにちは～`;
	message.reply(reply_text)
		.then(message => console.log(`Sent message: ${reply_text}`))
		.catch(console.error);
	return;
	}

	if (message.content.match(/ただいま/)) {
	let channel = message.channel;
	let author = message.author.username;
	let reply_text =`お帰りなさい！`;
	message.reply(reply_text)
		.then(message => console.log(`Sent message: ${reply_text}`))
		.catch(console.error);
	return;
	}
});

client.on('message', message => {

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'help') {
    const user = message.mentions.users.first() || message.author;
	const member = message.mentions.members.first() || message.member;
	
	let embed = new Discord.MessageEmbed()
	.setAuthor("コマンドヘルプ")
	.setColor("#64FF00", false)
	.addField("ミニゲーム", '\`%slot\` - スロットゲーム\n\`%rps\` - じゃんけん' , true)
	.addField("情報コマンド", '\`%uinfo\` - ユーザー情報\n \`%sinfo\` - サーバー情報\n \`%help\` - ヘルプ(コマンド一覧)' , true)
	.addField("運営コマンド", '\`%poll\` - 投票(Y/n)', true)
	.setFooter('Created by [Tohaku#1089]()');
	message.channel.send(embed);
	}
});


client.on('message', message => {

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'rps') {
        const acceptedReplies = ['rock', 'paper', 'scissors'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];

        const choice = args[0];
        if (!choice) return message.channel.send(`遊び方: \`${prefix}rps <rock|paper|scissors>\`\nrock/paper/scissorsとは：　rockはグー、paperはパー、scissorsはチョキを指します。要するに海外版じゃんけんという訳です。`);
        if (!acceptedReplies.includes(choice)) return message.channel.send(`右の3つの中から選んでください！: \`${acceptedReplies.join(', ')}\``);
        
        console.log('Bot Result:', result);
        if (result === choice) return message.reply("あいこです！もう一度！");
        
        switch (choice) {
            case 'rock': {
                if (result === 'paper') return message.reply('私の勝ちです! :newspaper: vs :mountain:');
                else return message.reply('あなたの勝ちです!　:scissors: vs :mountain:');
            }
            case 'paper': {
                if (result === 'scissors') return message.reply('私の勝ちです! :scissors: vs :newspaper:');
                else return message.reply('あなたの勝ちです!　:mountain: vs :newspaper:');        
            }
            case 'scissors': {
                if (result === 'rock') return message.reply('私の勝ちです!　:mountain: vs :scissors:');
                else return message.reply('あなたの勝ちです!　:newspaper: vs :scissors:');
            }
            default: {
                return message.channel.send(`右の3つの中から選んでください！: \`${acceptedReplies.join(', ')}\``);
            }
        }
    }
});

client.on('message', message => {

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'uinfo') {
    const user = message.mentions.users.first() || message.author;
	const member = message.mentions.members.first() || message.member;
	
	let embed = new Discord.MessageEmbed()
	.setAuthor("ユーザー情報")
	.setColor("#64FF00", false)
	.addField("ユーザー名:", user.tag , false)
	.addField("ID:", user.id, false)
	.addField('サーバー参加:', `${moment.utc(user.joinedAt).format('YYYY年 MM月 DD日, HH:mm:ss')}`, false)
	.addField('アカウント作成:', `${moment.utc(user.createdAt).format('YYYY年 MM月 DD日, HH:mm:ss')}`, false)
	.addField("ゲーム:", user.presence.game ? user.presence.game : 'プレイしていません' , false)
	message.channel.send(embed);
	}
});

client.on('message', message => {

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'sinfo') {
        const guild = message.guild;
        const sicon = guild.iconURL();

	let embed = new Discord.MessageEmbed()
        .setDescription("サーバー情報")
        .setColor("#0b7ed6")
        .setThumbnail(sicon)
        .addField("サーバー名", guild.name)
        .addField('サーバー作成:', `${moment.utc(guild.createdAt).format('YYYY年 MM月 DD日, HH:mm:ss')}`, false)
        .addField("合計参加者数", guild.memberCount);

        return message.channel.send(embed);
	}
});

client.on('message', message => {

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'poll') {
	let question = args.slice(0).join(" ");

	if (args.length === 0)
	return message.reply('**無効な形式です！:** `%poll <質問内容>`')

	let embed = new Discord.MessageEmbed()
	.setTitle(`${question}`)
	.setColor("#5599ff")
	.setFooter(`作成者: ${message.author.username}`)

	message.channel.send({embed})
	.then(embedMessage => {
    embedMessage.react("👍")
	embedMessage.react("👎")
	embedMessage.react("🤔")
	});
}
});

client.on('message', message => {

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'slot') {
	let user = message.author;

    let win = false;

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]} \nおめでとう！`)
            .setColor(signatureblue)
        message.channel.send(slotsEmbed1)
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]} \nもう一回チャレンジ！`)
            .setColor(signatureblue)
        message.channel.send(slotsEmbed)
		}
	}
});


client.login(token);

