<script lang="ts">
    import { userStore, type User, roleStore } from "../store";
    import { UserEndpoint } from '../api';
    import Alert from "../modalsAll/Alert.svelte";

    const userEndpoint = new UserEndpoint();
    const token = localStorage.getItem('token')

    export let show: boolean
    export let close: () => void
    export let u_name: string
    export let u_username: string
    export let u_salary: number
    export let u_phone: string
    export let u_email: string
    export let u_id: number

    let name: HTMLInputElement
    let username: HTMLInputElement
    let password: HTMLInputElement
    let phone: HTMLInputElement
    let email: HTMLInputElement
    let salary: HTMLInputElement
    let role: HTMLSelectElement
    let admin_key: HTMLInputElement

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

    async function edit() {
        try {
            const res = await userEndpoint.put(u_id, name.value, username.value, password.value, +salary.value, +role.value, phone.value, email.value, token, admin_key.value)
            const user: User = res.data.user
            userStore.update(users => { return users.filter(u => u.id != user.id)})
            userStore.update(users => { return users.concat(user)})
            close()
        } catch (error) {
            if (error.response.status == 409) {
                showAlert('Xatolik', 'red-500', username.value + " bu usernamedan foydalanilgan. Iltimos boshqa username tanlang", 'x')
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
    <Alert close={() => show_alert = false } show={show_alert} title={alert_title} color={alert_color} text={alert_text} icon={alert_icon}></Alert>
    <div class="bg-white p-8 flex flex-col gap-3 w-screen h-full md:h-[fit-content] md:w-[fit-content] md:rounded-md shadow-md overflow-y-auto">
        <p class="text-xl text-center font-bold">Ishchi malumotlarini tahrirlash</p>
        <div class="flex flex-col md:flex-row items-start gap-3">
            <div class="flex flex-col gap-3 w-full first-row">
                <div class="role flex flex-col gap-2">
                    <label class="font-semibold" for="desc">Roli*:</label>
                    <select bind:this={role} class="outline-0 border-2 px-3 py-1 rounded" name="category" id="">
                        {#each $roleStore as role}
                            <option value="{role.id}">{role.name}</option>
                        {/each}
                    </select>
                </div>
                <div class="name flex flex-col gap-2">
                    <label class="font-semibold" for="fullname">Ismi*:</label>
                    <input bind:this={name} value="{u_name}"  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="fullname" id="" placeholder="Eshmatov Toshmat">
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold" for="username">Username*:</label>
                    <input bind:this={username} value="{u_username}"  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="username" id="" placeholder="toshmat">
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold" for="password">Parol*:</label>
                    <input bind:this={password} class="outline-0 border-2 px-3 py-1 rounded" type="text" name="password" id="" placeholder="parol" />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold" for="phone">Telefon*:</label>
                    <input bind:this={phone} value={u_phone} class="outline-0 border-2 px-3 py-1 rounded" type="text" name="phone" id="" placeholder="+998905789204" />
                </div>
            </div>
            <div class="flex flex-col gap-3 w-full second-row">
                <div class="flex flex-col gap-2">
                    <label class="font-semibold" for="email">Email*:</label>
                    <input bind:this={email} value={u_email} class="outline-0 border-2 px-3 py-1 rounded" type='email' name="email" id="" placeholder="eshmatovtoshmat@gmail.com" />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold" for="salary">Oylik maosh*:</label>
                    <input bind:this={salary} value="{u_salary}" class="outline-0 border-2 px-3 py-1 rounded" type="text" name="salary" id="" placeholder="2000000" />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold" for="">Admin parol*:</label>
                    <input bind:this={admin_key}  class="outline-0 border-2 px-3 py-1 rounded" type="text" name="" id="">
                </div>
                <div class="flex justify-between">
                    <button on:click={() => close()} class="py-2 px-4 rounded-md text-white bg-red-500">Yopish</button>
                    <button on:click={edit} class="py-2 px-4 rounded-md text-white bg-green-500">Saqlash</button>
                </div>
            </div>
        </div>
    </div>
</div>