$(document).ready(function () {
    // Global Settings
    // Testing Jquery
    console.log('jquery is working!');
    Cargar();


    $('#fecha').change(e => {
        e.preventDefault();
        let dia = $('#fecha').val();
        var info = dia.split('/');
        var fecha = info[2] + '-' + info[1] + '-' + info[0];
        $.ajax({
            url: 'validar-hora.php',
            data: { fecha },
            type: 'POST',
            success: function (response) {
                if (!response.error) {
                    let horas = JSON.parse(response);
                    let template = '';
                    console.log(response)
                    horas.forEach(hora => {
                        template += `
                        <tr>
                        <td>${hora.hora}</td>
                        <td>${hora.nombre}</td>
                      </tr>
                        `
                    });
                    $('#turnos').html(template);
                }
            }
        })

    });

});


function Cargar() {
    $.ajax({
        url: 'validar-fecha.php',
        type: 'POST',
        success: function (response) {

            if (!response.error) {
                var options = { weekday: "long", month: "long", day: "numeric" };
                let dias = JSON.parse(response);
                let template = '<option hidden selected>Seleccione un dia</option>';
                dias.forEach(dia => {
                    let dd = new Date(dia.dia);
                    template += `
                    '<option value=${dd.toLocaleDateString()}>${dd.toLocaleDateString('es-AR', options)}</option>'
                          `
                });
                $('#fecha').html(template);
            }

        }
    });

}