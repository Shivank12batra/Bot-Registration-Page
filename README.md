# Bot Registration Page

This is a frontend bot registration page for the WhatsApp Attendance Bot, check the other repo here: [WhatsApp Attendance Automation Bot](https://github.com/Shivank12batra/Whatsapp-Attendance-Automation-Bot)

[https://sggscc-attendance-bot.onrender.com/](https://sggscc-attendance-bot.onrender.com/)

![Screenshot](assets\whatsapp_bot_img.jpg)

## Description

The bot registration page allows users to register for the weekly automated attendance messages of the WhatsApp Attendance Bot. The user's credentials are stored in a MongoDB database for registration purposes. Validation is performed to ensure the correct email and password are provided by logging into the SmartProf application using Puppeteer.

Once registered, the bot will send weekly updates to the users. For more information about the actual workings of the bot, please refer to the [WhatsApp Attendance Automation Bot](https://github.com/Shivank12batra/Whatsapp-Attendance-Automation-Bot) repository.

## Tech Stack Used

- Node.js
- MongoDB
- Mongoose
- Puppeteer (for web scraping and validation of credentials)
