const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');


const sendRegisterMessage = async(number) => {
    console.log(number)
    const client = new Client({
        authStrategy: new LocalAuth()
    });
    
    client.initialize();
      
    client.on("qr", (qr) => {
        qrcode.generate(qr, { small: true });
    });
      
    client.on('authenticated', (session) => {
        console.log('WHATSAPP WEB => Authenticated');
    });
    
    client.on("ready", async () => {
        console.log(number)
        console.log("WHATSAPP WEB => Ready");
        // const number = "9654425881";
        const sendData = {'message' : 'Hola GGSite! You have been succesfully subscribed to the attendance chatbot and will be receiving regular updates about your attendance, specifically the amount of classes that you need to attend in the next ten classes in order to reach a certain % of attendance so that you can manage your college bunks accordingly :)'}
        const sanitized_number = await number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
        const final_number = await `91${sanitized_number.substring(sanitized_number.length - 10)}`; // add 91 before the number here 91 is country code of India
    
        const number_details = await client.getNumberId(final_number); // get mobile number details
        console.log(number_details)
        if (number_details) {
            await client.sendMessage(number_details._serialized, sendData.message); //send message
                console.log('message send successfully!')
        } else {
            console.log(final_number, "Mobile number is not registered");
        }
    });
}

module.exports = sendRegisterMessage


