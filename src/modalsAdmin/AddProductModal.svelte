<script lang="ts">
    import { categoryStore, productStore, type Product, type Category } from "../store";
    import { CategoryEndpoint, ProductEndpoint } from '../api';
    import Alert from "../modalsAll/Alert.svelte";

    const categoryEndpoint = new CategoryEndpoint()
    const productEndpoint = new ProductEndpoint()

    const token = localStorage.getItem('token')

    export let show: boolean
    export let close: () => void

    let name: HTMLInputElement
    let desc: HTMLTextAreaElement
    let price: HTMLInputElement
    let category_id: HTMLSelectElement
    let admin_key: string

    let show_alert: boolean = false
    let alert_title: string
    let alert_color: string
    let alert_text: string
    let alert_icon: string

    function showAlert(title: string, color: string, text: string, icon: string) {
        show_alert = true;
        alert_title = title;
        alert_text = text;
        alert_color = color;
        alert_icon = icon;
    }

    async function create() {
        try {
            const res = await productEndpoint.post(+category_id.value, name.value, +price.value, desc.value, token, admin_key)
            const product: Product = res.data.product
            productStore.update((pro) => { return pro.concat(product)})
            const categories: Category[] = (await categoryEndpoint.get()).data.categories 
            categoryStore.set(categories)
            close()
        } catch (error) {
            if (error.response.status == 409) {
                showAlert('Xatolik', 'red-500', name.value + " nomli mahsulot mavjud. Iltimos boshqa nomdan foydalaning", 'x')
            } else if(error.response.status == 403) {
                showAlert('Xatolik', 'red-500', "Admin parol kiritilmagan! Iltimos admin parolni kiritib qaytadan urining.", 'x')
            } else if(error.response.status == 401) {
                showAlert('Xatolik', 'red-500', "Admin parol noto'g'ri! Iltimos qaytadan urining.", 'x')
            } else if(error.response.status == 500 && error.response.status > 500) {
                showAlert('Xatolik', 'red-500', "Serverda xatolik. Iltimos admin bilan bog'laning", 'x')
            }
        }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <Alert show={show_alert} close={() => show_alert = false } color={alert_color} text={alert_text} title={alert_title} icon={alert_icon} />
    <div class="bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto">

        <p class="text-xl text-center font-bold">Mahsulot qo'shish</p>

        <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="desc">Kategoriya*:</label>
                <select bind:this={category_id} class="outline-0 border-2 px-3 py-1 rounded" name="category" id="">
                    {#each $categoryStore as category}
                        <option value="{category.id}">{category.name}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Nomi*:</label>
                <input bind:this={name}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="" placeholder="Coca Cola 1.5">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="desc">Narxi*:</label>
                <input bind:this={price}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="" placeholder="10000">
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="desc">Izoh*:</label>
                <textarea bind:this={desc} class="outline-0 border-2 px-3 py-1 rounded" name="desc" id="" rows="4" placeholder="izoh uchun joy"></textarea>
            </div>
            <div class="flex flex-col gap-2">
                <label class="font-semibold" for="">Admin parol*:</label>
                <input bind:value={admin_key}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="">
            </div>
        </div>

        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-500">Yopish</button>
            <button on:click={create} class="py-2 px-4 rounded-md text-white bg-green-500">Qo'shish</button>
        </div>
    </div>
</div>