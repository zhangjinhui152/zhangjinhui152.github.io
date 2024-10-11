import { createRouter, createWebHistory } from 'vue-router'
import main from '../components/main.vue'
import viewText from '../components/view-text.vue'

const routes = [
    {
        path: '/',
        name: 'main',
        component: main
    },
    {
        path: '/about',
        name: 'about',
        component: main
    },
    {
        path: '/archive',
        name: 'archive',
        component: main
    },
    {
        path: '/viewText',
        name: 'viewText',
        component: viewText
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;//这段后，要有回车保留一个空行否则会报错。