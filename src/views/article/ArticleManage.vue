<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

import { ref } from 'vue'

// 文章分類資料模型
const categories = ref([])

// 用戶搜尋時選中的分類id
const categoryId = ref('')

// 用戶搜尋時選中的發布狀態
const state = ref('')

// 文章列表資料模型
const articles = ref([])

// 分頁條資料模型
const pageNum = ref(1) // 當前頁
const total = ref(20) // 總條數
const pageSize = ref(3) // 每頁條數

// 當每頁條數發生變化，呼叫此函數
const onSizeChange = (size) => {
    pageSize.value = size
    articleList()
}
// 當前頁碼發生變化，呼叫此函數
const onCurrentChange = (num) => {
    pageNum.value = num
    articleList()
}

//下拉式選單顯示文章分類
import { articleCategoryListService, articleListService, articleAddService } from '@/api/article.js'
const articleCategoryList = async()=>{
    let result = await articleCategoryListService();

    categories.value = result.data;
}

const articleList = async ()=>{
    let params = {
        pageNum:pageNum.value,
        pageSize:pageSize.value,
        categoryId:categoryId.value? categoryId.value : null,
        state:state.value? state.value : null
    }
    let result = await articleListService(params);
    
    //渲染View
    console.log(result.data)
    total.value = result.data.totle || 0;
    articles.value = result.data.items;

    //透過分類的ID取得文章分類名稱
    for(let i = 0; i < articles.value.length; i++){
        let article = articles.value[i];
        for(let j = 0; j < categories.value.length; j++){
            if(article.categoryId == categories.value[j].id){
                article.categoryName = categories.value[j].categoryName;
            }
        }
    }

}

//重整表單
articleCategoryList() //要先拿到categoryList才能正常取得到articleList
articleList();

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
// 控制抽屜是否顯示
const visibleDrawer = ref(false)
// 新增文章的表單資料
const articleModel = ref({
    title: '',
    categoryId: '',
    coverImg: '',
    content: '',
    state: ''
})

//導入token
import{ useTokenStore } from '@/stores/token.js'
const tokenStore = useTokenStore();

//上傳成功回傳函數
const uploadSuccess = (result)=>{
    const imageUrl = result.data;
    articleModel.value.coverImg = imageUrl;
    console.log(result.data);
}

import { ElMessage } from 'element-plus';
//加入文章
const addArticle = async (clickState) =>{
    //先將狀態賦值給模型
    articleModel.value.state = clickState;

    let result = await articleAddService(articleModel.value);

    ElMessage.success(result.msg? result.msg:'加入成功');

    //抽屜消失
    visibleDrawer.value = false;

    //重整表單
    articleList();
}
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章管理</span>
                <div class="extra">
                    <el-button type="primary" @click="visibleDrawer=true">新增文章</el-button>
                </div>
            </div>
        </template>
        <!-- 搜尋表單 -->
        <el-form inline>
            <el-form-item label="文章分類：">
                <el-select placeholder="請選擇" v-model="categoryId" style="width:200px;">
                    <el-option 
                        v-for="c in categories" 
                        :key="c.id" 
                        :label="c.categoryName"
                        :value="c.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="發布狀態：">
                <el-select placeholder="請選擇" v-model="state" style="width:200px;">
                    <el-option label="已發布" value="已發布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="articleList">搜尋</el-button>
                <el-button @click="categoryId='';state='';">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 文章列表 -->
        <el-table :data="articles" style="width: 100%">
            <el-table-column label="文章標題" width="400" prop="title"></el-table-column>
            <el-table-column label="分類" prop="categoryName"></el-table-column>
            <el-table-column label="狀態" prop="state"></el-table-column>
            <el-table-column label="發表時間" prop="createDateTime"> </el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary"></el-button>
                    <el-button :icon="Delete" circle plain type="danger"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="沒有資料" />
            </template>
        </el-table>
        <!-- 分頁條 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />

        <!-- 抽屜 -->
        <el-drawer v-model="visibleDrawer" title="新增文章" direction="rtl" size="50%">
            <!-- 新增文章表單 -->
            <el-form :model="articleModel" label-width="100px">
                <el-form-item label="文章標題">
                    <el-input v-model="articleModel.title" placeholder="請輸入標題"></el-input>
                </el-form-item>
                <el-form-item label="文章分類">
                    <el-select placeholder="請選擇" v-model="articleModel.categoryId">
                        <el-option v-for="c in categories" :key="c.id" :label="c.categoryName" :value="c.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章封面">
                    <!-- 
                        auto-upload:設定是否自動上傳
                        action:設定service的路徑
                        name:設定上傳的文件名稱
                        headers:上傳的header
                        on-success:設定上傳成功後的回傳值
                    -->
                    <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                    action="/api/start/upload"
                    name="file"
                    :headers="{'Authorization':tokenStore.token}"
                    :on-success="uploadSuccess"
                    >
                        <img v-if="articleModel.coverImg" :src="articleModel.coverImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文章內容">
                    <div class="editor">
                        <quill-editor
                                    theme="snow"
                                    v-model:content="articleModel.content"
                                    contentType="html"
                                    >
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addArticle('已發布')">發佈</el-button>
                    <el-button type="info" @click="addArticle('草稿')">草稿</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>

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
/* 抽屜的樣式 */
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>