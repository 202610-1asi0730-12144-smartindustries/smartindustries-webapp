const SignIn = () => import('./views/sign-in.vue')
const SignUp = () => import('./views/sign-up.vue')

export default [
  { path: '/auth/sign-in', component: SignIn },
  { path: '/auth/sign-up', component: SignUp },
  { path: '/auth', redirect: '/auth/sign-in' },
]
