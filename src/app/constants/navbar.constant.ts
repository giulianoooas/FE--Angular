import { Navbar } from "../models/navbar.model";

export const NAVBAR_USER_CONSTANT: Navbar[] = [
  {
    label: 'Cars',
    url: '/cars',
  },
  {
    label: 'Create car',
    url: '/cars/create'
  },
  {
    label: 'Categories',
    url: '/categories'
  }
]

export const NAVBAR_ANONYMOUS_CONSTANT: Navbar[] = [
  {
    label: 'Cars',
    url: '/cars',
  },
  {
    label: 'Categories',
    url: '/categories'
  }
]

export const NAVBAR_NO_LOGIN_CONSTANT: Navbar[] = [
  {
    label: 'Sing up',
    url: '/sing-up'
  },
  {
    label: 'Login',
    url: '/login'
  }
]
