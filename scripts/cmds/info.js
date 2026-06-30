const moment = require('moment-timezone');
const axios = require('axios');
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "info",
    version: "2.2",
    author: "S AY EM",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Get bot & admin information with an image."
    },
    longDescription: {
      en: "Provides details about the bot and its administrator."
    },
    category: "Information",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message }) {
    return sendInfo(message);
  },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "info") {
      return sendInfo(message);
    }
  }
};

async function sendInfo(message) {
  try {

    const adminInfo = {
      name: "S AY EM",
      age: "19+",
      status: "𝐈𝐬𝐥𝐚𝐦",
      location: ", 𝐃𝐡𝐚𝐤𝐚, 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡",
      instagram: "No Share",
      facebook: {
        name: "Sayem",
        link: "https://m.me/sayem.ahmmed.404"
      },
      github: "https://github.com/ysuzume25-cpu/XS-TAOHID.git"
    };

    const botInfo = {
      name: "亗 TOUHID-BOT 亗",
      prefix: "•"
    };

    const now = moment().tz('Asia/Dhaka');
    const currentTime = now.format('h:mm:ss A');

    const uptime = process.uptime();
    const days = Math.floor(uptime / (60 * 60 * 24));
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const minutes = Math.floor((uptime / 60) % 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const imageList = [
      "https://files.catbox.moe/kfvs9r.jpg",
      "https://files.catbox.moe/kx4l40.jpg",
      "https://files.catbox.moe/7ho2kv.jpg"
    ];

    let attachment = null;
    const filePath = path.join(__dirname, "cache", "info.jpg");

    for (let img of imageList) {
      try {
        const res = await axios.get(img, { responseType: "arraybuffer" });
        fs.writeFileSync(filePath, Buffer.from(res.data, "binary"));
        attachment = fs.createReadStream(filePath);
        break; // success হলে stop
      } catch (e) {
        console.log("Image failed:", img);
      }
    }

    const responseMessage = `
╭━─━─━─≪✠≫─━─━─━╮
      🎀 𝐀𝐃𝐌𝐈𝐍 𝐈𝐍𝐅𝐎 🎀
╰━─━─━─≪✠≫─━─━─━╯
✧ 𝗡𝗮𝗺𝗲: ${Touhid Ahamed}
✧ 𝗔𝗴𝗲: ${19+}
✧ 𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻: ${Islam}
✧ 𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻: ${Dinajpur}
✧ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: ${AhaMed Touhid}
✧ 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗟𝗶𝗻𝗸: ${https://www.facebook.com/share/1CyPbdQGUH/}
✧ 𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: ${Not Using now}
✧ 𝗚𝗶𝘁𝗛𝘂𝗯: ${adminInfo.github}

╭━─━─━─≪✠≫─━─━─━╮
       🎀 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 🎀
╰━─━─━─≪✠≫─━─━─━╯
✧ 𝗡𝗮𝗺𝗲: ${botInfo.name}
✧ 𝗣𝗿𝗲𝗳𝗶𝘅: ${botInfo.prefix}
✧ 𝗨𝗽𝘁𝗶𝗺𝗲: ${uptimeString}
✧ 𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗧𝗶𝗺𝗲: ${currentTime}
`;

    return message.reply({
      body: responseMessage,
      attachment: attachment
    });

  } catch (err) {
    console.log("INFO CMD ERROR:", err);
    return message.reply("❌ Error sending info.");
  }
  }
