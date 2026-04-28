// IMPORTANTE: Aquí debes importar e inicializar Firebase
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "...";
// import { getFirestore, collection, query, where, getDocs } from "...";

// Variables de estado
let modoRegistroDocente = false;

// Funciones de Navegación de la UI
window.showLogin = (role) => {
    document.getElementById('role-selection').classList.add('hidden');
    if(role === 'docente') {
        document.getElementById('login-docente').classList.remove('hidden');
    } else {
        document.getElementById('login-estudiante').classList.remove('hidden');
    }
}

window.resetView = () => {
    document.getElementById('login-docente').classList.add('hidden');
    document.getElementById('login-estudiante').classList.add('hidden');
    document.getElementById('role-selection').classList.remove('hidden');
}

window.toggleDocenteAuth = () => {
    modoRegistroDocente = !modoRegistroDocente;
    document.getElementById('docente-action-title').innerText = 
        modoRegistroDocente ? "CREAR CUENTA" : "INICIAR SESIÓN";
}

// LÓGICA DE DOCENTE (Firebase Auth)
window.authDocente = async () => {
    const email = document.getElementById('doc-user').value;
    const pass = document.getElementById('doc-pass').value;

    if(modoRegistroDocente) {
        // Aquí llamarías a createUserWithEmailAndPassword
        console.log("Registrando docente...", email);
    } else {
        // Aquí llamarías a signInWithEmailAndPassword
        console.log("Iniciando sesión docente...", email);
    }
    // Redirigir a panel_docente.html tras éxito
}

// LÓGICA DE ESTUDIANTE (Búsqueda por PIN en Firestore)
window.loginEstudiante = async () => {
    const pin = document.getElementById('student-pin').value;
    
    if(pin.length !== 5) {
        alert("¡EL PIN DEBE SER DE 5 NÚMEROS!");
        return;
    }

    console.log("Buscando alumno con PIN:", pin);
    
    /* Lógica de experto:
       const q = query(collection(db, "alumnos"), where("pin", "==", pin));
       const querySnapshot = await getDocs(q);
       if (!querySnapshot.empty) {
           // Guardar datos del alumno en sessionStorage y entrar
           window.location.href = "feed.html";
       } else {
           alert("PIN INCORRECTO O NO REGISTRADO");
       }
    */
}