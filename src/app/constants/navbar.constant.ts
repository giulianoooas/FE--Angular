import { Navbar } from "../models/navbar.model";

export const NAVBAR_LIBRARY_CONSTANT: Navbar[] = [
  {
    label: 'Books',
    url: '/books',
  },
  {
    label: 'Create book',
    url: '/books/create'
  },
  {
    label: 'Categories',
    url: '/categories'
  }
]

export const NAVBAR_CUSTOMER_CONSTANT: Navbar[] = [
  {
    label: 'Books',
    url: '/books',
  },
  {
    label: 'Categories',
    url: '/categories'
  }
]


export const NAVBAR_ANONYMOUS_CONSTANT: Navbar[] = [
  {
    label: 'Books',
    url: '/books',
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
