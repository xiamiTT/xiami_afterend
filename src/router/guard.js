//因为这不是组件，没有实例， 自然没有this.$http方法，所以要手动导入axios
import axios from 'axios';

//$http无法使用，$api也没法使用，所以需要手动导入api_config

import apiConfig from '../js/api_config.js';





//该模块向外导出一个路由守卫函数

export default function(to, from, next) {

    //调用接口判断用户的登陆状态
    //再通过to对象的name属性得知用户去往的页面
    //如果去往登陆页面
    //登陆 -》 自动跳转首页 -》调用next('/)
    //未登陆 -》允许访问 -》调用next()
    // 如果去往非登陆页面  同理    git


    axios.get(apiConfig.islogin).then(rsp => {
            let islogin = rsp.data.code == 'logined';
            let toPage = to.name;

            //去往登陆
            if (toPage == 'l') {
                if (islogin) {
                    next('/')
                } else {
                    next();
                }
            }

            //去往非登陆

            if (toPage != 'l') {
                console.log(islogin);


                if (islogin) {
                    next()
                } else {
                    next('/login');
                }

            }
        })
        // next();
}