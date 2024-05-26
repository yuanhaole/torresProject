import request from '@/utils/request.js'
//import { useTokenStore } from '@/stores/token.js' //已經在攔截器增加tokenStore，所以不用在加headers這段

//文章列表查詢
export const articleCategoryListService = () =>{
    //const tokenStore = useTokenStore();
    //在pinia中定義的資料都不需要.value
    // return request.get('/start/category',{headers:{'Authorization':tokenStore.token}}) //已經在攔截器增加tokenStore，所以不用在加headers這段
    return request.get('/start/category')
}

export const articleCategoryAddService = (categoryData)=>{
    return request.post('/start/category',categoryData )
}

export const articleCategoryUpdateService = (categoryData)=>{
    return request.put('/start/category',categoryData)
}

export const articleCategoryDeleteService = (id)=>{
    return request.delete('/start/category?id=' + id)
}

export const articleListService = (params)=>{
    return request.get('/start/article',{params:params})
}

export const articleAddService = (articleData)=>{
    return request.post('/start/article',articleData)
}