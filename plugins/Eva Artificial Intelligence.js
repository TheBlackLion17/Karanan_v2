/* Codded by Phaticusthiccy

Karanan, The Phaticusthiccy's Multifunctional Artificial Intelligence

Karanan AI has more than 50 Gigabyte dataset which including neural calculator,
wikipedia data, sentiment analysis, Instagram workflow with neural cells.

Thanks for Brainshop.ai for a rest connection with non-ethernet interaction
Karanan database. 

Karanan is a multimedia-powered artificial intelligence with its own virtual brain.
Brainshop.ai allow access to load all external conversation for train Neural cells,
from every user's historical conversations.

Think twice about your choices about Karanan. 
May react differently in directed situations. This is completely natural and depends on users.
All message history with Karanan is not exported to any 3rd applications.
Since Karanan works entirely with deep learning, all responsibility belongs to the user.

Arvix Articles About Karanan's System:
>> https://arxiv.org/abs/2106.09461
>> https://arxiv.org/abs/2102.00287
>>https://arxiv.org/abs/2106.06157

Wikipedia Articles About Karanan'a System:
>> https://en.m.wikipedia.org/wiki/Optical_character_recognition
>> https://en.m.wikipedia.org/wiki/Text_mining
>> https://en.m.wikipedia.org/wiki/Natural_language_processing

*/
// ===================================================
/*
Karanan has never been connected to the internet previously.
The Brainshop.ai supports to javascript datasets, so thats way we cloned some datas from Karanan to 
Brainshop.ai. 

Therefore, 100% efficiency cannot be obtained from Karanan Artificial Intelligence.
The voice recognition doesn't work with Karanan infrastructure.
We are using wit.ai's voice recognition for voicy conversation.
The all input datas must be english. We are using google translate before send users inputs.
*/


const Asena = require('../events');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const https = require('https');
const googleTTS = require('google-translate-tts');
const { MessageType, Mimetype, MessageOptions } = require('@adiwajshing/baileys');
const Language = require('../language');
const Lang = Language.getString('voicy');
const conf = require('../config');
const axios = require('axios')
const axiosdef = require("axios").default;
const os = require('os')
const translatte = require('translatte');
const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: conf.HEROKU.API_KEY
});
let baseURI = '/apps/' + conf.HEROKU.APP_NAME;

let wk = conf.WORKTYPE == 'public' ? false : true
var vtalk_dsc = ''
var reply_Karanan = ''
if (conf.LANG == 'TR') vtalk_dsc = 'Karanan sesli sohbetini başlatır.', reply_Karanan = '*Herhangi Bir Sesli Mesaja Yanıt Verin!*'
if (conf.LANG == 'EN') vtalk_dsc = 'Starts to pinky voice chat.', reply_Karanan = '*Reply to Any Voice Message!*'
if (conf.LANG == 'AZ') vtalk_dsc = 'Karanan səsli söhbətinə başlayır.', reply_Karanan = '*Hər hansı bir səsli mesaja cavab verin!*'
if (conf.LANG == 'PT') vtalk_dsc = 'Começa o bate-papo por voz de Karanan.', reply_Karanan = '*Responder a qualquer mensagem de voz!*'
if (conf.LANG == 'RU') vtalk_dsc = 'Запускает голосовой чат Karanan.', reply_Karanan = '*Ответьте на любое голосовое сообщение!*'
if (conf.LANG == 'HI') vtalk_dsc = 'Karanan ध्वनि चैट प्रारंभ करता है', reply_Karanan = '*किसी भी ध्वनि संदेश का उत्तर दें!*'
if (conf.LANG == 'ES') vtalk_dsc = 'Comienza con el chat de voz de Karanan.', reply_Karanan = '*¡Responde a cualquier mensaje de voz!*'
if (conf.LANG == 'ML') vtalk_dsc = 'Karanan വോയ്‌സ് ചാറ്റിലേക്ക് ആരംഭിക്കുന്നു.', reply_Karanan = '*ഏത് വോയ്‌സ് സന്ദേശത്തിനും മറുപടി നൽകുക!*'
if (conf.LANG == 'ID') vtalk_dsc = 'Mulai obrolan suara Karanan.', reply_Karanan = '*Balas Pesan Suara Apapun!*'

const recognizeAudio = () => {
    const headers = new Headers({
        'Content-Type': 'audio/wav',
        "Authorization": `Bearer ${conf.WITAI_API}`,
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked'
    })
    const requestBody = {
        method: "POST",
        body: fs.readFileSync('output.wav'),
        headers: headers
    }
    return fetch("https://api.wit.ai/speech?v=20200219", requestBody)
        .then(response => response.json())
        .then(json => json._text)
}
const convertToWav = file => {
    return ffmpeg(file)
        .audioCodec('pcm_s16le')
        .format('wav')
        .save('output.wav')
}

Asena.addCommand({on: 'text', fromMe: wk, dontAddCommandList: true, deleteCommand: false}, (async (message, match) => {
    if (message.message.startsWith('bot') && conf.FULLKaranan !== 'true') {        
        var unique_ident = message.client.user.jid.split('@')[0]      
        let acc = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0] == 'Asena' ? '7d57838203msh0c5cf65c90a7231p13b461jsn77c8cfa55871' : '7d57838203msh0c582jak19865261js1229n77c8cfa55871'
        let aitalk_mode = message.message.includes('{normal}') ? 'raw' : 'waifu'
        var finm = message.message.replace('bot', '').replace(' ', '')   
        var ainame = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0]
        if (ainame !== 'Asena') return;
        var ldet = lngDetector.detect(finm)
        var trmsg = ''
        if (ldet[0][0] !== 'english') {
            ceviri = await translatte(finm, {from: 'auto', to: 'EN'});
            if ('text' in ceviri) {
                trmsg = ceviri.text
            }
        } else { trmsg = finm }
        var uren = encodeURI(trmsg)
        await axios.get('http://api.brainshop.ai/get?bid=157104&key=VzGieV1tp1IvxPl4&uid=' + unique_ident + '&msg=' + uren).then(async (response) => {
            var fins = ''                           
            if (conf.LANG !== 'EN') {
                ceviri = await translatte(response.data.cnt, {from: 'auto', to: conf.LANG});
                if ('text' in ceviri) {
                    fins = ceviri.text
                }
            } else { fins = response.data.cnt }
            await message.client.sendMessage(message.jid,fins, MessageType.text, { quoted: message.data})
        })
    }
}));
Asena.addCommand({on: 'text', fromMe: false, deleteCommand: false}, (async (message, match) => {
        if (conf.FULLKaranan == 'true' && ((!message.jid.includes('-')) || (message.jid.includes('-') && 
            (( message.mention !== false && message.mention.length !== 0 ) || message.reply_message !== false)))) {
            if (message.jid.includes('-') && (message.mention !== false && message.mention.length !== 0)) {
                message.mention.map(async (jid) => {
                    if (message.client.user.jid.split('@')[0] === jid.split('@')[0]) {
                        var unique_ident = message.client.user.jid.split('@')[0]      
                        let acc = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0] == 'Asena' ? '7d57838203msh0c5cf65c90a7231p13b461jsn77c8cfa55871' : '7d57838203msh0c582jak19865261js1229n77c8cfa55871'
                        let aitalk_mode = message.message.includes('{normal}') ? 'raw' : 'waifu'                       
                        var ainame = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0]
                        if (ainame !== 'Asena') return;
                        var finm = message.message
                        var ldet = lngDetector.detect(finm)
                        var trmsg = ''
                        if (ldet[0][0] !== 'english') {
                            ceviri = await translatte(finm, {from: 'auto', to: 'EN'});
                            if ('text' in ceviri) {
                                trmsg = ceviri.text
                            }
                        } else { trmsg = finm }
                        var uren = encodeURI(trmsg)
                        await axios.get('http://api.brainshop.ai/get?bid=157104&key=VzGieV1tp1IvxPl4&uid=' + unique_ident + '&msg=' + uren).then(async (response) => {
                            var fins = ''                           
                            if (conf.LANG !== 'EN') {
                                ceviri = await translatte(response.data.cnt, {from: 'auto', to: conf.LANG});
                                if ('text' in ceviri) {
                                    fins = ceviri.text
                                }
                            } else { fins = response.data.cnt }
                            await message.client.sendMessage(message.jid,fins, MessageType.text, { quoted: message.data})
                        })
                    }
                })
            } else if (message.jid.includes('-') && message.reply_message !== false) {
                if (message.reply_message.jid.split('@')[0] === message.client.user.jid.split('@')[0]) {
                    var unique_ident = message.client.user.jid.split('@')[0]      
                    let acc = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0] == 'Asena' ? '7d57838203msh0c5cf65c90a7231p13b461jsn77c8cfa55871' : '7d57838203msh0c582jak19865261js1229n77c8cfa55871'
                    var ainame = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0]
                    if (ainame !== 'Asena') return;
                    var finm = message.message
                    var ldet = lngDetector.detect(finm)
                    var trmsg = ''
                    if (ldet[0][0] !== 'english') {
                        ceviri = await translatte(finm, {from: 'auto', to: 'EN'});
                        if ('text' in ceviri) {
                            trmsg = ceviri.text
                        }
                    } else { trmsg = finm }
                    var uren = encodeURI(trmsg)
                    await axios.get('http://api.brainshop.ai/get?bid=157104&key=VzGieV1tp1IvxPl4&uid=' + unique_ident + '&msg=' + uren).then(async (response) => {
                        var fins = ''                           
                        if (conf.LANG !== 'EN') {
                            ceviri = await translatte(response.data.cnt, {from: 'auto', to: conf.LANG});
                            if ('text' in ceviri) {
                                fins = ceviri.text
                            }
                        } else { fins = response.data.cnt }
                        await message.client.sendMessage(message.jid,fins, MessageType.text, { quoted: message.data})
                    })
                }
            } else {
                var unique_ident = message.client.user.jid.split('@')[0]      
                let acc = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0] == 'Asena' ? '7d57838203msh0c5cf65c90a7231p13b461jsn77c8cfa55871' : '7d57838203msh0c582jak19865261js1229n77c8cfa55871'
                var ainame = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0]
                if (ainame !== 'Asena') return;
                var finm = message.message
                var ldet = lngDetector.detect(finm)
                var trmsg = ''
                if (ldet[0][0] !== 'english') {
                    ceviri = await translatte(finm, {from: 'auto', to: 'EN'});
                    if ('text' in ceviri) {
                        trmsg = ceviri.text
                    }
                } else { trmsg = finm }
                var uren = encodeURI(trmsg)
                await axios.get('http://api.brainshop.ai/get?bid=157104&key=VzGieV1tp1IvxPl4&uid=' + unique_ident + '&msg=' + uren).then(async (response) => {
                    var fins = ''                           
                    if (conf.LANG !== 'EN') {
                        ceviri = await translatte(response.data.cnt, {from: 'auto', to: conf.LANG});
                        if ('text' in ceviri) {
                            fins = ceviri.text
                        }
                    } else { fins = response.data.cnt }
                    await message.client.sendMessage(message.jid,fins, MessageType.text, { quoted: message.data})
                })
            }
        }

}));
Asena.addCommand({ pattern: 'vtalk$', desc: vtalk_dsc,dontAddCommandList: true, fromMe: wk }, (async (message, match) => {
    if (!message.reply_message) return await message.client.sendMessage(message.jid,reply_Karanan, MessageType.text, { quoted: message.data }) 
    try {
        const file = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        })
        
        convertToWav(file)
            .on('end', async () => {
                const recognizedText = await recognizeAudio()
                
                var ssc = ''
                ceviri = await translatte(recognizedText, {from: 'auto', to: 'EN' });
                if ('text' in ceviri) {
                    ssc = ceviri.text
                }
                var unique_ident = message.client.user.jid.split('@')[0]
                let acc = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0] == 'Asena' ? '7d57838203msh0c5cf65c90a7231p13b461jsn77c8cfa55871' : '7d57838203msh0c582jak19865261js1229n77c8cfa55871'       
                var ainame = os.userInfo().homedir.split('Whats')[1].split('Duplicated/')[0]
                if (ainame !== 'Asena') return;
        
                var son = encodeURI(ssc)
                await axios.get('http://api.brainshop.ai/get?bid=157104&key=VzGieV1tp1IvxPl4&uid=' + unique_ident + '&msg=' + son).then(async (response) => {
                    var trmsg = ''
                    cevir = await translatte(response.data.cnt, {from: 'auto', to: conf.LANG});
                    if ('text' in cevir) {
                        trmsg = cevir.text
                    }
            
                    let 
                        LANG = conf.LANG.toLowerCase(),
                        ttsMessage = trmsg,
                        SPEED = 1.0
                    var buffer = await googleTTS.synthesize({
                        text: ttsMessage,
                        voice: LANG
                    });
            
                    await message.client.sendMessage(message.jid,buffer, MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: true, quoted: message.data})
                }).catch(async (error) => {
	            console.log(error)
                });
        });
    } catch (err) { console.log(err) }
}));
var fullKaranan_dsc = ''
var already_on = ''
var already_off = ''
var succ_on = ''
var succ_off = ''
if (conf.LANG == 'TR') {
    fullKaranan_dsc = 'Tam fonksiyonel Karanan özelliklerini aktif eder. Hesabınızı bir chatbota dönüştürün!'
    already_on = 'Karanan yapay zekası halihazırda tüm fonksiyonları etkin.'
    already_off = 'Karanan yapay zekası halihazırda yarı fonksiyonel çalışıyor.'
    succ_on = 'Karanan, Tam Fonksiyonel Olarak Açıldı! Lütfen Biraz Bekleyin! ✅'
    succ_off = 'Karanan, Yarı Fonksiyonel Olarak Ayarlandı! Lütfen Biraz Bekleyin! ☑️'
}
if (conf.LANG == 'EN') {
    fullKaranan_dsc = 'Activates full functional Zara features. Turn your account into a ai chatbot!'
    already_on = 'Karanan artificial intelligence is already fully functional.'
    already_off = 'Karanan artificial intelligence is currently running semi-functional.'
    succ_on = 'Karanan Opened Fully Functionally! Please wait a bit! ✅'
    succ_off = 'Karanan Set to Semi-Functional! Please wait a bit! ☑️'
}
if (conf.LANG == 'AZ') {
    fullKaranan_dsc = 'Tam funksional Karanan xüsusiyyətlərini aktivləşdirir. Hesabınızı bir chatbot halına gətirin!'
    already_on = 'Karanan süni intellekt onsuz da tam işlək vəziyyətdədir.'
    already_off = 'Karanan AI hazırda yarı funksionaldır.'
    succ_on = 'Karanan Tamamilə İşlədi! Xahiş edirəm bir az gözləyin! ✅'
    succ_off = 'Karanan Yarı İşləkdir! Xahiş edirəm bir az gözləyin! ☑️'
}
if (conf.LANG == 'RU') {
    fullKaranan_dsc = 'Активирует полнофункциональные функции Karanan. Превратите свой аккаунт в чат-бота!'
    already_on = 'Искусственный интеллект Karanan уже полностью функционален.'
    already_off = 'Karanan AI в настоящее время частично функционирует'
    succ_on = 'Karanan открылась полностью функционально! Подождите немного! ✅'
    succ_off = 'Karanan настроена на полуфункциональность! Подождите немного! ☑️'
}
if (conf.LANG == 'ES') {
    fullKaranan_dsc = 'Activa todas las funciones funcionales de Karanan. ¡Convierta su cuenta en un chatbot!'
    already_on = 'La inteligencia artificial de Karanan ya es completamente funcional.'
    already_off = 'Karanan AI es actualmente semi-funcional.'
    succ_on = '¡Karanan abrió completamente funcionalmente! ¡Por favor espere un poco! ✅'
    succ_off = '¡Karanan se pone semifuncional! ¡Por favor espere un poco! ☑️'
}
if (conf.LANG == 'HI') {
    fullKaranan_dsc = 'पूरी तरह कार्यात्मक Karanan सुविधाओं को सक्रिय करता है। अपने खाते को चैटबॉट में बदलें!'
    already_on = 'ईवा आर्टिफिशियल इंटेलिजेंस पहले से ही पूरी तरह कार्यात्मक है'
    already_off = 'ईवा एआई वर्तमान में अर्ध-कार्यात्मक है'
    succ_on = 'ईवा पूरी तरह कार्यात्मक रूप से खुल गई! कृपया थोड़ी प्रतीक्षा करें! ✅'
    succ_off = 'अर्ध-कार्यात्मक करने के लिए ईवा सेट! कृपया थोड़ी प्रतीक्षा करें! ☑️'
}
if (conf.LANG == 'ML') {
    fullKaranan_dsc = 'പൂർണ്ണമായും പ്രവർത്തനക്ഷമമായ Karanan സവിശേഷതകൾ സജീവമാക്കുന്നു. നിങ്ങളുടെ അക്കൗണ്ട് ഒരു ചാറ്റ്ബോട്ടാക്കി മാറ്റുക!'
    already_on = 'കർണൻ കൃത്രിമബുദ്ധി ഇതിനകം പൂർണ്ണമായി പ്രവർത്തിക്കുന്നു.'
    already_off = 'കർണൻ  AI നിലവിൽ സെമി-ഫംഗ്ഷണൽ ആണ്.'
    succ_on = 'കർണൻ പൂർണ്ണമായും പ്രവർത്തനക്ഷമമായി തുറന്നു! കുറച്ച് കാത്തിരിക്കൂ! ✅'
    succ_off = 'സെമി-ഫങ്ഷണൽ ആയി കർണൻ  സജ്ജമാക്കുക! കുറച്ച് കാത്തിരിക്കൂ! ☑️'
}
if (conf.LANG == 'PT') {
    fullKaranan_dsc = 'Ativa recursos Karanan totalmente funcionais. Transforme sua conta em um chatbot!'
    already_on = 'A inteligência artificial Karanan já está totalmente funcional.'
    already_off = 'Karanan AI está semi-funcional.'
    succ_on = 'Karanan abriu totalmente funcionalmente! Por favor espere um pouco! ✅'
    succ_off = 'Karanan definida como semi-funcional! Por favor espere um pouco! ☑️'
}
if (conf.LANG == 'ID') {
    fullKaranan_dsc = 'Mengaktifkan fitur Karanan yang berfungsi penuh. Ubah akun Anda menjadi chatbot!'
    already_on = 'Kecerdasan buatan Karanan sudah berfungsi penuh.'
    already_off = 'Karanan AI saat ini semi-fungsional.'
    succ_on = 'Karanan Dibuka Sepenuhnya Secara Fungsional! Harap tunggu sebentar! ✅'
    succ_off = 'Karanan Set ke Semi-Fungsional! Mohon tunggu sebentar! ☑️'
}

Asena.addCommand({ pattern: 'fullKaranan ?(.*)', desc: fullKaranan_dsc, fromMe: true,dontAddCommandList: true, usage: '.fullKaranan on / off' }, (async (message, match) => {
    var Karanan_status = `${conf.FULLKaranan}`
    if (match[1] == 'on') {
        if (Karanan_status == 'true') {
            return await message.client.sendMessage(message.jid, '*' + already_on + '*', MessageType.text)
        }
        else {
            await heroku.patch(baseURI + '/config-vars', { 
                body: { 
                    ['FULL_Karanan']: 'true'
                } 
            });
            await message.client.sendMessage(message.jid, '*' + succ_on + '*', MessageType.text)
        }
    }
    else if (match[1] == 'off') {
        if (Karanan_status !== 'true') {
            return await message.client.sendMessage(message.jid, '*' + already_off + '*', MessageType.text)
        }
        else {
            await heroku.patch(baseURI + '/config-vars', { 
                body: { 
                    ['FULL_Karanan']: 'false'
                } 
            });
            await message.client.sendMessage(message.jid, '*' + succ_off + '*', MessageType.text)
        }
    }
}));
