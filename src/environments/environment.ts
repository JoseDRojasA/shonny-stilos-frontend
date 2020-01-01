const BASE = 'http://localhost:8080'

export const environment = {
  production: false,
  backend: {
    user: `${BASE}/users`,
    brands: `${BASE}/brands`
  }
};
