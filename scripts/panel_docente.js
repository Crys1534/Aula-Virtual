// 1. Importaciones de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// 2. PEGA AQUÍ TU CONFIGURACIÓN DE FIREBASE (La misma de login.js)
const firebaseConfig = {
  apiKey: "AIzaSyBnX__R6A6lQw_KuzZxqHRkzZyj10S_4wU",
  authDomain: "aula-virtual-79e4d.firebaseapp.com",
  projectId: "aula-virtual-79e4d",
  storageBucket: "aula-virtual-79e4d.firebasestorage.app",
  messagingSenderId: "384731632952",
  appId: "1:384731632952:web:9b4facff98bc7f6ebf5dcd",
  measurementId: "G-SR9D2CJX40"
};

// 3. Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let aulaIdActual = null; // Variable para saber en qué aula estamos metiendo a los niños

// 4. SEGURIDAD: Verificar que el profe sí inició sesión
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Si alguien intenta entrar a este link directo sin cuenta, lo pateamos al inicio
        window.location.href = "index.html";
    }
});

// Función para el PIN
const generarPinUnico = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
};

// 5. CREAR EL AULA (Guardar en Firestore)
window.guardarAula = async () => {
    const escuela = document.getElementById('escuela-nombre').value;
    const grado = document.getElementById('grado-num').value;
    const seccion = document.getElementById('seccion-letra').value;

    if(!escuela || !grado || !seccion) return alert("LLENA TODOS LOS BLOQUES");

    try {
        console.log("Creando el mundo en Firestore...");
        
        // Creamos un documento en la colección "aulas"
        const docRef = await addDoc(collection(db, "aulas"), {
            escuela: escuela,
            grado: parseInt(grado),
            seccion: seccion.toUpperCase(),
            docenteId: auth.currentUser.uid // Relacionamos el aula con tu cuenta
        });
        
        aulaIdActual = docRef.id; // Guardamos el ID secreto que Firebase le dio a esta aula

        // Cambiamos la vista
        document.getElementById('crear-aula-section').classList.add('hidden');
        document.getElementById('alumnos-section').classList.remove('hidden');
        document.getElementById('titulo-aula').innerText = `AULA: ${grado}º ${seccion} - ${escuela}`;
    } catch (error) {
        console.error("Error al crear aula:", error);
        alert("Hubo un error al conectar con la base de datos.");
    }
};

// 6. REGISTRAR ALUMNOS (Guardar en Firestore)
window.agregarAlumno = async () => {
    const nombre = document.getElementById('nombre-alumno').value;
    if(!nombre) return;

    const pin = generarPinUnico();
    
    try {
        console.log(`Registrando a ${nombre} en la base de datos...`);
        
        // Guardamos al alumno en la colección "alumnos" con sus stats iniciales
        await addDoc(collection(db, "alumnos"), {
            nombre: nombre,
            pin: pin,
            aulaId: aulaIdActual, // Lo vinculamos a tu aula
            monedas: 0,           // ¡Empieza la economía!
            nivel: 1,             // Empieza en nivel 1
            xp: 0                 // Empieza con 0 de experiencia
        });

        // Lo agregamos visualmente a la tabla HTML
        const tbody = document.getElementById('lista-alumnos-body');
        const row = `<tr>
            <td>${nombre.toUpperCase()}</td>
            <td class="pin-code">${pin}</td>
        </tr>`;
        tbody.innerHTML += row;
        
        // Limpiamos la caja de texto para el siguiente niño
        document.getElementById('nombre-alumno').value = "";
    } catch (error) {
        console.error("Error al registrar alumno:", error);
        alert("Error al guardar al alumno en la base de datos.");
    }
};

// 7. CERRAR SESIÓN
window.cerrarSesion = () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
};