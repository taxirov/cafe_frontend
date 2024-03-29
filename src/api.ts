import axios from "axios";
import type { Book } from "./store";

const url = "https://cafe.webpack.uz/api"


export class RoleEndpoint {
    async post(name: string, admin_key: string) {
        return await axios.post(url + '/role', { name }, { headers: { "Admin-Key": admin_key } })
    }
    async put(id: number,name: string, admin_key: string) {
        return await axios.put(url + '/role/' + id, { name }, { headers: { "Admin-Key": admin_key } })
    }
    async get() {
        return await axios.get(url + '/role')
    }
    async delete(id: number, admin_key: string) {
        return await axios.delete(url + '/role/' + id, { headers: { "Admin-Key": admin_key } })
    }
}

export class UserEndpoint {
    register = async (name: string, username: string, password: string, salary: number, role_id: number, phone: string, email: string, admin_key: string) => {
        return await axios.post(url + '/user/register', { username, password, salary, name, role_id, phone, email }, { headers: { "Admin-Key": admin_key } })
    }
    login = async (username: string, password: string) => {
        return await axios.post(url + '/user/login', { username, password }, { headers: { "Content-Type": "application/json" } })
    }
    getTokenVerify = async (token: string) => {
        return await axios.get(url + '/user/verify', { headers: { "Access-Token": token } })
    }
    getAdminVerify = async (admin_key: string) => {
        return await axios.get(url + '/user/admin', { headers: { "Admin-Key": admin_key } })
    }
    get = async (token: string) => {
        return await axios.get(url + '/user', { headers: { "Access-Token": token } })
    }
    put = async (id: number, name: string, username: string, password: string, salary: number, role_id: number, phone: string, email: string, token: string, admin_key: string) => {
        return await axios.put(url + '/user/' + id, { username, password, salary, name, role_id, phone, email }, { headers: { "Access-Token": token , "Admin-Key": admin_key } })
    }
    patchStatus = async (id: number, status: number,token: string, admin_key: string) => {
        return await axios.patch(url + '/user/' + id, { status }, { headers: { "Access-Token": token, "Admin-Key": admin_key }})
    }
}

export class RoomEndpoint {
    post = async (name: string, desc: string, capacity: number, token: string, admin_key: string) => {
        return await axios.post(url + '/room', { name, desc, capacity }, { headers: { "Access-Token": token, "Admin-Key": admin_key } })
    }
    put = async (id: number, name: string, desc: string, capacity: number, token: string, admin_key: string) => {
        return await axios.put(url + '/room/' + id, { name, desc, capacity }, { headers: { "Access-Token": token, "Admin-Key": admin_key } })
    }
    get = async (token: string) => {
        return await axios.get(url + '/room', { headers: { "Access-Token": token } })
    }
    delete = async (id: number, token: string, admin_key: string) => {
        return await axios.delete(url + '/room/' + id, { headers: { "Access-Token": token, "Admin-Key": admin_key } })
    }
}

export class CategoryEndpoint {
    async post(name: string, desc: string, token: string, admin_key: string) {
        return await axios.post(url + '/category', { name, desc }, { headers: { "Access-Token": token, "Admin-Key": admin_key } })
    }
    async get() {
        return await axios.get(url + '/category')
    }
    async delete(id: number, token: string, admin_key: string) {
        return await axios.delete(url + '/category/' + id, { headers: { "Access-Token": token, "Admin-Key": admin_key } })
    }
    async put(id: number, name: string, desc: string, token: string, admin_key: string) {
        return await axios.put(url + '/category/' + id, { name, desc }, { headers: { "Access-Token": token, "Admin-Key": admin_key } })
    }
}

export class ProductEndpoint {
    async post(category_id: number, name: string, price: number, desc: string, token: string, adminkey: string) {
        return await axios.post(
            url + '/product',
            { name, desc, category_id, price },
            { headers: { "Access-Token": token, "Admin-Key": adminkey } })
    }
    async put(id: number, category_id: number, name: string, price: number, desc: string, token: string, adminkey: string) {
        return await axios.put(
            url + '/product/' + id,
            { name, desc, category_id, price },
            { headers: { "Access-Token": token, "Admin-Key": adminkey } })
    }
    async get() {
        return await axios.get(url + '/product')
    }
    async getByCatgory(category_id: number) {
        return await axios.get(url + '/product?category_id=' + category_id)
    }
    async delete(id: number, token: string, adminkey: string) {
        return await axios.delete(url + '/product/' + id, { headers: { "Access-Token": token, "Admin-Key": adminkey } })
    }
}

export class OrderEndpoint {
    async post(title: string, desc: string | null, room_id: number | null, token: string) {
        return await axios.post(url + '/order', { title, desc, room_id }, { headers: { "Access-Token": token } })
    }
    async get(token: string) {
        return await axios.get(url + '/order', { headers: { "Access-Token": token } })
    }
    async getStatus(status_order: number, current_page: number, token: string) {
        return await axios.get(url + '/order?status_order=' + status_order + '&current_page=' + current_page + '&per_page=12 ', { headers: { "Access-Token": token } })
    }
    async getTrueStatus(status_order: number, current_page: number, token: string) {
        return await axios.get(url + '/order?status_order=' + status_order + '&current_page=' + current_page + '&per_page=50 ', { headers: { "Access-Token": token } })
    }
    async getRoom(room_id: number, current_page: number, token: string) {
        return await axios.get(url + '/order?room_id=' + room_id + '&current_page=' + current_page + '&per_page=12', { headers: { "Access-Token": token } })
    }
    async getStatusRoom(status_order: number, room_id: number, current_page: number, token: string) {
        return await axios.get(url + '/order?status_order=' + status_order + '&room_id=' + room_id + '&current_page=' + current_page + '&per_page=12', { headers: { "Access-Token": token } })
    }
    async delete(id: number, token: string, admin_key: string) {
        return await axios.delete(url + '/order/' + id, { headers: { "Access-Token": token, "Admin-Key": admin_key } })
    }
    async patchStatus(id: number, status: number, token: string, admin_key: string) {
        return await axios.patch(url + '/order/' + id + '/status', { status }, { headers: { "Access-Token": token, "Admin-Key": admin_key } })
    }
    async getStatusUser(status_order: number, user_id: number, current_page: number, token: string) {
        return await axios.patch(url + '/order?status_order=' + status_order + '&user_id=' + user_id + '&current_page=' + current_page + '&per_page=12', { headers: { "Access-Token": token } })
    }
    async getWaiterOrders(token: string) {
        return await axios.get(url + '/order/waiter', { headers: { "Access-Token": token } })
    }
    async getByYearMonthDay(create_date: string, token: string) {
        return await axios.get(url + '/order/date?create_date=' + create_date, { headers: { "Access-Token": token } })
    }
}

export class ProductInOrderEndpoint {
    async post(order_id: number, product_id: number, count: number, token: string) {
        return await axios.post(url + '/productinorder', { order_id, product_id, count }, { headers: { "Access-Token": token } })
    }
    async get(token: string) {
        return await axios.get(url + '/productinorder/status/0', { headers: { "Access-Token": token } })
    }
    async delete(id: number, token: string) {
        return await axios.delete(url + '/productinorder/' + id, { headers: { "Access-Token": token } })
    }
    async put(id: number, product_id: number, count: number, token: string) {
        return await axios.put(url + '/productinorder/' + id, { product_id, count }, { headers: { "Access-Token": token } })
    }
    async patchStatus(id: number, status: number, token: string) {
        return await axios.patch(url + '/productinorder/' + id + '/status', { status }, { headers: { "Access-Token": token } })
    }
}

export class BookEndpoint {
    async post(room_id: number, person: number, price: number, booker_name: string, booked_date: string, token: string) {
        return await axios.post(`${url}/book`, { room_id, person, price, booker_name, booked_date }, { headers: { 'Access-Token': token }})
    }
    async put(id: number, room_id: number, person: number, price: number, booker_name: string, booked_date: string, token: string) {
        return await axios.put(`${url}/book/${id}`, { room_id, person, price, booker_name, booked_date }, { headers: { 'Access-Token': token }})
    }
    async status(books: Book[], token: string) {
        return await axios.post(`${url}/book/status`, { books }, { headers: { 'Access-Token': token }})
    }
    async get(status: number, token: string) {
        return await axios.get(`${url}/book?status=${status}`, { headers: { "Access-Token": token } })
    }
    async delete(id: number, token: string) {
        return await axios.delete(`${url}/book/${id}`, { headers: { "Access-Token": token } })
    }
    async date(date: string, token: string) {
        return await axios.get(`${url}/book/date?date=${date}`, { headers: { "Access-Token": token } })
    }
}
