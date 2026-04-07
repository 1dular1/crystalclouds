require("dotenv").config();
const { Client, GatewayIntentBits, PermissionsBitField } = require("discord.js");
const express = require("express");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const app = express();
app.use(express.json());

client.once("ready", () => {
  console.log("CrystalClouds bot działa");
});

app.post("/create-order", async (req, res) => {
  const { product, quantity, payment } = req.body;

  const guild = await client.guilds.fetch(process.env.GUILD_ID);

  const channel = await guild.channels.create({
    name: `crystal-${Date.now()}`,
    permissionOverwrites: [
      {
        id: guild.roles.everyone,
        deny: [PermissionsBitField.Flags.ViewChannel]
      }
    ]
  });

  await channel.send({
    embeds: [{
      title: "CrystalClouds | Nowe zamówienie",
      description: `
Produkt: ${product}
Ilość: ${quantity}
Płatność: ${payment}
      `
    }]
  });

  res.send({ status: "ok" });
});

app.listen(4000, () => console.log("API bota działa"));

client.login(process.env.DISCORD_TOKEN);
