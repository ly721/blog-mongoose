var express=require('express')
var User=require('./models/user')
var md5=require('blueimp-md5')

var router=express.Router()

router.get('/',function(req,res){
	res.render('index.html',{
		user: req.session.user
	})
})

router.get('/login',function(req,res){
	res.render('login.html')
})

router.get('/logout',function(req,res){
	//清除用户登录信息
	req.session.user=null
	// 跳转到首页
	res.redirect('/')
})

router.post('/login',function(req,res){
	// res.render('login.html')
	//获取用户提交的数据
	//处理数据判断用户存在
	//响应处理
	var body=req.body
	User.findOne({
		email: body.email,
		password: md5(md5(body.password))
	},function(err,user){
		if(err){
			return res.status(500).json({
				err_code: 500,
				message: 'server error.'
			})
		}
		
		if(!user){
			return res.status(200).json({
				err_code: 1,
				message: 'email or password is invalid'
			})
		}
		
		req.session.user=user
		
		return res.status(200).json({
			err_code: 0,
			message: 'OK'
		})
	})
})

router.get('/register',function(req,res){
	res.render('register.html')
})

router.post('/register',function(req,res){
    //判断该用户是否存在
	var body=req.body
	User.findOne({
		$or:[
			{
				email: body.email
			},
			{
				nickname: body.nickname
			}
		]
	},function(err,data){
		if(err){
			return res.status(500).json({
				err_code: 0,
				message: 'Server Error.'
			})
		}
		
		if(data){
			return res.status(200).json({
				err_code: 1,
				message: 'email or nickname is exist.'
			})
			return res.send(`邮箱或密码已存在`)
		}
		//对密码进行MD5重复加密
		body.password=md5(md5(body.password))
	    new User(body).save(function(err,user){
		if(err){
			return res.status(500).json({
				err_code: 500,
				message: 'Server Error.'
			})
		}
		req.session.user=user
		
			res.status(200).json({
			err_code: 0,
			message:'OK'
		   })
		   //重定向只对同步有效，对异步无效
		 // res.redirect('/')
		})
	})
})

module.exports=router