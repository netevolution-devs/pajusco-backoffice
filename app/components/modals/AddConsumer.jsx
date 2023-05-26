import * as Dialog from "@radix-ui/react-dialog";
import { Form } from "@remix-run/react";

export default function AddConsumer(props) {
    const { client } = props;

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="flex p-1 border rounded shadow-2xl">
                    <ion-icon name="add-outline" size="large"></ion-icon>
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Aggiungi utente
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        Inserisci i dettagli dell'utente che vuoi inserire
                    </Dialog.Description>
                    <Form method="post">
                        <input name="clientId" value={client.id} type="hidden" />
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                                Nome
                            </label>
                            <input
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                id="name"
                                name="name"
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="description">
                                Descrizione
                            </label>
                            <input
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                id="description"
                                name="description"
                            />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="business_role">
                                Ruolo
                            </label>
                            <select
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                name="business_role"
                                id="business_role"
                                required>
                                <option value="">--Scegli un ruolo--</option>
                                <option value="1">Superuser</option>
                                <option value="3">Generico</option>
                            </select>
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                id="email"
                                name="email"
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="mobile">
                                Telefono
                            </label>
                            <input
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                id="mobile"
                                name="mobile"
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="authorized">
                                Autorizzato
                            </label>
                            <input
                                className=""
                                type="checkbox"
                                id="authorized"
                                name="authorized"
                            />
                        </fieldset>
                        <div className="mt-[25px] flex justify-end">
                            {/* <Dialog.Close asChild> */}
                            <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none" type="submit" name="_action" value="add">
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
