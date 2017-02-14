var http = require("http")
var fs = require('fs')
var path = require('path')
var date = new Date()
var year = date.getFullYear()
var month = date.getMonth()+1
var imageFolder = [year,month]

console.log(__dirname)
var args = process.argv
// console.log(process)
// console.log(args)

var urls = []
function getImages(url){
  // fs.exists()
  http.get(url,function(res){
    var image = ''
    res.setEncoding('binary')

  })
}

if(args.length>2){
  for(var i=2;i<args.length;i++){
    urls.push(args[i])
  }
  // console.log(urls)
  if(urls.length)getImages(urls.shift())
}
