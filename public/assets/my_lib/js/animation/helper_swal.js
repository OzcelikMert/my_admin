let HelperSwal = (function() {

    function HelperSwal(){}

    HelperSwal.Question = function (title, html, confirm_text, cancel_text, then_function = (result) => {}) {
        Swal.fire({
            title: title,
            html: html,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirm_text,
            cancelButtonText: cancel_text
        }).then((result) => {
            then_function(result);
        })
    }

    HelperSwal.Wait = function(title, html) {
        Swal.fire({
            title: title,
            html: html,
            onBeforeOpen () {
                Swal.showLoading ()
            },
            onAfterClose () {
                Swal.hideLoading()
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false
        });
    }

    HelperSwal.Error = function(title, html,timer = 7500) {
        Swal.fire({
            icon: "error",
            position: 'center',
            title: title,
            html: html,
            showConfirmButton: false,
            timer: timer
        });
    }

    HelperSwal.Success = function (title, html) {
        Swal.fire({
            icon: "success",
            position: 'center',
            title: title,
            html: html,
            showConfirmButton: false,
            timer: 1000
        });
    }

    HelperSwal.Close = function () {
        Swal.close();
    }

    return HelperSwal;
})();