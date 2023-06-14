// 对所有的api接口进行统一管理
import requests from './request'

// 添加管理员账号接口
export const register = (dataInfo) => requests({
    url: '/register',
    method: 'post',
    data: dataInfo
})
// 登录接口
export const login = (readerInfo) => requests({
    url: '/login',
    method: 'post',
    data: readerInfo
})
// 书籍接口
export const initBooksList = () => requests({
    url: '/books',
    method: 'post'
})
// 评论区接口
export const initCommentsList = () => requests({
    url: '/comments',
    method: 'post'
})
// 添加评论接口
export const addComment = (dataObj)=>requests({
	url: '/addcomment',
	method: 'post',
	data: dataObj
})
// 点赞接口
export const addPraise = (dataObj)=>requests({
	url: '/addpraise',
	method: 'post',
	data: dataObj,
})
// 书名查找接口
export const searchBook = (bookNameObj) => requests({
    url: '/searchbook',
    method: 'post',
    data: bookNameObj
})

//管理员修改订单
export const ModifyOrder=(daObj)=>requests({
    url:'/modifyorder',
    method:'post',
    data:daObj
})
//获取订单列表
export const getOrderList=()=>requests({
    url:'/orderlist',
    method:'get',
})

// 管理员获取用户信息接口
export const initUserList = () => requests({
    url: '/initreaderlist',
    method: 'post',
})
// 管理员添加书籍接口
export const addBooks = (formData) => requests({
    url: '/adminaddbooks',
    method: 'post',
    data:formData
})
// 管理员删除评论
export const auditComment = (infoObj) => requests({
    url: '/auditcomment',
    method: 'post',
    data:infoObj
})
// 管理员修改图书信息接口
export const changeBookInfo = (infoObj) => requests({
    url: '/changebookinfo',
    method: 'post',
    data:infoObj
})
// 管理员删除图书信息接口
export const delBook = (infoObj) => requests({
    url: '/delbook',
    method: 'post',
    data:infoObj
})
// 管理员订单提交
export const submitOrder = (infoObj) => requests({
    url: '/submitorder',
    method: 'post',
    data:infoObj
})
//查询订单
export const searchOrders=(dataObj)=>requests({
    url:'/searchorder',
    method:'post',
    data:dataObj
})
//查询书籍相关评论
export const searchBookComment=(bookNameObj)=>requests({
    url:'/bookamount',
    method:'post',
    data:bookNameObj
})




// 重新获取学生信息接口
export const initReader = (readerId) => requests({
    url: '/initreader',
    method: 'post',
    data: readerId
})


