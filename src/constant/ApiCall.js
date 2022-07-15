import { create } from 'apisauce'

const api = create({
    baseURL: 'https://admin.blueteam.xyz',
    headers: { 'Content-Type': 'application/json' },
  })
  export { api as default }
  