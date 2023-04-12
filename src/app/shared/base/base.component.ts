import Swal from "sweetalert2";

export class BaseComponent {

    img_default:string = "https://res.cloudinary.com/dmaqkkeno/image/upload/v1679972910/ayd-folder-pruebas/imagen-perfil-sin-foto_fpmrc2.jpg"

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