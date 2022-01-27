{
    function signUp() {
        let modal = document.querySelector('.modal')
        modal.style.display = 'inline-block';

        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000)
    }
    $('.sign_up').click( function(){ /* Quando clicar em .sign_up */
        var name = 'Unisuam'
        var email = 'paulolucas.dev@gmail.com';
        var msg = 'Uma inscrição foi efetuada!'
        console.log(email);

        /* construindo url */
        var urlData = "&nome=" + name + "&email=" + email + "&msg=" + msg;

        /* Ajax */
        $.ajax({
            type: "POST", /* tipo post */
            url: "http://localhost:5000/", /* endereço do script PHP */
            async: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: urlData, /* informa Url */
            success: function(data) { /* sucesso */
                $('#retornoHTML').html(data);
            }
        });

        signUp();
    });
}