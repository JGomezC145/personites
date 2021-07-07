//consts 
const input = document.querySelector('#imagepicker');
const inputv = document.querySelector('#videopicker');
var vidd;
const images = document.querySelector('#images');
const formis = document.querySelector('#formis');
    const artitle = document.querySelector('#artitle');
    const arcode = document.querySelector('#arcode');
    const ardesc = document.querySelector('#ardesc');
    const arprice = document.querySelector('#arprice');
    const imgSource = document.getElementById('imgSource')
const prog = document.querySelector('#progressi');
const progv = document.querySelector('#vidprogressi')
const progdivv = document.querySelector('#divprov')
const progdiv = document.querySelector('#divpro');
const arvisible = document.querySelector('#arvisible')
const formedit = document.querySelector('#requestdoc')
const requester = document.querySelector('#requester')
var momodal = new bootstrap.Modal(document.getElementById('request'))
var createdAt;

var isEditing = false;
var videolink;
var finalfile;
var vfinalfile;

var awa = document.querySelector('.toast')
var under = new bootstrap.Toast(awa)


function cs(file = null){
    var xd = file;
    if (xd == null){
        return xd
    } else {
        return "Pelotudo, ponga un archivo"
    }
}

input.onchange = function(e) {
    // Creamos el objeto de la clase FileReader
    let reader = new FileReader();
  
    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);
    finalfile = e.target.files[0];
  
    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = function(){
      let preview = document.getElementById('preview'),
              image = document.createElement('img');
  
        image.src = reader.result;
        image.id = "prepre"
        image.classList = "rounded img-fluid preview"
        image.style = "overflow: scroll;"
  
      preview.innerHTML = '';
      preview.append(image);
    };
}
inputv.onchange = function(e) {
    // Creamos el objeto de la clase FileReader
    let reader = new FileReader();
  
    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);
    vfinalfile = e.target.files[0];
  
    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = function(){
      let preview = document.getElementById('previevideo'),
              image = document.createElement('video');
  
        image.src = reader.result;
        image.setAttribute("controls", "")
        image.id = 'vvideo'
        image.setAttribute("width", "100%")
        image.classList = "ratio preview"
        image.style = "overflow: scroll;"
  
      preview.innerHTML = '';
      preview.append(image);
      vidd = document.querySelector('#vvideo')
    };
}

formedit.addEventListener('submit', function(e) {
    e.preventDefault();

    var newhash = requester.value;

    window.location.hash = newhash;

    requester.placeholder = newhash + '...'
    momodal.hide()
    requester.value = ''

})

formis.addEventListener('submit', function(e){
    e.preventDefault()
    if (imgSource.value === '') {
        awa.classList = "toast hide align-items-center text-dark bg-warning border-0" 
        awa.innerHTML = /*html*/`<div class=\"d-flex\"><div class=\"toast-body\">Cargue la imagen primero</div><button type=\"button\" class=\"btn-close btn-close-dark me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button></div>`
        under.show()
    } else {
        if (videolink) {
            cargarDatos({
                title: artitle.value,
                code: arcode.value,
                description: ardesc.value,
                tag: arprice.value,
                visible: arvisible.checked,
                videoLink: videolink,
                imageURL: imgSource.value,
            });
        } else {
            cargarDatos({
                title: artitle.value,
                code: arcode.value,
                description: ardesc.value,
                tag: arprice.value,
                visible: arvisible.checked,
                imageURL: imgSource.value,
            });
        }
    }
})


/* --> DEV CODE <-- */

const tryman = (file) => {
    return console.log('Nombre: ' + file.name + '. Tamaño: ' + (file.size / 1000000).toFixed(2) + 'MB')

}

/*declarar isEditing*/ 
function edit() {
    if (isEditing) {
        arcode.setAttribute('disabled', '');
        //input.setAttribute('disabled', '');
        //inputv.setAttribute('disabled', '')
    } else {
        arcode.removeAttribute('disabled');
        //input.removeAttribute('disabled');
        //inputv.removeAttribute('disabled')
    }
}

const progr = (val) => {
    if (val === 100) {
        prog.classList = "progress-bar bg-success readdy"
        prog.innerHTML = '¡Cargado!';
    } else {
        prog.classList = "progress-bar"
        prog.setAttribute("aria-valuemax", val)
        prog.style = `width: ${val}%`
        prog.innerHTML = val + '%';
    }
    
}
const progrv = (val) => {
    if (val === 100) {
        progv.classList = "progress-bar bg-success readdy"
        progv.innerHTML = '¡Cargado!';
    } else {
        progv.classList = "progress-bar"
        progv.setAttribute("aria-valuemax", val)
        progv.style = `width: ${val}%`
        progv.innerHTML = val + '%';
    }
    
}

/* --> FIREBASE CODE <-- */

function tete() {
    // console.log(finalfile.name);
    progdiv.classList = 'progress activ'
    var uploadTask = storageRef.child(imageStorage + finalfile.name).put(finalfile);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
      progr(progress);
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
  
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        alert('User does not have permission to access the object');
        break;
  
      case 'storage/canceled':
        // User canceled the upload
        alert('User canceled the upload');
        break;
  
      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        alert('Error: ')
        break;
    }
  }, function() {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
      imgSource.value = downloadURL;
      progr(100)
    });
  });
}

/*video subir*/
function vide() {
    // console.log(finalfile.name);
    if (!vfinalfile) {return 'clase'}
    progdivv.classList = 'progress activ'
    var uploadTask = storageRef.child(videoStorage + vfinalfile.name).put(vfinalfile);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
      progrv(progress);
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
        
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        alert('User does not have permission to access the object');
        break;
  
      case 'storage/canceled':
        // User canceled the upload
        alert('User canceled the upload');
        break;
  
      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        alert('Error: ')
        break;
    }
  }, function() {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
      videolink = downloadURL;
      progrv(100)
    });
  });
}
/*function cargarDatos(title, code, description, price, imageURL = false) {
    console.info(`Titulo: ${title} \n codigo: ${code} \n desc: ${description} \n price: ${price} \n image: ${imageURL}`)
}*/

function cargarDatos(metadata = null) {
    //Metadata formatting
    /*
    var metadata = {
        title: '',
        code: '',
        description: '',
        tag: '',
        visible: true||false,
        videolink: [optional],
        imageURL: ''
    }
    */

    if (isEditing) {

    } else {
        createdAt = new Date().getTime();
    }
    if (metadata === null) {
        console.error("Can't data upload without metadata :/")
        return false
    } else if (metadata.title === null || metadata.code === null || metadata.description === null || metadata.price === null || metadata.imageURL === null) {
        console.error("Some element of the metadata is missing")
        return 0
    } else if (metadata.title === '' || metadata.code === '' || metadata.description === '' || metadata.tag === '' || metadata.imageURL === '') {
        console.error("BE SERIUOS MADAFACKER")
    } else {
        //console.warn(`Titulo: ${metadata.title} \n codigo: ${metadata.code} \n desc: ${metadata.description} \n price: ${metadata.price} \n image: ${metadata.imageURL}`)
        var docID = (metadata.code).toUpperCase();
        if (metadata.videoLink) {
            db.collection(firestoredb).doc(docID).set({
                title: metadata.title,
                code: (metadata.code).toUpperCase(),
                description: metadata.description,
                tag: (metadata.tag).split(';'),
                visible: metadata.visible,
                videoLink: metadata.videoLink,
                imageURL: metadata.imageURL,
                lastModified: new Date().getTime(),
                createdAt: createdAt
            })
            .then(() => {
                artitle.value = "";
                arcode.value = "";
                ardesc.value = "";
                arprice.value = "";
                imgSource.value = "";
                videolink = '';
                awa.classList = "toast hide align-items-center text-white bg-success border-0" 
                awa.innerHTML = /*html*/`<div class="d-flex"><div class="toast-body">Los datos se han subido correctamente</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>`
                under.show()
                progdiv.classList = 'progress defa'
                progdivv.classList = 'progress defa'
                progr(0)
                progrv(0)
                document.getElementById('preview').innerHTML = "waiting for image..."
                document.getElementById('previevideo').innerHTML = "waiting for video..."
                input.value = ""
                inputv.value = ""
                isEditing = false
                edit()
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                awa.classList = "toast hide align-items-center text-white bg-danger border-0" 
                awa.innerHTML = /*html*/`<div class=\"d-flex\"><div class=\"toast-body\">Ha habido un erro a la hora de subir los datos.</div><button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button></div>`
                under.show()
            });
        } else {
            db.collection(firestoredb).doc(docID).set({
                title: metadata.title,
                code: metadata.code,
                description: metadata.description,
                tag: (metadata.tag).split(';'),
                visible: metadata.visible,
                imageURL: metadata.imageURL,
                lastModified: new Date().getTime(),
                createdAt: createdAt
            })
            .then(() => {
                artitle.value = "";
                arcode.value = "";
                ardesc.value = "";
                arprice.value = "";
                imgSource.value = "";
                videolink = '';
                awa.classList = "toast hide align-items-center text-white bg-success border-0" 
                awa.innerHTML = /*html*/`<div class="d-flex"><div class="toast-body">Los datos se han subido correctamente</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>`
                under.show()
                progdiv.classList = 'progress defa'
                progdivv.classList = 'progress defa'
                progr(0)
                progrv(0)
                document.getElementById('preview').innerHTML = "waiting for image..."
                document.getElementById('previevideo').innerHTML = "waiting for video..."
                input.value = ""
                inputv.value = ""
                isEditing = false
                edit()
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                awa.classList = "toast hide align-items-center text-white bg-danger border-0" 
                awa.innerHTML = /*html*/`<div class=\"d-flex\"><div class=\"toast-body\">Ha habido un erro a la hora de subir los datos.</div><button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button></div>`
                under.show()
            });
        }
    }
    
}

var myModalEl = document.getElementById('videopanel')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
    vidd.pause()
})


//Verificar si hay un codigo similar
/*
var filtrart = (tex)=> {
    //console.log(formulario.value) 
    resultado.innerHTML = ''
    const texto = tex.toLowerCase();
    for(let ruta of pprod){
        let nombre = ruta.id.toLowerCase();
        if (nombre.indexOf(texto) !== -1){
            resultado.innerHTML += `
            <a class="plosd" href="#${ruta.img}"><p style="margin-bottom: 5px;" class="itemrr">Titulo: ${ruta.title} - Información adicional: ${ruta.price}</p></a>
            `
        }
    }
    if(resultado.innerHTML === ''){
        resultado.innerHTML = `<li>Articulo no encontrada...</li>`
    }
}
*/

window.onhashchange = function(){
    mime()
}

function mime() {
    hash = (window.location.hash).replace('#', '')
    if (hash === "" || hash === null) {
        
    } else {
        var docRef = db.collection(firestoredb).doc(hash)
        docRef.get().then((doc) => {
            if (doc.exists) {
                isEditing = true
                edit()
                // console.log("Document data:", doc.data());
                const hb = doc.data()
                /*avisar*/
                awa.classList = "toast hide align-items-center text-white bg-danger border-0" 
                awa.innerHTML = /*html*/`<div class=\"d-flex\"><div class=\"toast-body\">Se han actualizado los datos, edita!</div><button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button></div> <br> <div class=\"d-flex\"><div class=\"toast-body\">Recuerda que no se puede editar imagenes ni videos</div><button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button></div>`
                under.show()
                /* config */
                artitle.value = hb.title;
                arcode.value = hb.code;
                ardesc.value = hb.description;
                arprice.value = hb.price;
                imgSource.value = hb.imageURL;
                createdAt = hb.createdAt;
                document.getElementById('preview').innerHTML = `<img class="img-fluid rounded preview" src="${hb.imageURL}">`
                document.getElementById('previevideo').innerHTML = `<video class="ratio preview" width="100%" id="vvideo" controls src="${hb.videoLink}"></video>`
                arvisible.checked = hb.visible;
                vidd = document.querySelector('#vvideo')
                /*console*/
                console.log(doc.data());
            } else {
                // doc.data() will be undefined in this case
                awa.classList = "toast hide align-items-center text-white bg-danger border-0" 
                awa.innerHTML = /*html*/`<div class=\"d-flex\"><div class=\"toast-body\">No hemos encontrado ese codigo, ¿seguro que esta bien?</div><button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button></div>`
                under.show()
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            awa.classList = "toast hide align-items-center text-white bg-danger border-0" 
            awa.innerHTML = /*html*/`<div class=\"d-flex\"><div class=\"toast-body\">Ha habido un error obteniendo el documento.</div><button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button></div>`
            under.show()
        });
    }
    
}

function system() {
    hash = (window.location.hash).replace('#', '')
    if (hash === "" || hash === null) {

    } else {
        mime()
    }
}

system()

window.addEventListener('keyup', function(e){
    var kcode = e.keyCode
    if (kcode === 119 /* F8 */) {
        window.location = 'index.html'
    } else if (kcode === 120 /* F9 */) {
        window.location = 'ver.html'

    } else if (kcode === 115 /* F4 */) {
        momodal.show()
    } else {
        //
    }
})

arcode.onchange = function(e) {
    var text = (e.target.value).toUpperCase();
    const errbox = document.querySelector('#errbox')
    const codecon = document.querySelector('#codecont')
    if (isEditing) {

    } else {
        db.collection(firestoredb).doc(text).get().then((doc) => {
            if (doc.exists) {
                errbox.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:rgba(0, 0, 0, 1);transform:;-ms-filter:"><path d="M11.001 10H13.001V15H11.001zM11 16H13V18H11z"></path><path d="M13.768,4.2C13.42,3.545,12.742,3.138,12,3.138s-1.42,0.407-1.768,1.063L2.894,18.064 c-0.331,0.626-0.311,1.361,0.054,1.968C3.313,20.638,3.953,21,4.661,21h14.678c0.708,0,1.349-0.362,1.714-0.968 c0.364-0.606,0.385-1.342,0.054-1.968L13.768,4.2z M4.661,19L12,5.137L19.344,19H4.661z"></path></svg><p>Ya existe un item con este código, si carga los datos a este codigo se modificaran los datos.</p>'
                errbox.classList = 'mb-3 text-danger bg-light rounded d-flex align-middle'
                codecon.classList = 'form-floating mb-1'
            } else {
                errbox.classList = 'mb-2 text-danger bg-light rounded d-none align-middle'
                codecon.classList = 'form-floating mb-3'
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
}