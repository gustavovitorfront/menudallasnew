import { format, parse } from 'date-fns'

export const getOpened = (dt) => {
    if(dt.aberto){
        return true;
    }

    const day = format(new Date(), "i");
    const now = new Date();
    const openingTime = parse(dt.hora_abre, "HH:mm", new Date());
    const closingTime = parse(dt.hora_fecha, "HH:mm", new Date());
    const isOpenDuringNight = closingTime < openingTime;
    const open = openingTime;
    const close = closingTime;

    let isCurrentlyOpen;
    if (isOpenDuringNight) {
        isCurrentlyOpen =
            (now >= open || now <= close) && now >= parse("00:00", "HH:mm", new Date()) && now <= parse("23:59", "HH:mm", new Date());
    } else {
        isCurrentlyOpen = now >= open && now <= close;
    }

    const isTodayOpen = (
        (day === "1" && dt.abre_segunda) ||
        (day === "2" && dt.abre_terca) ||
        (day === "3" && dt.abre_quarta) ||
        (day === "4" && dt.abre_quinta) ||
        (day === "5" && dt.abre_sexta) ||
        (day === "6" && dt.abre_sabado) ||
        (day === "7" && dt.abre_domingo)
    );

    if (!isCurrentlyOpen && (now.getHours() < 8 || now.getHours() >= 22)) {
        return false;
    }

    return isCurrentlyOpen && isTodayOpen;
};