//moment.js config Producto
moment.updateLocale('es', {
    relativeTime : {
        future: "En %s",
        past:   "Hace %s",
        s  : 'unos segundos',
        ss : '%d segundos',
        m:  "un minuto",
        mm: "%d minutos",
        h:  "una hora",
        hh: "%d horas",
        d:  "un día",
        dd: "%d días",
        w:  "una semana",
        ww: "%d semanas",
        M:  "un mes",
        MM: "%d meses",
        y:  "un año",
        yy: "%d años"
    }
});
moment.locale('es')

//const
const articontainer = document.querySelector('#maincontainer')
const dbART = db.collection(firestoredb)
const bye = document.querySelector('#wrap')
var modalshow = new bootstrap.Modal(document.getElementById('showphoto'))
const imgshow = document.querySelector('#imgshow')

var pprod = [];

// --> GET DATA <-- //

dbART.get().then((querySnapshot) => {
    //get
    byebye()
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const hb = doc.data();
        var templastModified = moment(hb.lastModified, "x").fromNow();
        var vlastModified;
        if (templastModified === 'Invalid date') {
            vlastModified = 'nolasttime';
        } else {
            vlastModified = templastModified
        }
        var tags = hb.tag;
        var sed= '';
        tags.forEach(e => {
            sed = sed + `<span class="badge bg-success">${e}</span>      `
        })
        if (hb.visible) {
            articontainer.innerHTML += /*html*/`
            <div class="col">
                <div class="card shadow-sm">
                    <!-- <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> -->
                    <img class="card-img-top" style="max-height: 300px" width="auto" onclick="showw('${doc.data().imageURL}')" src="${doc.data().imageURL}">
                    <div class="card-body">
                    <h5 class="card-title">${doc.data().title}</h5>
                    ${sed}
                    <br>
                    <small class="text-muted">${doc.data().code}</small>
                    <p class="card-text">${(doc.data().description).substr(0, 100)}<b>...</b></p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <button type="button" onclick="opeen('${doc.data().code}')" class="btn btn-sm btn-outline-secondary">Ver</button>
                        <button type="button" onclick="edit('${doc.data().code}')" class="btn btn-sm btn-outline-secondary">Editar</button>
                        </div>
                        <small class="text-muted">${vlastModified}</small>
                    </div>
                    </div>
                </div>
            </div>
        `
        } 
        pprod.push({title: hb.title, code: hb.code, description: hb.description, price: hb.price, imageURL: hb.imageURL})
    });
});

var filtrart = (tex)=> {
    //console.log(formulario.value) 
    //resultado.innerHTML = ''
    const texto = tex.toLowerCase();
    for(let ruta of pprod){
        let nombre = ruta.code.toLowerCase();
        if (nombre.indexOf(texto) !== -1){
            //resultado.innerHTML +=
            return `<a class="plosd" href="ver.html#${ruta.code}"><p style="margin-bottom: 5px;" class="itemrr">Titulo: ${ruta.title} - Información adicional: ${ruta.price}</p></a>`
        }
    }
    /* if(resultado.innerHTML === ''){
        resultado.innerHTML = `<li>Articulo no encontrada...</li>`
    } */
}

function opeen(code, visible = true) {
    window.location = `ver.html#${code}`
}
function edit(code) {
    window.location = `upload.html#${code}`
}

/* dev */
function cds(code, visible = true) {
    if (visible == true) {
        db.collection(firestoredb).doc(code).set({
            visible: true,
        },  { merge: true })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    } else if (visible == false) {
        db.collection(firestoredb).doc(code).set({
            visible: false,
        },  { merge: true })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
}

function byebye() {
    wrap.classList = 'd-none'
}

function showw(imgurle) {
    imgshow.src = imgurle
    modalshow.show()
}

window.addEventListener('keyup', function(e){
    var kcode = e.keyCode
    if (kcode === 119 /* F8 */) {
        document.getElementById('verlinkk').click();
    } else if (kcode === 120 /* F9 */) {
        document.getElementById('uploadlink').click();

    } else {
        //
    }
})

document.getElementById('search').addEventListener('submit', function(e) {
    e.preventDefault();
    var msss = (document.getElementById('searchode').value).toUpperCase();
    window.location = 'ver.html#' + msss
})