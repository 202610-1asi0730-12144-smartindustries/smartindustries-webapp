import {createRouter, createWebHistory} from "vue-router";
import Layout from "./shared/presentation/components/layout.vue";
import Home from "./shared/presentation/views/home.vue";

const routes = [
    { path: '', component: Layout, children: [
            { path: '', redirect: '/home'},
            { path: '/home', component: Home }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,

});


export default router;