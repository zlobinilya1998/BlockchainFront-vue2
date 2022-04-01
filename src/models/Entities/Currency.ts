export const statuses = {
    open: {
        icon: 'checkmark',
        text: 'открыт',
        color: '#31cd31',
    },
    close: {
        icon: 'cancel',
        text: 'закрыт',
        color: '#e20853',
    },
}
export const getStatus = (status: Status) => statuses[status] ?? statuses.close;

export enum Status {
    open = 'open',
    close = 'close',
}

export type Currency = {
    base_currency: string,
    base_currency_scale: number,
    counter_currency: string,
    counter_currency_scale: number,
    min_price_increment: number,
    min_price_increment_scale: number,
    min_order_size: number,
    min_order_size_scale: number,
    max_order_size: number,
    max_order_size_scale: number,
    lot_size: number,
    lot_size_scale: number,
    status: Status,
    id: number,
    auction_price: number,
    auction_size: number,
    auction_time: string,
    imbalance: number,
}
