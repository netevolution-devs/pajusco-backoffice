import { useEffect, useState } from "react";
import hardwaresProvider from "../../api/hardwares";
import * as Dialog from "@radix-ui/react-dialog";

export default function HardwareList(props) {
    const { device } = props;

    const [hardwares, setHardwares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getHardwares() {
            const hws = await hardwaresProvider.getAll(device.hw_id);
            setHardwares(hws);
            setLoading(false);
        }

        getHardwares();
    }, [device]);

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button>
                    <ion-icon name="file-tray-full-outline"></ion-icon>
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-2/3 h-2/4 overflow-y-scroll rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-bold">
                        Hardware
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        Lista degli hardware
                    </Dialog.Description>
                    {loading ?
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-10" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" fill="none" stroke="#16a34a" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                            </circle>
                        </svg> :
                        <table className="w-full table-fixed overflow-scroll">
                            <thead className="text-left">
                                <tr>
                                    <th>nome</th>
                                    <th>stato</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {hardwares.map((hardware, idx) =>
                                    <tr key={idx} className="border-b">
                                        <td>{hardware.name}</td>
                                        <td>{hardware.is_active ? "✔️" : "⭕"}</td>
                                    </tr>)}
                            </tbody>
                        </table>}
                    <Dialog.Close asChild>
                        <button
                            className="absolute top-[10px] right-[10px] inline-flex w-[25px] h-[25px] rounded-full "
                            aria-label="Close">
                            <ion-icon name="close-outline" size="large"></ion-icon>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
