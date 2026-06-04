const people = () => import('./views/people.vue');
const devices = () => import('./views/devices.vue');
const sites = () => import('./views/sites.vue');

const accessManagementRoutes = [
    { path: "people", component: people },
    { path: "devices", component: devices },
    { path: "sites", component: sites },
]

export default accessManagementRoutes;