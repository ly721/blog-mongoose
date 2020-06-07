var mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/blog',{useNewUrlParser: true})

var Schema=mongoose.Schema

var userSchema=new Schema({
	email:{
		type: String,
		required: true
	},
	nickname:{
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	create_time: {
		type: Date,
		default: Date.now
	},
	last_modified_time: {
		type: Date,
		default: Date.now
	},
	avatar: {
		type: String,
		default: '/public/img/avatar-default.png'
	},
	bio: {
		type: String,
		defaulte: ''
	},
	gender: {
		type:Number,
		enum: [-1,0,1],
		default: -1
	},
	birthday: {
		type: Date
	},
	status: {
		//0 没有权限
		//1不可以评论
		//2不可以登录使用
		enum: [0,1,2],
		default: 0
	}
})

module.exports=mongoose.model('User',userSchema)