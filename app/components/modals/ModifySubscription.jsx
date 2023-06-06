import * as Dialog from "@radix-ui/react-dialog";
import { Form } from "@remix-run/react";
import { useState } from "react";

export default function ModifySubscription(props) {
    const { subscription } = props;

    const [open, setOpen] = useState(false);

    const onClickHandler = () => {
        setOpen(false);
    };

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
                        Modifica sottoscrizione {subscription.name}
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        Modifica dati sottoscrizione
                    </Dialog.Description>
                    <Form method="post" onSubmit={onClickHandler}>
                        <input name="subscriptionId" value={subscription.id} type="hidden" />
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                                Nome
                            </label>
                            <input
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                id="name"
                                name="name"
                                defaultValue={subscription.name}
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="type">
                                Tipo
                            </label>
                            <select
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                id="type"
                                name="type"
                                required>
                                <option value="">--</option>
                                <option value="trial">Trial</option>
                                <option value="subscription">Sottoscrizione</option>
                            </select>
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="description">
                                Descrizione
                            </label>
                            <input
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                id="description"
                                name="description"
                                placeholder="descrizione"
                                defaultValue={subscription.description}
                                required
                            />
                        </fieldset>
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
                                defaultValue={subscription.price}
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="duration">
                                Durata (giorni)
                            </label>
                            <input
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                type="number"
                                id="duration"
                                name="duration"
                                placeholder="giorni"
                                defaultValue={subscription.duration}
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="activable">
                                Attivato
                            </label>
                            <input
                                type="checkbox"
                                id="activable"
                                name="activable"
                                defaultChecked={subscription.activable}
                            />
                        </fieldset>
                        <div className="mt-[25px] flex justify-end">
                            {/* <Dialog.Close asChild> */}
                            <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none" type="submit" name="_action" value="modify">
                                Modifica
                            </button>
                            {/* </Dialog.Close> */}
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
