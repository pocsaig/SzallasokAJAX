























































//GET
fetch("https://nodejs.sulla.hu/data")
.then(function (adat) {
    return adat.json()
})
.then(function (data) {
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        document.getElementById("adatok").innerHTML += `
            <div class="card" style="width: 19rem; opacity: 80%;">
                <div class="card-body">
                    <h3 class="card-title">${data[i].id}</h5>
                    <h5 class="card-title">${data[i].name}</h5>
                    <h5 class="card-title">${data[i].hostname}</h5>
                    <h5 class="card-title">${data[i].location}</h5>
                    <h5 class="card-title">${data[i].price}</h5>
                    <h5 class="card-title">${data[i].minimum_nights}</h5>
                    <button class="btn btn-danger" onclick="Delete(${data[i].id})">Törlés</button>
                    <button class="btn btn-warning" onclick="Edit(${data[i].id})">Módosítás</button>
                </div>
            </div>`
    }
})



//DELETE
function Delete(id){
    if (confirm("Biztos törlöd?")) {
        fetch("https://nodejs.sulla.hu/data/"+id,{
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(function(){
            location.reload()
        })
    }
}


//PUT
function Edit(id) {

    let szerkeszt = document.getElementById('edit');
    szerkeszt.style.display = 'block';

        fetch(`https://nodejs.sulla.hu/data/${id}`)
        .then(function(data) {
            return data.json();
        })
        .then(function(data) {
            document.getElementById('megadnev').value = data.name;
            document.getElementById('megadhostname').value = data.hostname;
            document.getElementById('megadlocation').value = data.location;
            document.getElementById('megadprice').value = data.price;
        }).catch(error => {
            console.error('Hiba történt a kérés során:', error);
            alert('Hiba történt az adatok lekérése közben.');
        });

    document.getElementById('Modositfinal').addEventListener('click', () => {
        let bodyforput = JSON.stringify({
            id: Number(id),
            name: document.getElementById('megadnev').value,
            hostname: document.getElementById('megadhostname').value,
            location: document.getElementById('megadlocation').value,
            price: document.getElementById('megadprice').value
        });

        fetch(`https://nodejs.sulla.hu/data/${id}`, {
            method: "PUT",
            body: bodyforput,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            location.reload();
        })
        .catch(error => {
            console.error('Hiba történt a módosítás során:', error);
            alert('Hiba történt a módosítás során.');
        });
    });

    document.getElementById('Modositback').addEventListener('click', () => {
        document.getElementById('edit').style.display = 'none';
    });
}


