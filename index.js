var http = require("http")
var fs = require('fs')
var path = require('path')
var date = new Date()
var year = date.getFullYear()
var month = date.getMonth()+1
var imageFolder = [year,month]

var imageFolderPath = [__dirname,imageFolder.join('')]
imageFolderPath = imageFolderPath.join('/')
var args = process.argv

var urls = []
function getImages(url){
  fs.exists(imageFolderPath,function(bl){
    if(!bl){
      fs.mkdir(imageFolderPath,function(err){
        getImages(url)
      })
    }else{
      var fileName = imageFolderPath+'/'+imageFolder.join('')+Date.now()+'.jpeg'
      http.get(url,function(res){
        var image = ''
        res.setEncoding('binary')
        res.on('data',function(chunk){
          image += chunk
        })
        res.on('end',function(){
          fs.writeFile(fileName,image,'binary',function(err){
            if(!err) {
              if(urls.length){
                console.log('共'+urls.length+'张图片')
                getImages(urls.shift())
              }
              console.log('保存成功')
            }
          })
        })
      })
    }
  })
  
}

if(args.length>2){
  for(var i=2;i<args.length;i++){
    urls.push(args[i])
  }
  if(urls.length){
    console.log('共'+urls.length+'张图片')
    getImages(urls.shift())
  }
}
