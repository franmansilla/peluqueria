$(function(){
    console.log("AJAX ingreso de usuario funcionando");
    
    $('#ingreso').submit(function(e){
        e.preventDefault();
        console.log('user_submit');
            const postData = {
                user : $('#user').val(),
                pass : $('#pass').val()
            };
            console.log(postData);
            
            $.post('./admin/login.php', postData, function(response){
                console.log(response);
                if(response == 0){
                    window.alert('Usuario o contraseña incorrecto');
                    $('#user').val('');
                    $('#pass').val('');
                }else{
                    location.href ="./admin/dashboard.html";
                }
            });

    });

   
   

});