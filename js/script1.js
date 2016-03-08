$(function(){
	//alert("Bien");
	verifierIdentite();
	chargerSesCorrespondants();
	setInterval(verifierNouveauMessage,5000);
	setInterval(creerNouveauElementTextCorrespondant,6000);
	setInterval(marquerPresence,5000);
	setInterval(voirPersonnesEnLigne,5000);
	setInterval(chargerCorrespondantsRecents,5000);
});

var numeroMatricule;
var numeroCorrespondant;

function chargerCorrespondantsRecents(){
	var donnees = {
		"numeroMatricule":numeroMatricule,
		"activite":"voirContactsRecents"
	};
	
	$.post(adresseServeur+"/marquerPresence.php",donnees,function(recu){
		//alert(recu);
	});
}

function voirPersonnesEnLigne(){
	$.get(adresseServeur+"/marquerPresence.php",{
			"activite":"ListerEnLigne"
		},function(recu){
			//alert(recu);
		$("#personnesConnectees #affichagePersonnesConnectees").html(recu);
	});
}

function marquerPresence(){
	$.get(adresseServeur+"/marquerPresence.php",{
			"numeroMatricule":numeroMatricule,
			"activite":"MarquerPresence"
	},function(recu){
		//alert(recu);
		$("#personnesRecentes #affichagePersonnesRecentes").html(recu);
	});
}

/*
function marquerPresence(){
	$.get(adresseServeur+"/marquerPresence.php",{
			"numeroMatricule":numeroMatricule,
			"activite":"MarquerPresence"
		},function(reponse){
		alert(reponse);
	});
}

*/
function verifierIdentite(){
	var numeroMatr = window.localStorage.getItem("numeroMatricule");
	if(numeroMatr != ""){
		numeroMatricule = numeroMatr;
	}else{
		window.location.replace("index.html");
	}
}

function seDeconnecter(){
	if(confirm("Etes vous sur de vous deconnecter?")){
		window.localStorage.setItem("numeroMatricule","");
		window.location.replace("index.html");
	}
}

function chargerSesCorrespondants(){
	$("#zoneCorrespondants #affichageCorrespondants").load(adresseServeur + "/identiteEtudiant.php?typeIdentite=1&toutLeMonde=un");
}

function chargerToutLeMonde(){
	//alert("Good");
}

//var idDestinataireTest = "01612";

function verifierNouveauMessage(){
	//alert("Bien");
	var donnees = {
		"activite":"verifierMessage",
		"destinataire":numeroCorrespondant,
		"moi":numeroMatricule
	};
	
	$.post(adresseMessagerie,donnees,function(recu){
		//$("#testMessage").html(recu);
		//alert("Merci beaucoup");
		if(recu != 0){
			//alert("Nouveau message!");
			$("#testMessage").html(recu);
		}
	});
	//$("#testMessage").load();
}



function chargerNouveau(){
	
}

var adresseServeur = "http://192.168.1.230/newlib/coteServeur";
adresseServeur = "http://127.0.0.1/workSpace/coteServeur";
var adresseMessagerie = "http://192.168.1.230/newlib/coteServeur/centreMessage.php";
adresseMessagerie = "http://127.0.0.1/workSpace/coteServeur/centreMessage.php";

function chatterAvec(idPersonne){
	$("#identiteCorrespondant #idPropre").load(adresseServeur + "/identiteEtudiant.php?typeIdentite=courte&idPersonne="+idPersonne,[],function(reception){
		numeroCorrespondant = idPersonne;
		chargerAnciensMessages();
	});
}

function envoyerMessage(loginEnvoi,contenuMessage){
	if(numeroCorrespondant == null) return false;
	var donnees = {
		"loginEnvoi":numeroMatricule,
		"contenuMessage":contenuMessage,
		"numeroMatricule":numeroCorrespondant
	};
	
	$.post(adresseMessagerie,donnees,function(reception){
		if(reception != "8") $(".unMessage:first .statutImage").attr("src","img/imageBad.gif");
		else $(".unMessage:first .statutImage").attr("src","img/imageGood.gif");
	});
}



function receptionMessage(loginReception){
	
	/*$("#zoneReceptionMessage").load(adresseServeur,[],function(reception){
		
		alert("Reception ok! " + reception);
	});*/
}

function chargerAnciensMessages(){
	//$("#anciensMessages").load();
	$("#anciensMessages").html(" ");
	$("#messageAuCorrespondant").html(" ");
	if(numeroCorrespondant != "" && numeroMatricule != ""){
		var donnees = {
			"activite":"obtenirTousLesMessages",
			"destinataire":numeroCorrespondant,
			"moi":numeroMatricule
		};
		$.post(adresseMessagerie,donnees,function(recu){
			$("#anciensMessages").html(recu);
		});
	}
}

var testEnTrainDecrire = false;


function creerNouveauElementTextCorrespondant(){
	
	if(numeroCorrespondant != "" && testEnTrainDecrire == false){
		
		var donnees = {
			"activite":"obtenirMessage",
			"destinataire":numeroCorrespondant,
			"moi":numeroMatricule
		};
		
		$.post(adresseMessagerie,donnees,function(recu){
			//alert(recu);
			if(recu == "0"){
				
			}else{
				var zone = document.getElementById("messageAuCorrespondant");
				var conteneurText = document.createElement("span");
				var msg = document.createTextNode("Merci beaucoup pour toutes les activites du jour");
				conteneurText.appendChild(msg);
				var eltDiv = document.createElement("div");
				eltDiv.setAttribute("class","unMessage messageCorrespondant");
				eltDiv.appendChild(conteneurText);
				$(".unMessage").filter(":first").before(eltDiv);
				$(eltDiv).css("background","pink");
				$(eltDiv).html(recu);
			}
		});
	}
	
	
	
	//$(eltDiv).load("http://localhost?activite=obtenirMessage");
}

function creerNouveauElementText(){
	//alert("Good");
	testEnTrainDecrire = true;
	var zone = document.getElementById("messageAuCorrespondant");
	var conteneurText = document.createElement("span");
	conteneurText.setAttribute("contenteditable","true");
	//var message = document.createTextNode("Merci beaucoup");
	
	var eltDiv = document.createElement("div");
	eltDiv.setAttribute("class","unMessage");
	//conteneurText.appendChild(message);
	eltDiv.appendChild(conteneurText);
	eltDiv.appendChild(document.createElement("br"));
	
	var imageStatut = document.createElement("img");
	imageStatut.setAttribute("src","img/imageFetch.gif");
	imageStatut.setAttribute("style","float:right;");
	imageStatut.setAttribute("class","statutImage");
	
	var zoneDate = document.createElement("div");
	var laDatePropre = document.createTextNode(laDate());
	//zoneDate.appendChild(laDatePropre);
	//zoneDate.appendChild(imageStatut);
	//zoneDate.style.color = "red";
	//alert("Tres bien");
	eltDiv.appendChild(laDatePropre);
	eltDiv.appendChild(imageStatut);
	$(".unMessage").filter(":first").before(eltDiv);
	$(".unMessage:first span").focus();
	$(".unMessage:first span").blur(function(){
		testEnTrainDecrire = false;
		if($(this).text() == ""){
			$(".unMessage:first").slideUp("slow",function(){
				$(".unMessage:first").remove();
			});
		}else{
			$(this).attr("contenteditable","false");
			if(numeroCorrespondant == "") return false;
			envoyerMessage(numeroCorrespondant,$(this).html());
			//$(this).text("Ok, merci");
		}
	});

	
	
	
}

function laDate(){
	var la_date = new Date();
	var l_heure = la_date.getHours();
	var la_minute = la_date.getMinutes();
	var la_seconde =  la_date.getSeconds();
	var le_jour = la_date.getDay();
	var le_mois = la_date.getMonth();
	var l_annee = la_date.getYear();
	if(la_minute < 10) la_minute = "0" + la_minute;
	if(l_heure < 10) l_heure = "0" + l_heure;
	return l_heure + ":" + la_minute;
}

function obtenirHeure(){
	var la_date = new Date();
	return la_date.getHours() + ":" + la_date.getMinutes() + ":" + la_date.getSeconds();
}	

function obtenirDate(){
	var la_date = new Date();
	return la_date.getMonth() + "/" + la_date.getDay() + "/" + la_date.getFullYear();
}
