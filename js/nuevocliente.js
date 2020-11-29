(function() {
    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        formulario.addEventListener('submit', validarCliente);
    });

    function validarCliente(e) {
        e.preventDefault();
        // Leer todos los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === ''){
            imrpimirAlerta('Todos lso campos son obligatorios', 'error');
            return;
        }

        // Crear un nuevo objeto con la información
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }

        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function () {
            imrpimirAlerta('Hubo un error', 'error');
        }

        transaction.oncomplete = function () {
            imrpimirAlerta('Cliente agregado correctamente');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }
})();