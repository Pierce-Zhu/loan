import * as IApiImpl from './IApi.impl.js';

const Interface = {
    login: IApiImpl.login,
    register:IApiImpl.register,
    modifyLoginPassword:IApiImpl.modifyLoginPassword,
    submitBaseInfo:IApiImpl.submitBaseInfo,
    loan: IApiImpl.loan,
    queryLoan: IApiImpl.queryLoan,
    queryLoanRecord: IApiImpl.queryLoanRecord,
    confirmLoan: IApiImpl.confirmLoan,
    uploadIDCard:IApiImpl.uploadIDCard,
    uploadLiveness:IApiImpl.uploadLiveness,
}
export default Interface;