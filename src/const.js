const Status = {
    BACKLOG: 'backLog',
    PROCESSING: 'inProcess',
    READY: 'ready',
    TRASH: 'trash'
};

const StatusLabel = {
    [Status.BACKLOG]: `Бэклог`,
    [Status.PROCESSING]: `В процессе`,
    [Status.READY]: `Готов`,
    [Status.TRASH]: `Корзина`,
};

export {Status, StatusLabel};