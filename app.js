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
                    /* let dias = JSON.parse(response);
                    let template = '<option hidden selected>Seleccione un dia</option>'; */
                    console.log(response);
                    $('#2').show();
                    $('#1').hide();
                   /*  $('#fecha').html(template); */
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
        $.post('insert-turno.php', postData, function(response){
            
                            if (!response.error) {
                    console.log(response);
                }
            

        });
        
    });
});
