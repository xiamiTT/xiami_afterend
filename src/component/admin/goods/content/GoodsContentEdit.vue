<template>
    <div>
   商品内容编辑
   
<div class="edit">
    
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品编辑</el-breadcrumb-item>
    </el-breadcrumb>



    
    <!-- Form表单: model关联表单数据, rules设置表单校验规则 -->

    <section class="edit_box">

        <el-form :rules="rules" ref="ruleForm" :model="ruleForm" label-width="100px" class="edit__form">

    <!-- 字段如果要进行校验或者重置, 那么必须设置prop属性才可以  -->

            <el-form-item label="内容标题" prop="title">

                <el-input v-model="ruleForm.title"></el-input>

            </el-form-item>

            <el-form-item label="副标题" prop="sub_title">

                <el-input v-model="ruleForm.sub_title"></el-input>

            </el-form-item>
            
    <!-- 这个select数据是动态获取的, 需要v-for渲染option -->


            <el-form-item label="所属类别" prop="category_id">
                <el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">
                    
    <!-- 这里label属性设置option提示文本, value属性设置被选时的值 -->

<el-option v-for="item in goodsCategory" :key="item.category_id" :label="item.title" :value="item.category_id">
    
    <!-- 根据分类层级生成不同的空隙 -->
    <span v-for="i in (item.class_layer-1)" :key="i">&nbsp;</span>
    <!-- 顶级没有空虚 -->

    <span v-if="item.class_layer!=1">~~</span>
    <!-- 显示文本 -->
    <span>{{item.title}}</span>

</el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="是否发布" prop="status">

                <el-switch v-model="ruleForm.status"></el-switch>

            </el-form-item>
            <el-form-item label="推荐类型" required>

                <el-switch v-model="ruleForm.is_slide" active-text="轮播图"></el-switch>

                <el-switch v-model="ruleForm.is_top" active-text="置顶"></el-switch>

                <el-switch v-model="ruleForm.is_hot" active-text="火热"></el-switch>

            </el-form-item>
            <el-form-item label="封面上传">

                <!-- 封面上传 -->


    <!-- action属性用来配置上传接口, file-list用来关联数据进行展示, list-type用于设置展示的样式 -->
    
    <!-- on-success属性用于设置图片上传的成功回调, 成功后我们要把服务端返回的数据添加到表单的ruleForm.fileList字段 -->
      
      
 
    <el-upload class="upload-demo" :action="uploadImgUrl"  list-type="picture" :file-list="ruleForm.imgList"  :on-success="uploadImgHandler">
       
        <el-button size="small" type="primary">图片上传</el-button>
        </el-upload>


            </el-form-item>
            <el-form-item label="附件上传">
                 <!-- 附件上传 -->
                 
    <el-upload class="upload-demo" action="uploadFileUrl"  multiple :limit="3" :file-list="ruleForm.fileList" :on-success="uploadFileHandler">
        <el-button size="small" type="primary">附件上传</el-button>
      
    </el-upload>

            </el-form-item>
            <el-form-item label="商品货号" prop="goods_no">
                <el-input v-model="ruleForm.goods_no"></el-input>
            </el-form-item>

            <el-form-item label="库存数量" prop="stock_quantity">
                <el-input v-model="ruleForm.stock_quantity"></el-input>
            </el-form-item>

            <el-form-item label="市场价格" prop="market_price">
                <el-input v-model="ruleForm.market_price"></el-input>
            </el-form-item>

            <el-form-item label="销售价格" prop="sell_price">
                <el-input v-model="ruleForm.sell_price"></el-input>
            </el-form-item>

            <el-form-item label="内容摘要" prop="zhaiyao">
                <el-input  type="textarea" v-model="ruleForm.zhaiyao"></el-input>
            </el-form-item>

           
   

    <el-form-item label="详细信息" prop="content">
        
       
        
        <quill-editor v-model="ruleForm.content"></quill-editor>
    </el-form-item>

  


            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </section>

</div>


    </div>
</template>

<script>

// 导入富文本编辑器样式以及组件
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default {
    data() {
        return {
               // 两个文件上传接口, 因为上传使用的是elementUI组件, 所以必须传完整的接口url
               uploadImgUrl:this.$apiDomain+this.$api.atImg,
               uploadFileUrl:this.$apiDomain+this.$api.atFile,
            id:this.$route.params.id,
            //表单数据
            ruleForm: {
                "title": "Hazzys哈吉斯2017新款男士长袖衬衫纯棉修身英伦衬衫显瘦商务衬衣",
                "sub_title": "英伦轻奢 专柜同款 为不凡而生",
                "goods_no": "NZ0000000002",
                "category_id": "151",
                "stock_quantity": 200,
                "market_price": 1000,
                "sell_price": 800,
                "status": true,
                "is_slide": true,
                "is_top": false,
                "is_hot": true,
                "zhaiyao": "为不凡而生",
                "content": "<p><strong>产品参数：</strong></p>",
                "imgList": [
                    {
                        "name": "wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
                        "url": "http://127.0.0.1:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
                        "shorturl": "/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg"
                    }
                ],
                "fileList": [
                    {
                        "name": "HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
                        "url": "http://127.0.0.1:8899/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
                        "shorturl": "/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg"
                    }
                ]
            },
                    rules: {
                title: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                sub_title: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                goods_no: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                stock_quantity: [
                    { required: true, message: '请选择时间', trigger: 'change' }
                ],
                market_price: [
                    {  required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                sell_price: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
              
            },
            //商品分类
            goodsCategory:[]

        }
    },
    methods: {
  // 封面上传成功, 要把服务端返回的url数据结果, 保存到form表单当中, 将来随着表单提交
  uploadImgHandler(data){
      console.log(arguments);
      this.ruleForm.imgList=[data];  // 封面图只能有一张, 所以直接赋值一个新数组



  },
   // 附件上传成功, 要把服务端返回的url数据结果, 保存到form表单当中, 将来随着表单提交
   uploadFileHandler(data){
       this.ruleForm.fileList.push(data);

   },



 





 // 获取商品分类信息, 获取分类的接口多个模块公用一个, 需要通过模块名称进行不同分类请求

  getGoodsCategory(){
         this.$http.get(this.$api.ctList+'goods')
         .then(rsp=>{
             this.goodsCategory=rsp.data.message;
         })
  },

        //    获取商品信息, 记得后面加上商品ID参数
        getGoods(){
            this.$http.get(this.$api.gsDetail+this.id)
           .then(rsp=>{
                // 为了让select能够自动选取默认的值, 把category_id转换为number, 与分类列表的id数据类型一致
                rsp.data.message.category_id=+rsp.data.message.category_id;
                this.ruleForm=rsp.data.message;
           })
        },
 // 修改商品信息, 记得后面加上商品ID参数

 modfiyGoods(){
    this.$http.post(this.$api.gsEdit+this.id,this.ruleForm)
    .then(rsp=>this.$alert(rsp.data.message));
 },
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                   this.modfiyGoods();

                }
            })
        },

        resetForm(formName){
            this.$refs[formName].resetFields();
        }
          
    },
    created(){
              this.getGoodsCategory();
        this.getGoods();
    },
    components: {
            quillEditor
}
}
</script>

<style scoped lang="less">
   .edit{
       margin-top: 10px;
  &_box {
      margin-top: 20px;
      border: 1px solid #cccccc;
      border-radius: 8px;
      padding-top: 20px;
  }

  &__from {
      width: 650px;
  }

   }
</style>