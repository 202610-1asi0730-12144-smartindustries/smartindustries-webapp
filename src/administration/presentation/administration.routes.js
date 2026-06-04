const roles = () => import('./views/roles.vue')
const administrators = () => import('./views/administrators.vue')

const administrationRoutes = [
    {path: 'roles', component: roles},
    {path: 'administrators', component: administrators},
]

export default administrationRoutes