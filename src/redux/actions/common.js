/**********************modal*******************/
export const start = ()=> {
    global.modal.openHalfTrans('RNLoading');
}
export const failure = detail=> {
    global.modal.openHalfTrans('RNAlert',{ tips:detail });
}
/**********************modal*******************/