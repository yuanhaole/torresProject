<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const categories = ref([])
//宣告非同步的函數
import {articleCategoryListService, 
    articleCategoryAddService, 
    articleCategoryUpdateService, 
    articleCategoryDeleteService
} from '@/api/article.js'
const articleCategoryList = async() => {
    let result = await articleCategoryListService();
    categories.value = result.data;
}
articleCategoryList();

// 控制加入分類彈跳視窗
const dialogVisible = ref(false)

// 加入分類數據模型
const categoryModel = ref({
    categoryName: '',
    categoryAlias: ''
})

// 加入分類表單驗證
const rules = {
    categoryName: [
        { required: true, message: '請輸入分類名稱', trigger: 'blur' },
    ],
    categoryAlias: [
        { required: true, message: '請輸入分類別名', trigger: 'blur' },
    ]
}

//加入表單
import { ElMessage } from 'element-plus';
const addCategory = async ()=>{
    let result = await articleCategoryAddService(categoryModel.value);
    ElMessage.success(result.msg? result.msg:'加入成功')

    //加入後，在讀取一次articleCategoryList
    articleCategoryList();
    dialogVisible.value=false;
}

//定義控制標題的顯示
const title = ref('')

//展示編輯彈跳視窗
const showDialog = (row) =>{
    dialogVisible.value = true; title.value = '編輯分類'
    //把編輯的資料放到row內
    categoryModel.value.categoryName = row.categoryName;
    categoryModel.value.categoryAlias = row.categoryAlias;
    //取得要修改資料的row id，最終傳給後端
    categoryModel.value.id = row.id;
}

//編輯
const updateCategory = ()=>{
    let result = articleCategoryUpdateService(categoryModel.value);
    ElMessage.success(result.msg? result.msg: '修改成功')

    //刷新
    articleCategoryList();
    //隱藏
    dialogVisible.value=false;

}
//清空model的資料
const clearData = ()=>{
    categoryModel.value.categoryName='';
    categoryModel.value.categoryAlias='';
}

import { ElMessageBox } from 'element-plus'
//刪除文章分類
const deteleCategory = (row)=>{
    //彈跳警示視窗
    ElMessageBox.confirm(
        '確定要刪除該文章分類嗎?',
        '溫馨提示',
        {
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        type: 'warning',
        }
    )
    .then(async () => {
      //呼叫刪除文章分類的介面
      let result = await articleCategoryDeleteService(row.id);
      ElMessage({
        type: 'success',
        message: '刪除成功',
      })
      //刷新
      articleCategoryList();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消刪除',
      })
    })
}
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分類</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogVisible=true;title='加入分類';clearData()">加入分類</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categories" style="width: 100%">
            <el-table-column label="序號" width="100" type="index"> </el-table-column>
            <el-table-column label="分類名稱" prop="categoryName"></el-table-column>
            <el-table-column label="分類別名" prop="categoryAlias"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deteleCategory(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="沒有數據" />
            </template>
        </el-table>

        <!-- 加入/編輯 共用 分類彈跳視窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="分類名稱" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="分類別名" prop="categoryAlias">
                    <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="title=='加入分類'? addCategory() : updateCategory()"> 確認 </el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>