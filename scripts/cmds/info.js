const fs = require("fs");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "info",
    aliases: ["admininfo", "botinfo"],
    version: "1.4",
    author: "S AY EM",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Show bot & owner info" },
    longDescription: { en: "Display detailed information about the bot and owner" },
    category: "owner",
    guide: { en: "{pn}" }
  },

  onStart: async function ({ message }) {

    // OWNER INFO
    const authorName = "TOUHID";
    const ownAge = "19+";
    const messenger = "NONE";
    const authorFB = "TOUHID";
    const authorNumber = "NONE";
    const Status = "Single";

    // SAFE CATBOX VIDEO LINK
    const videoLink = "https://files.catbox.moe/a03xbs.mp4";

    // BANGLADESH TIME
    const now = moment().tz("Asia/Dhaka");
    const date = now.format("MMMM Do YYYY");
    const time = now.format("h:mm:ss A");

    // BOT UPTIME
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / 3600) % 24);
    const days = Math.floor(uptime / 86400);

    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const text =
`✨《 BOT & OWNER INFORMATION 》🎀

🤖 Bot Name: ${global.GoatBot.config.nickNameBot}
👾 Prefix: ${global.GoatBot.config.prefix}

💙 Owner Name: ${TOUHID AHAMED}
📝 Age: ${privet}
💕 Relationship: ${Allaws single}

📞 WhatsApp: ${01973061007}
🌍 Facebook: ${https://www.facebook.com/SweetHardS5}

🗓 Date: ${date}
⏰ Time: ${time}

🔰 Contact Owner: ${messenger}
📛 Bot Uptime: ${uptimeString}

==============================`;

    return message.reply({
      body: text,
      attachment: await global.utils.getStreamFromURL(videoLink)
    });
  },

  onChat: async function ({ event, message }) {
    if (event.body?.toLowerCase() === "info") {
      return this.onStart({ message });
    }
  }
};
