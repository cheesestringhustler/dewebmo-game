function getScores() {
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:8080/getScores')
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
        
            fetch("http://localhost:8080/writeScore", {
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