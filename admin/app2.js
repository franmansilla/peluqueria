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
                    horas.forEach(hora => {
                        if (hora.Id == "") {
                            template += `
                        <tr turnoId=${hora.Id}>
                        <td>${hora.hora}</td>
                        <td>${hora.nombre}</td>
                        <td>                     
                        `} else {
                            template += `
                        <tr turnoId=${hora.Id}>
                        <td>${hora.hora}</td>
                        <td>${hora.nombre}</td>
                        <td>
                    <button class="task-delete btn btn-danger">
                     Delete 
                    </button>
                  </td>
                      </tr>
                      
                        `
                        }
                    });
                    $('#turnos').html(template);
                }
            }
        })

    });
    $(document).on('click', '.task-delete', (e) => {
        if (confirm('Esta seguro que quiere eliminar este turno?')) {
            const element = $(this)[0].activeElement.parentElement.parentElement;
            const id = $(element).attr('turnoid');
            $.post('eliminar-turno.php', { id }, (response) => {
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
                                if (hora.Id == "") {
                                    template += `
                                 <tr turnoId=${hora.Id}>
                                 <td>${hora.hora}</td>
                                 <td>${hora.nombre}</td>
                                 <td>                     
                                 `} else {
                                    template += `
                                 <tr turnoId=${hora.Id}>
                                 <td>${hora.hora}</td>
                                 <td>${hora.nombre}</td>
                                 <td>
                             <button class="task-delete btn btn-danger">
                              Delete 
                             </button>
                           </td>
                               </tr>
                               
                                 `
                                }
                            });
                            $('#turnos').html(template);
                        }
                    }
                })
            });
        }
    });

    $('#confirmar').submit(e => {
        if (confirm('Esta seguro que quiere modificar los horarios')) {
            e.preventDefault();
            var checked = [];
            $("input[name='dias']:checked").each(function () {
                checked.push(($(this).attr("value")));
            });

            const postData = {
                dias: checked,
                dm: $('#dm').val(),
                hm: $('#hm').val(),
                dt: $('#dt').val(),
                ht: $('#ht').val()
            };
            if (hora($('#dm').val()) > hora($('#hm').val())) {
                alert("la hora de apertura de la mañana no puede ser mayor a la hora de cierre de la mañana")
            } else {
                if (hora($('#hm').val()) > hora($('#dt').val())) {
                    alert("La hora de apertura de la tarde no puede ser menor a la hora de cierre de la mañana")
                } else {
                    if (hora($('#dt').val()) > hora($('#ht').val())) {
                        alert("la hora de apertura de la tarde no puede ser mayor a la hora de cierre de la tarde")
                    } else {
                        $.post('update.php', postData, function (response) {
                            console.log(response)
                            Cargar()
                        });
                    }
                }
            }
        }
    });
});

function hora(hora) {
    var fecha_actual = new Date();
    var timeArray = hora.split(":");
    fecha_actual.setHours(timeArray[0]);
    fecha_actual.setMinutes(timeArray[1]);
    return fecha_actual;

}
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
                    let dd = new Date(dia.dia.replace(/-/g, '\/'));
                    template += `
                    '<option value=${dd.toLocaleDateString()}>${dd.toLocaleDateString('es-AR', options)}</option>'
                          `
                });
                $('#fecha').html(template);
            }

        }
    });
    $.ajax({
        url: 'validar-dias.php',
        type: 'POST',
        success: function (response) {

            if (!response.error) {
                let dias = JSON.parse(response);
                let template = '';
                dias.forEach(dia => {
                    if (dia.habilitado == 0) {
                        template += `
                    <input type="checkbox" name="dias" value="${dia.id}"> ${dia.dia}
                          `
                    } else {
                        template += `
                    <input type="checkbox" name="dias" value="${dia.id}" checked> ${dia.dia}
                          `
                    }
                });
                $('#dias').html(template);
            }

        }
    });
    $.ajax({
        url: 'validar-rango.php',
        type: 'POST',
        success: function (response) {

            if (!response.error) {
                let horas = ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"];
                let rangos = JSON.parse(response);

                let template = '';
                rangos.forEach(rango => {

                    horas.forEach(hora => {
                        if (rango.dm == hora) {
                            template += `
                        <option value="${hora}" selected>${hora}</option>
                              `
                        } else {
                            template += `
                        <option value="${hora}">${hora}</option>
                              `}


                    });
                    $('#dm').html(template);
                    template = '';
                    horas.forEach(hora => {
                        if (rango.hm == hora) {
                            template += `
                        <option value="${hora}" selected>${hora}</option>
                              `
                        } else {
                            template += `
                        <option value="${hora}">${hora}</option>
                              `}

                    });
                    $('#hm').html(template);
                    template = '';
                    horas.forEach(hora => {
                        if (rango.dt == hora) {
                            template += `
                        <option value="${hora}" selected>${hora}</option>
                              `
                        } else {
                            template += `
                        <option value="${hora}">${hora}</option>
                              `}

                    });
                    $('#dt').html(template);
                    template = '';
                    horas.forEach(hora => {
                        if (rango.ht == hora) {
                            template += `
                        <option value="${hora}" selected>${hora}</option>
                              `
                        } else {
                            template += `
                        <option value="${hora}">${hora}</option>
                              `}

                    });
                    $('#ht').html(template);
                });
            }

        }
    });

}