import { toast } from "react-hot-toast";
export default async function copy(address){
    await navigator.clipboard.writeText(address);
    toast("Copied!", {
        icon: "👏",
        style: {
            borderRadius: '5px',
            background: '#333',
            color: '#fff',
          },
    });
}