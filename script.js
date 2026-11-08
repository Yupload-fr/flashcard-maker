
// Variables

let currentCard = 0;
let showingAnswer = false; // devient vrai quand l'on doit montrer la réponse
let flashcards = []

/*
    fonction qui crée la variable flashcards à partir de la zone de texte

let flashcards = [
    ["What is 1+1?", "2"],
    ["Capital of France?", "Paris"],
    ["What color is the sky?", "Blue"]
];
*/
function makecard(){ // => boutton submit
    let input = document.getElementById("makerinput").value;

    flashcards = input.split(";").map(card => {
        let [question, answer] = card.split("==");
        return [ question, answer ];
    });

    console.log(flashcards);
    
    // Reset the flashcard system
    currentCard = 0;
    showingAnswer = false;
    // affiche les flashcards
    document.getElementById("output").style.display = "flex";
}

function nextCard() {

    if (flashcards.length === 0){
        document.getElementById("display").textContent =
            "ERROR : please enter questions first"
        return;
    }

    // Make sure currentCard points to an existing card
    if (currentCard >= flashcards.length) {
        currentCard = 0;
    }
    
    if (showingAnswer == false) {
        // Montre la question
        document.getElementById("display").textContent =
            flashcards[currentCard][0];

        showingAnswer = true;

    } else {
        // Montre la réponse
        document.getElementById("display").textContent =
            flashcards[currentCard][1];

        showingAnswer = false;
        currentCard++;

        // Reviens au début quand toutes les flashcards sont utilisés
        if (currentCard >= flashcards.length) {
            currentCard = 0;
        }
    }
}

function closedisplay(){
    document.getElementById("output").style.display = "none";
}

function saveFlashcard() {
    // aller sur ChatGPT pour explication détaillée
    // Récupère le texte écrit dans l'input HTML
    let input = document.getElementById("makerinput").value;

    // Crée un objet Blob contenant notre texte.
    // "text/plain" indique qu'il s'agit de texte brut.
    let blob = new Blob([input], { type: "text/plain" });

    // Crée une URL temporaire qui permet d'accéder au contenu du Blob.
    let url = URL.createObjectURL(blob);

    // Crée un élément HTML <a> (un lien), sans l'afficher sur la page.
    let a = document.createElement("a");

    // Définit la destination du lien : notre Blob.
    a.href = url;

    // --------mon propre code pour choisir le nom du fichier-------------
    let filename = prompt("Entrez un nom pour le fichier pour le sauvegarder");
    
    if (confirm("Confirm " + filename + ".txt ?")){
        alert("Confirmed : " + filename + ".txt saved in Downloads");
    } else {
        alert("Canceled successfully : no file saved");
        return; // arrête la fonction
    }

    // Définit le nom du fichier qui sera téléchargé.
    a.download = (filename + ".txt");

    // Simule un clic sur le lien pour déclencher le téléchargement.
    a.click();

    // Supprime l'URL temporaire pour libérer les ressources utilisées.
    URL.revokeObjectURL(url);
}

function importFlashcard() {

    // Récupère le fichier sélectionné par l'utilisateur
    let file = document.getElementById("importFile").files[0];

    // Vérifie qu'un fichier a bien été sélectionné
    if (!file) return;

    // Crée un lecteur de fichiers
    let reader = new FileReader();

    // Définit ce qui se passe lorsque le fichier est lu
    reader.onload = function() {

        // Place le contenu du fichier dans makerinput
        document.getElementById("makerinput").value = reader.result;

    };

    // Lit le contenu du fichier sous forme de texte
    reader.readAsText(file);
}
