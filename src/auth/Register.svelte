<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { UserEndpoint, RoleEndpoint } from "../api";
    import { roleStore, type Role } from "../store";

    const userEndpoint = new UserEndpoint()
    const roleEndpoint = new RoleEndpoint()
    const admin_key = localStorage.getItem('admin-key')

    if (admin_key) {
        // get admin verify
        async function getAdminVerify() {
            try {
                await userEndpoint.getAdminVerify(admin_key)
            }  catch(error) {
                navigate('/check')
            }
        } getAdminVerify()
    } else {
        navigate('/check')
    }

    // get roles
    async function getRoles() {
        try{
            const res = await roleEndpoint.get()
            const roles: Role[] = res.data.roles
            roleStore.set(roles)
        }
        catch(error) {}
    }  getRoles()

    let name: HTMLInputElement
    let username: HTMLInputElement
    let password: HTMLInputElement
    let phone: HTMLInputElement
    let email: HTMLInputElement
    let salary: HTMLInputElement
    let role: HTMLSelectElement

    async function login() {
        try {
            const res = await userEndpoint.register(name.value, username.value, password.value, +salary.value, +role.value, phone.value, email.value, admin_key)
            localStorage.removeItem('admin-key')
            navigate('/login')
        }  catch(error) { }
    }
</script>

<svelte:head>
    <title>Tizimga kirish</title>
</svelte:head>

<div class="flex justify-center items-center w-screen min-h-screen py-5 bg-indigo-500">
    <div class="flex flex-col gap-4 bg-white p-8 rounded-md">
        <h1 class="text-2xl font-bold outline-none">Ro'yhatdan o'tish</h1>
        <div class="flex flex-col gap-2">
            <label class="font-semibold" for="name">Ism: <p class="text-red-500 inline">*</p></label>
            <input bind:this={name} class="outline-none border-2 p-2 rounded-md" type="text" name="name" placeholder="Eshmatov Toshmat">
            <label class="font-semibold" for="username">Username: <p class="text-red-500 inline">*</p></label>
            <input bind:this={username} class="outline-none border-2 p-2 rounded-md" type="text" name="username" placeholder="username">
            <label class="font-semibold" for="phone">Email: <p class="text-red-500 inline">*</p></label>
            <input bind:this={email} class="outline-none border-2 p-2 rounded-md" type="text" name="phone" placeholder="email@gmail.com">
            <label class="font-semibold" for="phone">Telefon: <p class="text-red-500 inline">*</p></label>
            <input bind:this={phone} class="outline-none border-2 p-2 rounded-md" type="text" name="phone" placeholder="+998905789204">
            <label class="font-semibold" for="salary">Oylik maosh: <p class="text-red-500 inline">*</p></label>
            <input bind:this={salary} class="outline-none border-2 p-2 rounded-md" type="text" name="salary" placeholder="2000000">
            <label class="font-semibold" for="role">Roli: <p class="text-red-500 inline">*</p></label>
            <select bind:this={role} class="outline-none border-2 p-2 rounded-md" name="role">
                {#each $roleStore as role}
                    <option value="{role.id}">{role.name}</option>
                {/each}
            </select>
            <label class="font-semibold" for="password">Password: <p class="text-red-500 inline">*</p></label>
            <input bind:this={password} class="outline-none border-2 p-2 rounded-md" type="password" name="password">
            <span class="flex gap-3">
                <input 
                type="checkbox" on:change={() => {
                    if(password.type === "password"){
                        password.type = "text";
                    } else {
                        password.type = "password";
                    }
                }} 
                name="show-password">
                <p>Show password</p>
            </span>
        </div>
        <button on:click={login} class="bg-indigo-500 text-white font-semibold p-3 rounded-md">Ro'yhatdan o'tish</button>
        <button on:click={() => { navigate('/login')}} class="text-sm font-semibold py1 rounded-md">Kirish</button>
    </div>
</div>
