export const filterPromotionTamanhoArrayMenor = (tamanho) => {
    let arrayValores = [];

    if (tamanho.valor_g_promocao != undefined) {
        arrayValores.push(tamanho.valor_g_promocao);
    } else {
        arrayValores.push(tamanho.valor_g);
    }

    if (tamanho.valor_m_promocao != undefined) {
        arrayValores.push(tamanho.valor_m_promocao);
    } else {
        arrayValores.push(tamanho.valor_m);
    }

    if (tamanho.valor_p_promocao != undefined) {
        arrayValores.push(tamanho.valor_p_promocao);
    } else {
        arrayValores.push(tamanho.valor_p);
    }

    return Math.min(...arrayValores)
}

export const filterPromotionTamanhoArrayMaior = (tamanho) => {
    let arrayValores = [];

    if (tamanho.valor_g_promocao != undefined) {
        arrayValores.push(tamanho.valor_g_promocao);
    } else {
        arrayValores.push(tamanho.valor_g);
    }

    if (tamanho.valor_m_promocao != undefined) {
        arrayValores.push(tamanho.valor_m_promocao);
    } else {
        arrayValores.push(tamanho.valor_m);
    }

    if (tamanho.valor_p_promocao != undefined) {
        arrayValores.push(tamanho.valor_p_promocao);
    } else {
        arrayValores.push(tamanho.valor_p);
    }

    return Math.max(...arrayValores)
}

export const filterGpProduct = (entry, data) => {
    return entry.id_grupo == data.id_grupo;
}