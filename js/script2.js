$(function(){
	//alert("Tres bien");
	verifierIdentite();
	var adresseServeur = "http://192.168.1.230/newlib/coteServeur/connexion.php";
	adresseServeur = "http://127.0.0.1/workSpace/coteServeur/connexion.php";
	$("#boutonConnexion").click(function(){
		var numeroMatricule = $("#numeroMatricule").val();
		var motDePasse = $("#motDePasse").val();
		if(numeroMatricule != "" && motDePasse != ""){
			$("#motDePasse").css("border","0px solid gray");
			$("#numeroMatricule").css("border","0px solid gray");
			var donnees = {"numeroMatricule":numeroMatricule,"motDePasse":motDePasse};
			$.post(adresseServeur,donnees,function(reception){traiter(reception);});
			$("#imageFetch").fadeIn("fast");
			$("#boutonConnexion").fadeOut("slow");
			//alert("Envoie avec succes");
		}else{
			//alert("Vide");
			if(numeroMatricule == "") $("#numeroMatricule").css("border","1px solid red");
			else $("#numeroMatricule").css("border","0px solid gray");
			if(motDePasse == "") $("#motDePasse").css("border","1px solid red");
			else $("#motDePasse").css("border","0px solid gray");
		} 
		
	});
});

function verifierIdentite(){
	var numeroMatr = window.localStorage.getItem("numeroMatricule");
	if(numeroMatr != ""){
		window.location.replace("chat.html");
	}else{
		//window.location.replace("index.html");
		alert("Echec");
	}
}

function traiter(recu){
	//alert(recu);
	$("#imageFetch").fadeOut("fast");
	if(recu == "8"){
		//$(window).location("")
		enregistrerMesDonnees();
		window.location.replace("chat.html");
		//alert("Connexion avec succes!");
	}else if(recu == "-2"){
		alert("Echec de connexion");
	}else if(recu == "-3"){
		alert("Certaines donnees ne sont pas arrivees au serveur");
	}
}

function enregistrerMesDonnees(){
	window.localStorage.setItem("numeroMatricule",$("#numeroMatricule").val());
}
