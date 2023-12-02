export const isLogged = typeof window !== 'undefined' && localStorage.getItem('@menu-digital:profile') != null;
export const userDataLogged = typeof window !== 'undefined' && isLogged ? JSON.parse(localStorage.getItem('@menu-digital:profile')) : [];
export function handleLogout(){
    return localStorage.removeItem('@menu-digital:profile');
}
