import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// List of Delivery Options
export let deliveryOptions = [
    {
        id : "1",
        deliveryDays : 7,
        priceCents : 0
    },
    {
        id : "2",
        deliveryDays : 3,
        priceCents : 499
    },
    {
        id : "3",
        deliveryDays : 1,
        priceCents : 999
    }
];


// Used to return the matching Delivery Option using the Delivery Id
export function getDeliveryOption(id){
    let matchingOption;
    deliveryOptions.forEach(option => {
        if(option.id == id){
            matchingOption = option;
        }
    });
    return matchingOption;
}

// Checks the date is weekend or not
function isWeekend(date){
    return date.format('dddd') == 'Sunday' || date.format('dddd') == "Saturday";
}

// Calculates the Delivery Date according to the delivery Option
export function calculateDeliveryDate(deliveryOption, currDate){
    let date = dayjs(currDate);
    let numberOfDays = deliveryOption.deliveryDays;
    let i=0;
    while(i<numberOfDays){
        date = date.add(1,'days');
        if(isWeekend(date)){
            continue;
        }
        i+=1;
    }
    return date.format('dddd, MMMM D');
}