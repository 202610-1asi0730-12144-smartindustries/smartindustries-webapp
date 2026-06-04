const dashboard = () => import( './views/dashboard.vue');
const accessEvents = () => import( './views/access-events.vue');
const alerts = () => import( './views/alerts.vue');

const reportRoutes = [
    { path: 'dashboard', component: dashboard },
    { path: 'access-events', component: accessEvents },
    { path: 'alerts', component: alerts },
]

export default reportRoutes