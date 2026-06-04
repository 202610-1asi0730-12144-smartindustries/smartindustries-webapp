import {createRouter, createWebHistory} from "vue-router";
import Layout from "./shared/presentation/components/layout.vue";
import Home from "./shared/presentation/views/home.vue";
import OperationsLayout from "./shared/presentation/components/operations-layout.vue";

const routes = [
    { path: '', component: Layout, children: [
            { path: '', redirect: '/home'},
            { path: '/home', component: Home },
            { path: '/operations', component: OperationsLayout }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,

});


export default router;