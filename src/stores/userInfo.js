//存取和管理用戶(userInfo)

//Pinia 的導入和設置
import { defineStore } from 'pinia'  //Pinia 的一個函數，用來定義一個新的 store
import {ref} from 'vue' //是 Vue Composition API 中的一個函數，用來創建一個響應式的數據對象

//defineStore 函數的第一個參數是 store 的名稱 'userInfo'，這個名稱是這個 store 的標識符號
//第二個參數是一個函數，這個函數用來定義 store 的狀態、行為和其他屬性
const useUserInfoStore = defineStore('userInfo', ()=>{
    
    //定義狀態相關的內容
    const info = ref({}) //info 是一個響應式對象，用來存儲用戶的信息。這裡初始值是一個空對象。

    const setInfo = (newInfo)=>{ //setInfo 方法接收一個新對象 newInfo，並將 info 更新為這個新對象。
        info.value = newInfo
    }

    const removeInfo = ()=>{ //removeInfo 方法將 info 重置為一個空對象。
        info.value={}
    }

    return {info,setInfo,removeInfo} //這裡將 info 狀態和兩個方法 setInfo 和 removeInfo 返回，這樣它們就可以在其他組件中使用。

},{persist:true}) //第三個參數是一個配置對象，其中 persist: true 表示這個 store 的狀態會被持久化，即使頁面刷新也會保留這個狀態。


//主要功能是利用 Pinia 和 Vue Composition API 創建一個用戶信息的 store，該 store 包含用戶信息的狀態和相應的操作方法，並且支持狀態的持久化。這樣的設計有助於在應用中方便地管理和訪問用戶信息

export default useUserInfoStore;