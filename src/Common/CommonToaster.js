import { toast } from "react-toastify";

export const CommonToaster = (message, type) => {
  toast.dismiss();
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warning":
      toast.warn(message);
      break;
    default:
      toast(message);
      break;
  }
};
