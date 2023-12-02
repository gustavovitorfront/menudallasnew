export const getCookie = (name) => {
  if (typeof window !== "undefined") {
    document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '')
  } else {
    return []
  }
};

export const setCookie = (name, value, days = 7, path = '/') => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();

  if (typeof window !== "undefined") {
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=${path}`;
  }
};

export const deleteCookie = (name, path) => {
  setCookie(name, '', -1, path);
};
