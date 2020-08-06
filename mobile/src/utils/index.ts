import { Dimensions } from 'react-native'
 
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
