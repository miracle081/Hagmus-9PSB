export function formatDecimal(number, fixed) {
    const strNumber = number.toString();
    const decimalIndex = strNumber.indexOf('.');

    if (decimalIndex === -1) {
        // If there's no decimal point, just return the original number
        return strNumber;
    } else {
        const integerPart = strNumber.substring(0, decimalIndex);
        const decimalPart = strNumber.substring(decimalIndex + 1);
        const truncatedDecimalPart = decimalPart.slice(0, fixed);
        const formattedNumber = integerPart + '.' + truncatedDecimalPart;
        return formattedNumber;
    }
}