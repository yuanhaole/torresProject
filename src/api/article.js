import request from '@/utils/request.js'
//import { useTokenStore } from '@/stores/token.js' //已經在攔截器增加tokenStore，所以不用在加headers這段

//文章列表查詢
export const articleCategoryListService = () =>{
    //const tokenStore = useTokenStore();
    //在pinia中定義的資料都不需要.value
    // return request.get('/category',{headers:{'Authorization':tokenStore.token}}) //已經在攔截器增加tokenStore，所以不用在加headers這段
    return request.get('/category')
}

export const articleCategoryAddService = (categoryData)=>{
    return request.post('/category',categoryData )
}

export const articleCategoryUpdateService = (categoryData)=>{
    return request.put('/category',categoryData)
}

export const articleCategoryDeleteService = (id)=>{
    return request.delete('/category?id=' + id)
}

export const articleListService = (params)=>{
    return request.get('/article',{params:params})
}

export const articleAddService = (articleData)=>{
    return request.post('/article',articleData)
}