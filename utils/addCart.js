export const addCart = (values, empresa) => {
    let or = localStorage.getItem("@menu-digital:"+empresa+":order");
    let dt = localStorage.getItem("@menu-digital:"+empresa+":bag") ? JSON.parse(localStorage.getItem("@menu-digital:"+empresa+":bag")) : []

    if (or !== null) {
        localStorage.removeItem("@menu-digital:"+empresa+":order")
        or = JSON.parse(or)
        delete or.id_forma
        delete or.forma
        delete or.valor_para_troco
        localStorage.setItem("@menu-digital:"+empresa+":order", JSON.stringify(or))
    }
    localStorage.removeItem("@menu-digital:"+empresa+":bag")
    dt.push(values)
    localStorage.setItem("@menu-digital:"+empresa+":bag", JSON.stringify(dt))
}