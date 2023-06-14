import * as Dialog from "@radix-ui/react-dialog";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function ModifyClientSubscription(props) {
    const { clientSubscription } = props;

    const [open, setOpen] = useState(false);
    const data = useActionData();

    useEffect(() => {
        if (!data?.error) {
            setOpen(false);
        }
    }, [data]);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button>
                    <ion-icon name="create-outline"></ion-icon>
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Modifica abbonamento utente
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        Inserisci i dati per poter modificare l'abbonamento
                    </Dialog.Description>
                    <Form method="post">
                        <input name="clientSubscriptionId" value={clientSubscription.id} type="hidden" />
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="price">
                                Prezzo (€)
                            </label>
                            <input
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                type="number"
                                id="price"
                                name="price"
                                placeholder="€"
                                defaultValue={clientSubscription.price}
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="start_date">
                                Data di inizio
                            </label>
                            <input
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                type="date"
                                id="start_date"
                                name="start_date"
                                placeholder="dd/mm/yyy"
                                defaultValue={clientSubscription.start_date.split("T")[0]}
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="deadline">
                                Scadenza
                            </label>
                            <input
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                type="date"
                                id="deadline"
                                name="deadline"
                                placeholder="dd/mm/yyy"
                                defaultValue={clientSubscription.deadline.split("T")[0]}
                                required
                            />
                        </fieldset>

                        <p className="text-center text-red-500">{data?.error}</p>

                        <div className="mt-[25px] flex justify-end">
                            <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none" type="submit" name="_action" value="modify">
                                Modifica
                            </button>
                        </div>
                    </Form>

                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close">
                            <ion-icon name="close-outline" size="large"></ion-icon>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
