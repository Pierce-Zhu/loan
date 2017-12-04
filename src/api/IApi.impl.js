export const login = async params=>{
    const res = await Loan.api.post('/account/login',params);
    return res;
}

export const register = async params=> {
    const res = await Loan.api.post('/account/register',params);
    return res;
}
export const modifyLoginPassword = async params=> {
    const res = await Loan.api.post(`/account/modifyLoginPassword`,params);
    return res;
}
export const resetLoginPassword = async params=> {
    const res = await Loan.api.post(`/account/resetLoginPassword`,params);
    return res;
}
export const submitBaseInfo = async params=> {
    const res = await Loan.api.post(`/account/baseAuth`,params);
    return res;
}
export const loan = async params=> {
    const res = await Loan.api.post(`/loan/borrowapp`,params);
    return res;
}
export const queryLoan = async params=> {
    const res = await Loan.api.get(`/loan/queryapp`,params);
    return res;
}
export const queryLoanRecord = async params=> {
    // const res = await Loan.api.post(`/loan/queryborrow`,params);
    const res = await Loan.api.get(`/loan/queryborrow`,params);
    return res;
}
export const confirmLoan = async params=> {
    const res = await Loan.api.post(`/loan/borrowack`,params);
    return res;
}
export const uploadIDCard = async params=> {
    const res = await Loan.api.uploadImages(`/account/idcard`,params);
    return res;
}
export const uploadLiveness = async params=> {
    const res = await Loan.api.uploadImages(`/account/liveness`,params);
    return res;
}