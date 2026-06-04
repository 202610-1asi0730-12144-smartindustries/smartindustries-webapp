import {createRouter, createWebHistory} from "vue-router";
import Layout from "./shared/presentation/components/layout.vue";
import Home from "./shared/presentation/views/home.vue";
import OperationsLayout from "./shared/presentation/components/operations-layout.vue";
import spaceManagementRoutes from "./space-management/presentation/space-management.routes.js";
import reportRoutes from "./report/presentation/report.routes.js";
import administrationRoutes from "./administration/presentation/administration.routes.js";
import accessRoutes from "./access/presentation/access.routes.js";

const operationsRoutes = [
    ...spaceManagementRoutes,
    ...reportRoutes,
    ...administrationRoutes,
    ...accessRoutes,
]

const routes = [
    { path: '', component: Layout, children: [
            { path: '', redirect: '/home'},
            { path: '/home', component: Home },
            { path: '/operations', component: OperationsLayout, children: [
                    { path: '', redirect: '/operations/dashboard' },
                    ...operationsRoutes,
                ]
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,

});


export default router;