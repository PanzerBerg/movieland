import { Dimensions } from 'react-native'
import { exp } from 'react-native-reanimated';

export function getDate(date: string) {
    let formatedDate
    let splitDate = date.split('-');
    let year = splitDate[0]
    let month = splitDate[1]
    let day = splitDate[2]

    formatedDate = [day, month, year]

    return formatedDate.join('/')
}

export function getTitleThreshold(length: number) {
    return Dimensions.get('screen').height / 2.05 - length
}

export function isTooWhite(hex: string) {
    const c = hex.substring(1)
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return (luma > 200)
}