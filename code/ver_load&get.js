var hash = (window.location.hash).replace('#', '')
var tries = 0
const simple = document.getElementById('simple');

function system() {
    hash = (window.location.hash).replace('#', '')
    if (tries === 2) {
        window.location = 'index.html'
    } else {
        if (hash === "" || hash === "null") {
            tries = tries + 1;
            var newhash = prompt("Ingresa el codigo del item")
            window.location.hash = newhash;
            system()
        } else {
            hash = (window.location.hash).replace('#', '')
            getLoadart(hash)
        }
    }
}

function getLoadart(code, visible = true) {
    tries = 0
    var request = code.toUpperCase();
    var docRef = db.collection(firestoredb).doc(request);

    docRef.get().then((doc) => {
        if (doc.exists) {
            var videodata;
            // console.log("Document data:", doc.data());
            const hb = doc.data()
            if (hb.videoLink) {
                videodata = `<div class="ratio ratio-16x9"><video preload src="${hb.videoLink}" controls></video></div>`
            } else {
                videodata = ''
            }
            var data = {
                title: hb.title,
                code: hb.code,
                description: hb.description,
                price: hb.price,
                imageURL: hb.imageURL
            }
            var tags = hb.tag;
            var sed= '';
            tags.forEach(e => {
                sed = sed + `<span class="badge bg-success">${e}</span>      `
            })
            simple.innerHTML = /*html*/ `
            <div class="card w-75 m-lg-4 m-md-4 shadow" style="height: auto">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="${data.imageURL}" onload="scrolle()" loading="lazy" class="img-fluid rounded-start" max-width="100%" max-height="100%" alt="Foto de ${data.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h2 class="card-title">${data.title}</h2>
                    <p>Tags: </p>${sed}
                    <p class="card-text"><small class="text-muted">${data.code}</small></p>
                    
                    <p class="card-text">${data.description}</p>
                    ${videodata}
                    <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
                    </div>
                </div>
                </div>
            </div>`;
            console.log(doc.data());
        } else {
            // doc.data() will be undefined in this case
            simple.innerHTML = `<code>Error getting document with code: <b>${code}</b>. Please verify if the code is correct.</code>`;
            console.info("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function scrolle() {
    window.scrollTo( 0, 1000 );
}

window.onhashchange = function() { 
    system()
}
system()



window.addEventListener('keyup', function(e){
    var kcode = e.keyCode
    if (kcode === 119 /* F8 */) {
        window.location = 'index.html'
    } else if (kcode === 120 /* F9 */) {
        window.location = 'upload.html'

    } else if (kcode === 115) {
        var newhash = prompt("Ingresa el codigo del item")
        window.location.hash = newhash;
    } else {

    }
})

document.getElementById('search').addEventListener('submit', function(e) {
    var msss = document.getElementById('searchode').value;
    window.location = 'ver.html#' + msss
})