var express = require('express');
var router = express.Router();

//导入lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
const adapter = new FileSync(__dirname + '/../data/db.json')
const db = low(adapter)
// const shortid = require('shortid')

//记账本列表
router.get('/record', function(req, res, next) {
  res.render('record')
});

// router.get('/table', function(req, res, next) {
//   res.render('table')
// });

router.get('/accounts',(req,res)=>{
  let accounts = db.get('accounts').value()
  console.log(accounts)
  res.render('accounts',{accounts:accounts})
})

router.post('/record',(req,res)=>{
  let id = shortid.generate()
  // console.log(req.body);
  db.get('accounts').unshift({id:id,...req.body}).write()
  res.render('tip',({msg:'添加事项成功',url:'/accounts/accounts'}))
})

module.exports = router;
