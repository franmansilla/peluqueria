$(document).ready(function () {
    // Global Settings
    // Testing Jquery
    console.log('jquery is working!');
    $('#3').hide();
    $('#2').hide();
    $('#fecha-validar').submit(e => {
        e.preventDefault();
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
                    $('#2').show();
                    $('#1').hide();
                    $('#fecha').html(template);
                }

            }
        }
        );

    });

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
                    horas.forEach(hora => {
                        template += `
                        <option value="${hora.hora}">${hora.hora}</option>
                        `
                    });
                    $(':input[type="submit"]').prop('disabled', false);
                    if (Object.entries(horas).length === 0) {
                        window.alert('No hay turnos disponibles. Por favor seleccione otro dia');
                        template += `<option disabled selected>--</option>`
                        $(':input[type="submit"]').prop('disabled', true);
                    }
                    $('#hora').html(template);
                }
            }
        })

    });
    $('#reservar').submit(e => {
        e.preventDefault();
        let dia = $('#fecha').val();
        let info = dia.split('/');
        let fecha = info[2] + '-' + info[1] + '-' + info[0];
        const postData = {
            name: $('#name').val(),
            hora: $('#hora').val(),
            fecha: fecha
        };
        $.post('insert-turno.php', postData, function (response) {

            if (!response.error) {
                var options = { month: "long", day: "numeric" };
                let reserva = JSON.parse(response);
                let dia = '';
                let hora = '';
                reserva.forEach(r => {
                    dia += `<h3 id="diar" >${new Date(r.fecha).toLocaleDateString('es-AR', options)}</h3>`;
                    hora += `<h3 id="horar" >${r.hora} HRS</h3>`;
                })

                $('#diar').html(dia);
                $('#horar').html(hora);
                $('#3').show();
                $('#2').hide();
            }




        });

    });
    $('#back').click(function() {
        location.reload();
    });
});
