const Colors = {
    botao: "#202C89",
    buslab: "#202F90",
    azul: "#305AAB",
    vermelho: "#E65250",
    esmeralda: "#2FB5B1",
    laranja: "#FA9B6C",
    verde: "#84D193",
    amarelo: "#FFD068",
    cinzaFooter: "#A6A6A6",
    cinzaGrafico: "#6c6c6c",
    C2: "#F2F2F2",
    C3: "#EBEBEB",
    C6: "#737373",
    C7: "#404040",
};

export default Colors;

export function getColorByBgColor({ bgColor, lightColor, darkColor }) {
    if (!bgColor) {
        return "";
    }
    const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
}
