import request from '@/utils/request.js'

//提供註冊port的Function
export const userRegisterService = (registerData)=>{
    //透過UrlSearchParams傳參數 
    const params = new URLSearchParams()
    for(let key in registerData){
        params.append(key,registerData[key]);
    }
    return request.post('/start/account/register',params);
}

//login
export const userLoginService = (loginData)=>{
    const params = new URLSearchParams()
    for(let key in loginData){
        params.append(key,loginData[key]);
    }
    return request.post('/start/account/login',params);
}

//get userInfo
export const userInfoService = ()=>{
    return request.get('/start/account/accountInfo')
}

//update userInfo
export const userInfoUpdateService = (userInfoData)=>{
    return request.put('/start/account/update',userInfoData)
}