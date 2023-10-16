let randomNumber = Math.floor(Math.random() * 100) + 1;
let feedback = document.getElementById("feedback");

function checkGuess() {
    let userGuess = Number(document.getElementById("tahmin").value);

    if (userGuess < 1 || userGuess > 100) {
        feedback.textContent = "Okuduğunu anlayamama problemi var galiba sana 1 - 100 arasında sayı yazmanı söylemiştim.";
        feedback.style.color = "red";
        return;
    }
    if (userGuess == randomNumber) {
        feedback.textContent = "Helal Be Aslanım Doğru Tahmin";
        feedback.style.color = "green";
    } else if (userGuess < randomNumber) {
        feedback.textContent = "Büyük şeyler sever misin o zaman daha büyük bir sayi dene!";
        feedback.style.color = "red";
    } else if (userGuess > randomNumber){
        feedback.textContent = "Biraz daha mı küçültsen sayıyı acaba ha?";
        feedback.style.color = "red";
    }
    else {
        feedback.textContent = "Okuduğunu anlayamama problemi var galiba sana 1 - 100 arasında sayı yazmanı söylemiştim.";
        feedback.style.color = "red";
    }
}
