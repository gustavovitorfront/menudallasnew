import createResourceRoute from "./utils/createResourceRoute";

export default {
  auth: {
    login: '/login',
    register: '/register',
    mfa: '/login/mfa',
    logout: '/logout',
    switchTenant: '/tenant/switch-tenant'
  },

  config: {
    modules: createResourceRoute('config/modules')
  },

  crudExample: createResourceRoute('crudExample')
};
