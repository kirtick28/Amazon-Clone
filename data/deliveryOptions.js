import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export let deliveryOptions = [
    {
        id : 1,
        deliveryDays : 7,
        priceCents : 0
    },
    {
        id : 2,
        deliveryDays : 3,
        priceCents : 499
    },
    {
        id : 3,
        deliveryDays : 1,
        priceCents : 999
    }
];

export function getDeliveryOption(id){
    let matchingOption;
    deliveryOptions.forEach(option => {
        if(option.id == id){
            matchingOption = option;
        }
    });
    return matchingOption;
}

export function calculateDeliveryDate(deliveryOption){
    return dayjs().add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D')
}