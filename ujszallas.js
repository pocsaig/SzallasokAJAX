//POST
document.getElementById("POST").onclick = function () {
    fetch("https://nodejs.sulla.hu/data", {
        method: "POST",
        body: JSON.stringify(BodyForPost),
        headers: {
            "content-type" : "application/json"
        }
    })
}
let BodyForPost = {
    name: document.getElementById("name").value,
    hostname: document.getElementById("hostname").value,
    location: document.getElementById("location").value,
    price: Number(document.getElementById("price").value),
    minimum_nights: document.getElementById("minimum_nights").value
}