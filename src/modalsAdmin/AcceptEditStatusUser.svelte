<script lang="ts">
    import { UserEndpoint } from '../api';
    import { userStore, type User } from "../store";
    import Alert from "../modalsAll/Alert.svelte";

    const userEndpoint = new UserEndpoint()
    const token = localStorage.getItem('token')

    export let show: boolean
    export let close: () => void
    export let id: number
    export let status: number
    let adminKey: string 

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

    async function changeUserStatus() {
        let status_user: number = 1
        if (status == 1) {
            status_user = 0
        } else {
            status_user = 1
        }
        try {
            const res = await userEndpoint.patchStatus(id, status_user, token, adminKey)
            const user: User = res.data.user
            userStore.update(users =>  { return users.filter(u => u.id != user.id)})
            userStore.update(users => { return users.concat([user])})
            close()
        } catch (error) {
            if(error.response.status == 403) {
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
    <Alert close={() => show_alert = false } show={show_alert} title={alert_title} color={alert_color} text={alert_text} icon={alert_icon}></Alert>
    <div class="bg-white p-8 flex flex-col w-4/5 md:w-fit gap-3 h-fit rounded-md shadow-md">
        <p class="text-xl text-center font-bold">Ishchi statusini tahrirlash</p>
        <p class="text-md text-center">Statusni o'zgartirishni tasdiqlaysizmi?</p>
        <label for=""><b>Admin parol*</b></label>
        <input bind:value={adminKey} class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="">
        <div class="flex justify-between gap-3">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-500 font-semibold">Yopish</button>
            <button on:click={changeUserStatus} class="py-2 px-4 rounded-md text-white bg-indigo-500 font-semibold">Tasdiqlash</button>
        </div>
    </div>
</div>