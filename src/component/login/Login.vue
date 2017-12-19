<template>
    <div class="login">
     <div class="login_content">
         <!-- logo -->
         <section class="login_content_login"><img src="../../img/logo.png" alt=""></section>  
          <!-- 表单 -->
         <section class="login_content_form" ref="xiami">
            <!-- 要设置model属性 -->
    <el-form :model="user" :rules="formRules" status-icon ref="ruleForm2" 
    label-position="left"
 label-width="70px" class="demo-ruleForm">
       <!-- 要效验，就要设置post属性 -->
        <el-form-item label="用户名" prop="uname">
            <!-- input 记得改写model的值 -->
            <el-input type="text" v-model="user.uname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="upwd">
            <el-input type="password" v-model="user.upwd" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
    </el-form>

         </section>
               
     </div>
    </div>
</template>

<script>
    export default {
        data(){
  return{
      user:{
            uname: '',
          upwd :''
      },
      //效验
      formRules:{
          uname:[
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { pattern: /\w{5,18}/, message: '长度在 4 到 18 个字符, 且只能为&_或字母与数字', trigger: 'blur' },
          ],
          upwd:[
              { required: true, message: '请输入密码', trigger: 'blur' },
                 { pattern: /.{6,18}/, message: '长度在 6 到 18 个字符', trigger: 'blur' },
          ]
  }
   }
        },
            methods: {
                login(){
                    this.$http.post(this.$api.login,this.user)
                    .then(rsp=>{
                        let {status,message}=rsp.data; // 解构两个属性值
                        if(status==0){
                            localStorage.setItem('user',JSON.stringify(message));
                            this.$router.push('/');

                        }else{
                            alert('哼，你个幼稚鬼')
                        }

                    })
                },
        submitForm(formName) {
            //先效验表单
            this.$refs[formName].validate( (result) =>{
                if(result){
                    this.$http.post(this.$api.login,this.user)
                    .then(rsp=> this.$router.push({ name: 'a', params: { uname: rsp.data.message.uname } }));
                    this.login();
                }else{
                    alert('你的想法太幼稚')
                }
            })
      
        },

    }
    }
   
</script>

<style scoped lang="less">
.login{
    height: 100%;
    
background-color: rgb(38, 124, 183);

    // &上级选择器的引用
    &_content{
     
       width: 400px;
       position: absolute;
       left: 50%;
       top: 50%;
       margin-left: -200px;
       margin-top: -160px;
      
    padding: 10px;
    border: 1px solid hsla(0, 0%, 100%, .2);
    border-radius: 4px;

       &_login{
           text-align: center
       }
       &_form{
           margin-top: 10px;
           padding: 2px 10px;
           color: '#fff';


       }
    }
}
</style>