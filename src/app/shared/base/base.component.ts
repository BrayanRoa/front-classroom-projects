import Swal from "sweetalert2";

export class BaseComponent {

    alertError(msg: string) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg
        })
    }

    alertWarning(msg: string) {
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: msg
        })
    }

    alertSuccess(msg:string){
        Swal.fire({
            icon: 'success',
            title: 'OK',
            text: msg
        })
    }
}