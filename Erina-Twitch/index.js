const tmi = require('tmi.js');
const prefix = "!";
const reactions = require('./reactions.js');
var Quotes = ["\Abandonner est un signe de lacheté", "\" C est en encourageant l’individu qu’on révèle et développe ses meilleurs dons.", "\" Soyez celui qui voit la vie du bon côté et en parle avec crédibilité.",  "\" \Vers l'infini et au dela",  "\" I WILL BE BACK","\" Que la force soit avec toi","\" This is partaaaaaa!!!","\" NOM DE DIEU ", "\" \JE SUIS TON PERE", "\"JE SUIS GROUT ","\" ON DIT MERCI QUI, TON PERE ","\"Pikatchu attaque",];

const tmiConfig = {
    options: {
        debug: true
    },
    connection: {
        reconnect:  true
    },
    identity: {
        username: "erinatwitchbot", // FAUT PAS CHANGER 
        password: "oauth:frfk0bd216infrem20gnyp1l9d2z19" // SA NON PLUS
    },
    channels: [
        "flashzo12345" // A CHANGER SUR LE STREAM QUE VOUS VOULEZ QUE LE BOT SOIS
    ]
};

let client = new tmi.client(tmiConfig);

client.connect();

client.on('connected', (adress, port) => {
    console.log(client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port);
    client.say("votre nom de chaine", "Bonjour Twitch Je suis en train de créé un bot");
});



function commandParser(message){
    let prefixEscaped = prefix.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    let regex = new RegExp("^" + prefixEscaped + "([a-zA-Z]+)\s?(.*)");
    return regex.exec(message);
}
function isSubscriber(user){
    return user.subscriber;
}
function isModerator(user){
    return user.mod;
}
function isBroadcaster(user){
    return user.badges.broadcaster == '1';
}
client.on("chat", function (channel, user, message, self) {
	
    if (self) return;

    let sender = user['display-name'];

    if(user['mod'] === false){
        if(message.includes("http:") || message.includes(".com") || message.includes("https:") || message.includes("www.") || message.includes(".fr")){
            client.timeout(channel, sender, 60, "LIEN INTERDIT !!");
			client.say(channel, "LIEN INTERDIT : " + user['display-name'] + " / Banni pour 60 seconde")
        }
    }

    if(user['mod'] === false){
        if(message.includes('fdp') || message.includes('salope') || message.includes('ntm') || message.includes('Fdp') || message.includes('Salope') || message.includes('NTM')|| message.includes('Ntm')|| message.includes('FDP')|| message.includes('SALOPE')){
            client.timeout(channel, sender, 180, "MOT INTERDIT !!");
			client.say(channel, "MOT INTERDIT : " + user['display-name'] + " / Banni pour 180 seconde")
     
        }
    }

    if(message == "!youtube") {
        client.say(channel, "Le lien youtube"); // METTRE SA CHAINE YOUTUBE
    }
  if (message == "!quote") {
    	var rand = Quotes[Math.floor(Math.random() * Quotes.length)];
		client.say(channel, rand);
	}
  
 client.action()
   
});
client.on('chat', (channel, user, message, isSelf) => {
    if (isSelf) return;

    let fullCommand = commandParser(message);
    
    if(fullCommand){
        let command = fullCommand[1];
        let param = fullCommand[2];
        
        switch(command){
            case "bonjour":
    if(isModerator(user)){
        client.say(channel, "Bonjour " + user['display-name'] + ", mon rôle de Bot est de t'aider a géré le live !");
    } else if(isBroadcaster(user)){
        client.say(channel, "Bonjour " + user['display-name'] + ", je suis content que tu est  penser a moi !");
    } else if(isSubscriber(user)){
        client.say(channel, "Bonjour " + user['display-name'] + ", merci d'avoir souscris à cette chaine !");
    } else {
        client.say(channel, "Bonjour à toi " + user['display-name'] + ", sois le bienvenue sur ce live !");
    }
                break;
		    case "help":
                client.say(channel, "Bienvenue sur le panel d'aide du bot");
				client.say(channel, "Pour l'instant le bot n'a pas de commande.");
                
	  break;
	 
	   case "createur":
     client.say(channel,"Enzo est le createur de se bot encore en cours de développement");
   break;
    case "clear":
  if(isBroadcaster(user)){
          violators = [];
    client.say(channel,"Ont été effacé")
   }else{
    client.say(channel,"Bien essayé, "+user+", mais je ne vous obéis pas.");
  }
		
		break;
		}   
    //default:
       //         client.say(channel, "la Commande '" + command + "'' n'existe pas. Tapez " + prefix + "help pour afficher la list du bot " + client.getUsername());
      //  }
    } else {
        let words = message.toLowerCase().split(" ");
        for(let word of words) {
            let reaction = reactions[word];
            if(reaction){
                client.say(channel, reaction);
            }
        }
    }

});
// BOT CREATE BY ENZO MERCI DE NE PAS S'APPROPRIE SE BOT SA SERAIS UN MANQUE DE RESPECT :)
