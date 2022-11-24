"use strict"


$(document).ready(function () {
    $("form").submit(function () {
        var formID = $(this).attr('id');
        var formNm = $('#' + formID);

        $.ajax({
            type: "POST",
            url: '/send.php',
            data: formNm.serialize(),
            beforeSend: function () {
                $(formNm).html('<p style="text-align:center">Отправка...</p>');
            },
            success: function (data) {
                $(formNm).html('<p style="text-align:center">'+data+'</p>');
            },
            error: function (jqXHR, text, error) {
                $(formNm).html(error);
            }
        });
        return false;
    });
});

// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('form');
//     form.addEventListener('submit', formSend);

//     async function formSend(e) {
//         e.preventDefault();
//         let error = formValidate(form);

//         let formData = new FormData(form);
//         console.log('sfasd');
//         if (error === 0) {
//             form.classList.add('_sending'); 
//             let response = await fetch('sendmail.php', {
//                 method: 'POST',
//                 body: formData
//             });

//             if (response.ok) {
//                 let result = await response.json();
//                 alert(result.message);
//                 formPrewview.innerHTML = '';
//                 form.reset();
//                 form.classList.remove('_sending');
//             } else {
//                 alert("Ошибка" + response.status);
//                 form.classList.remove('_sending');
//             }
 

//         } else {
//             alert('Заполните обязательные поля');
//         }
//     }

//     function formValidate(form) {
//         let error = 0;
//         let formReq = document.querySelectorAll('._req');
        
//         for (let i = 0; i < formReq.length; i++) {
//             const input = formReq[i]; 
//             formRemoveError(input);
            
//             if (input.classList.contains('_tel')) {
//                 if (telTest(input)) {
//                     formAddError(input);
//                     erorr++;
//                 }   
//             }else {
//                 if (input.value === '') {
//                     formAddError(input);
//                     erorr++; 
//                 }
//             }
//         }
//         return error;
//     }

//     function formAddError(input) {
//         input.classList.add('_erorr');
//         input.classList.add('_error');
//     }
    
//     function formRemoveError(input) {
//         input.classList.remove('_erorr');
//         input.classList.remove('_error');
//     }
    
//     function telTest(input) {
//         return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
//     }
// });

