const endpoint = "https://us-central1-manuel-lampert.cloudfunctions.net/HSLU_DEWEBMO_Highscores"; //"http://localhost:8080"

function getScores() {
    return new Promise(function (resolve, reject) {
        fetch(endpoint+'/getScores')
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}

function saveScore() {
    if (!document.getElementById("inputBtn").disabled) {
        let name = document.getElementById("inputName").value;
    
        if (name !== undefined && name !== "") {
            var data = new URLSearchParams();
            data.append("name", name);
            data.append("score", player.score);
        
            fetch(endpoint+"/writeScore", {
                method: "POST",
                body: data
            }).then(res => {
                document.getElementById("inputName").disabled = true;
                document.getElementById("inputBtn").disabled = true;
                player.loadGameScreen();
            }).catch(err => alert(err));
        }
    }
}