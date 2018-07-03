// Bot Cree par Enzo Merci de ne pas voler le script. !!
// Vous pouvez bien sur l'améliorer comme vous le souhaité.
// J espere que se bot vous plaira


const say = require('say')
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
        "flashzo12345", "erinatwitchbot", "LE NOM DU CHANEL OU VOUS VOULEZ QUU IL SOIS" // A CHANGER SUR LE STREAM QUE VOUS VOULEZ QUE LE BOT SOIS
    ]
};

let client = new tmi.client(tmiConfig);
  
client.connect();

client.on('connected', (adress, port) => {
    console.log(client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port);
   });
   
//-- CECI EST LA PARTIT QUAND UN STREAMEUR REJOINT OU PART -- \\

var onlineMembers = new Array();

client.on("join", function (channel, user, message, self) {
    onlineMembers.push(user) 
    console.log(user + " a rejoint le stream")

})
client.on("part", function (channel, user, message, self) {
    const index = onlineMembers.indexOf(user);
    if (index !== -1) {
        onlineMembers.splice(index, 1);
    }
    console.log(user + " a quitter le stream")
})


// ------------------------------------------------------------- \\

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
        if(message.includes("http:") || message.includes(".com") || message.includes("https:") || message.includes("www.") || message.includes(".fr")){ // A NE PAS CHANGER !!!
            client.timeout(channel, sender, 60, "LIEN INTERDIT !!"); // BAN PENDANT 60 SECONDE
			client.say(channel, "LIEN INTERDIT : " + user['display-name'] + " / Banni pour 60 seconde")
        }
    }

    if(user['mod'] === false){
        if(message.includes('fdp') || message.includes('salope') || message.includes('ntm') || message.includes('Fdp') || message.includes('Salope') || message.includes('NTM')|| message.includes('Ntm')|| message.includes('FDP')|| message.includes('SALOPE')|| message.includes('pd')|| message.includes('PD') || message.includes('enculé')|| message.includes('ENCULE') || message.includes('salaud')|| message.includes('SALAUD') || message.includes('enfoiré')|| message.includes('ENFOIRE') || message.includes('salaudpard')|| message.includes('tg')|| message.includes('TG')                                                                                                                    ){ // LES DIFFERENT MOTS BANNI PAR LE BOT 
            client.timeout(channel, sender, 180, "MOT INTERDIT !!"); // BAN PENDANT 180 SECONDE
			client.say(channel, "MOT INTERDIT : " + user['display-name'] + " / Banni pour 180 seconde")
     
        }
    }
	 if(user['mod'] === false){
		 
		  if(message.includes('jul') || message.includes('JUL') ){
            client.timeout(channel, sender, 300, "MOT STRICTEMENT INTERDIT !!");  // BAN PENDANT 300 SECONDE
			client.say(channel, "JUL = MOT INTERDIT " + user['display-name'] + " / Banni pour 300 seconde")
     
        }
    }
  
    if(message == "!youtube") {
		 client.say(channel, "Ma Chaine Youtube :");
        client.say(channel, "Le lien de votre chaine youtube"); // METTRE SA CHAINE YOUTUBE
    }
	if(message == "!paypal") {
	    client.say(channel, "N'hesité pas a me faire un don sur cette adresse :"); 
        client.say(channel, "Le lien Pour que la personne fasse un don a votre paypal"); // METTRE SA LIEN POUR FAIRE UN DON PAYPAL
    }
	if(message == "!twitch") {
		 client.say(channel, "N'hesité pas a aller vous abonné"); 
        client.say(channel, "Le lien de votre chaine twitch"); // METTRE SA CHAINE TWITCH
    }
	if(message == "!snap") {
		client.say(channel, "N'hesité pas a m'ajouté");
        client.say(channel, "Le lien de votre snap"); // METTRE SON SNAP
    }
	if(message == "!twitter") {
		client.say(channel, "N'hesité pas a me follow");
        client.say(channel, "Le lien de votre twitter"); // METTRE SON TWITTER
    }
  if (message == "!quote") {
    	var rand = Quotes[Math.floor(Math.random() * Quotes.length)];
		client.say(channel, rand);
	}
	
   
 client.action()
   
});
  
client.on('chat', (channel, user, message, isSelf, arg1, arg2) => {
    if (isSelf) return;

    let fullCommand = commandParser(message);
    
    if(fullCommand){
        let command = fullCommand[1];
        let param = fullCommand[2];
        
        switch(command){
            case "bonjour","salut","slt","yo":
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
				client.say(channel, "!bonjour, !salut, !slt, !yo // ET le bot vous répondra");
				client.say(channel, "!createur, Le bot vous parlera de son créateur");
				client.say(channel, "!youtube cela affichera la chaine youtube du streameur");
                client.say(channel, "!paypal, Le bot vous affichera un lien paypal pour faire un don");
				client.say(channel, "!twitch cela affichera la chaine twitch du streameur");
                client.say(channel, "!snap, Le bot vous donnera le snap du streameur");
				client.say(channel, "!twitter cela affichera la chaine twitter du streameur");
                client.say(channel, "!quote cela vous affichera une phrase aléatoire de gameur");
    
	 break;
	   case "createur":
     client.say(channel,"Enzo est le createur de se bot Anti-Link ( pub ) mais aussi Anti-Insulte, des auto-reaction ...");

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