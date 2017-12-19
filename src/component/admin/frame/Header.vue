<template>
    <div>

    <el-dropdown 
    @command="handleCommand"
>
         <span 
    class="el-dropdown-link"
>
  您好,{{username}}
  {{user.uname}}
  
    <i class="el-icon-arrow-down el-icon--right"></i>

  </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item 
    command="logout">注销登陆</el-dropdown-item>
         
        </el-dropdown-menu>
    </el-dropdown>

    </div>
</template>

<script>
    export default {
         data(){
             return{
                 //通过路由参数拿到用户名
                username: this.$route.params.uname,
                  // 通过localStorage拿到用户名, 如果没有设一个空对象

               user: JSON.parse(localStorage.getItem('user')) || {}
             }
         },
         methods:{
             //调用接口注销登陆，成功后调到登陆页面
                // 调用接口注销登陆, 成功后清除localStorage存储的用户信息, 然后再跳转到登陆页
             logout(){
             this.$http.get(this.$api.logout)
                .then(rsp => this.$router.push('/login'))
                .then(rsp=>{
                     localStorage.removeItem('user');
                     this.$router.push('/login');
                 });
             
             
         },
             //点击菜单时的处理函数
             handleCommand(command){
                 switch(command){
                     case 'logout':
                     this.logout();
                     break;
                 }
             }
         }
    }
</script>

<style scoped>

</style>