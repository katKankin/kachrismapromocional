/**
 * Tecnológico de Costa Rica
 * Proyecto III- Introducción al desarrollo de páginas web
 * Noviembre, 2019
 * @author Masiel Rojas
 * @author Christian Sánchez
 * @author Katherine Tuz
 * 
 */

/**
 * Se define la configuración de la aplicación para acceder a Firebase.
 */ 
var config = {
    apiKey: "AIzaSyB-IIo_f4Gc-0dy26AUdZRb-CjfyG5j4Wg",
    authDomain: "kachrisma-73ae2.firebaseapp.com",
    databaseURL: "https://kachrisma-73ae2.firebaseio.com/",
    storageBucket: "kachrisma-73ae2.appspot.com"
  };

firebase.initializeApp(config);
var database = firebase.database();
 
/****************************************************************************************************************/ 
/**
 * @function recuperar Recupera información de la base de datos según parámetro recibido.
 * @param dato 
 * @returns {undefined} 
 */
function recuperar(dato){
        var database_ref = firebase.database().ref();
        database_ref.on('child_added', function(snapshot_v) {
            if (snapshot_v.val().usuario === dato
                || snapshot_v.val().nombre === dato
                || snapshot_v.val().id === dato
                ||snapshot_v.val().etiqueta === dato
                || snapshot_v.val().descripcion === dato
            ) {
                var a= snapshot_v.val();
                var tr = document.createElement("tr"), 
                    tdNombre=document.createElement("td"),
                    tdUsuario = document.createElement("td"),                           
                    tdId = document.createElement("td"),                
                    tdEtiqueta = document.createElement("td"),                               
                    tdDescripción = document.createElement("td"),                  
                    tdurl = document.createElement("td"),
                    tdB=document.createElement("td"), 
                    tdC=document.createElement("td"),
                    tdD=document.createElement("td"),
                    tdE=document.createElement("td"),
                    tdA=document.createElement("td") ;
                                                    
                tdA.innerHTML = "_______";
                tdB.innerHTML = "_______";
                tdC.innerHTML = "_______";
                tdD.innerHTML = "_______";
                tdE.innerHTML = "_______";
                tdNombre.innerHTML =  a.nombre;   
                tdUsuario.innerHTML = a.usuario;                
                tdId.innerHTML = a.id +" ";           
                tdEtiqueta.innerHTML = a.etiqueta;             
                tdDescripción.innerHTML = a.descripcion ;             
                tdurl.innerHTML ="https://kachrisma.azurewebsites.net/functioncall/function?id="+a.id;
    
                tr.appendChild(tdNombre);
                tr.appendChild(tdA);
                tr.appendChild(tdUsuario);
                tr.appendChild(tdB);
                tr.appendChild(tdId);
                tr.appendChild(tdC);
                tr.appendChild(tdEtiqueta);
                tr.appendChild(tdD);
                tr.appendChild(tdDescripción); 
                tr.appendChild(tdE);
                tr.appendChild(tdurl);              
            }
            funcionesTable.appendChild(tr);
        });        
}

/**
 * @function buscarPorUsuario Busca una función por usuario en la base de datos de acuerdo a un input.
 * @param obj      
 * @returns {undefined} 
 */
function buscarPorUsuario(obj){
    let texto = document.getElementById("datoBuscar");
    if (texto.value != "") {   
        borrarTabla();
        recuperar(texto.value);     
        texto.value = "";
    }
    else{
        return alert("Por favor ingrese un nombre de usuario")
    }
}
/**
 * @function buscarPorId Busca una función por id en la base de datos de acuerdo a un input.
 * @param obj      
 * @returns {undefined} 
 */
function buscarPorId(obj){
    let texto = document.getElementById("datoBuscar");
    if (texto.value != "") {   
        borrarTabla();
        recuperar(Number(texto.value));     
        texto.value = "";
    }
    else{
        return alert("Por favor ingrese un Id")
    }
}
/**
 * @function buscarPorDescripcion Busca una función por descripción en la base de datos de acuerdo a un input.
 * @param obj      
 * @returns {undefined} 
 */
function buscarPorDescripcion(obj){
    let texto = document.getElementById("datoBuscar");
    if (texto.value != "") {  
        borrarTabla(); 
        recuperar(texto.value);     
        texto.value = "";
    }
    else{
        return alert("Por favor ingrese una descripción")
    }
}
/**
 * @function buscarPorEtiqueta Busca una función por etiqueta en la base de datos de acuerdo a un input.
 * @param obj      
 * @returns {undefined} 
 */
function buscarPorEtiqueta(obj){
    let texto = document.getElementById("datoBuscar");
    if (texto.value != "") {   
        borrarTabla();
        recuperar(texto.value);     
        texto.value = "";
    }
    else{
        return alert("Por favor ingrese una etiqueta")
    }
}
/**
 * @function buscarPorFuncion Busca una función por nombre de función en la base de datos de acuerdo a un input.
 * @param obj      
 * @returns {undefined} 
 */
function buscarPorFuncion(obj){
    let texto = document.getElementById("datoBuscar");
    if (texto.value != "") {  
        borrarTabla();
        recuperar(texto.value);     
        texto.value = "";
    }
    else{
        return alert("Por favor ingrese un nombre de función")
    }
}
/**
 * @function borrarTabla Limpia la tabla del registro de búsqueda de funciones
 * @param    
 * @returns {undefined} 
 */
function borrarTabla(){
    var Table = document.getElementById("funcionesTable");
    Table.innerHTML = "";
}

/****************************************************************************************************************/ 
/**
 * Variable que guarda funciones que tienen los siguientes datos: usuario, nombre, id, etiqueta, descripción, dependencia, código.
 */
var listaFunciones = [];

/**
 * @function verificarID Busca si dado un ID existe en la base de datos. Actualiza la variable existeID
 * @param id    
 * @returns {undefined} 
 */
function verificarID(idBuscar){
    var database_ref = firebase.database().ref();
    database_ref.on('child_added', function(snapshot_v) {
        if (snapshot_v.val().id === idBuscar) {
            console.log("id: "+snapshot_v.val().id + "buscando" +idBuscar); 
           return alert("El ID ya existe. Cambie el ID y refresque la página")                       
        } 
    });  
}
/**
 * Variable que define el diseño del campo para agregar el código.
 */
var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    autoCloseTags: true
});
editor.setSize("600", "200");

/**
 * @function añadirFuncion Añade funciones a una lista.
 * @param obj      
 * @returns {undefined} 
 */
function añadirFuncion(obj){
    var mifuncion = []; //Se guardan los datos de la función insertada.
    let usuario = document.getElementById("nombreUsuario");
    let nombre = document.getElementById("nombreFuncion");
    let id = document.getElementById("idFuncion"); 
    let etiqueta = document.getElementById("etiquetaFuncion");
    let descripcion = document.getElementById("descripcionFuncion");
    let dependencia = document.getElementById("dependenciaFuncion"); 
 
    verificarID(Number(id.value));//Verifica si el ID ingresado ya existe 
    
    if (usuario.value != "" && nombre.value != "" && id.value != "" && etiqueta.value != "" &&
    descripcion.value != "" && dependencia.value != "" && editor.getValue() != "")  { 
        mifuncion.push(usuario.value);
        mifuncion.push(nombre.value);
        mifuncion.push(Number(id.value));
        mifuncion.push(etiqueta.value);
        mifuncion.push(descripcion.value);
        mifuncion.push(Number(dependencia.value));
        mifuncion.push(editor.getValue());
        listaFunciones.push(mifuncion);
    }
    else{
        return alert("Por favor complete el formulario")
    }
}
/**
 * @function enviaFuncion Carga todas las funciones de la listaFunciones a la base de datos.
 * @param obj      
 * @returns {undefined} 
 */
function enviaFuncion(obj){
    for(var arreglo in listaFunciones) {  
            var nuevaFuncion = new funcion(listaFunciones[arreglo][0], listaFunciones[arreglo][1], 
                listaFunciones[arreglo][2], listaFunciones[arreglo][3], listaFunciones[arreglo][4],
                listaFunciones[arreglo][5], listaFunciones[arreglo][6]);
            firebase.database().ref().push(nuevaFuncion); 
    }
    alert("Los datos han sido cargados!"); 
}
