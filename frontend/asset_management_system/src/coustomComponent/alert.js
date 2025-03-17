import { useCallback } from "react";
import Swal from "sweetalert2";

export default function useAlert() {
  const alrt = useCallback((message, icon) => {
    Swal.fire({
      toast: true,
      position: "top",
      icon,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  }, []);

  return alrt;
}
