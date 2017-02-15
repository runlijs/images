var request = require('request')
var http = require("http")
var fs = require('fs')
var path = require('path')
var date = new Date()
var year = date.getFullYear()
var month = date.getMonth()+1
var day  = date.getDate()
var imageFolder = [year,month,day]
var imageDomain = 'https://raw.githubusercontent.com/runlijs/images/master/'+imageFolder.join('')

var imageFolderPath = [__dirname,imageFolder.join('')]
imageFolderPath = imageFolderPath.join('/')
var args = process.argv

var urls = []

function getType(url){
  url = url.split('?')[0]
  var urlArr = url.split('/')
  var last = urlArr[urlArr.length-1]
  var index = last.indexOf('.')
  var type = 'jpeg'
  if(index>-1){
    type = last.substr(index+1,last.length)
  }
  return type
}
// https://raw.githubusercontent.com/runlijs/images/master/20172/201721487060054288.jpeg
function getImages(url){
  fs.exists(imageFolderPath,function(bl){
    if(!bl){
      fs.mkdir(imageFolderPath,function(err){
        getImages(url)
      })
    }else{
      var fileName = imageFolder.join('')+Date.now()+'.'+getType(url)
      var filePath = imageFolderPath+'/'+fileName
      request.head(url, function(err, res, body){
        // console.log('content-type:', res.headers['content-type']);
        // console.log('content-length:', res.headers['content-length']);

        request(url).pipe(fs.createWriteStream(filePath)).on('close', function(){
          if(urls.length){
            console.log('共'+urls.length+'张图片')
            getImages(urls.shift())
          }
          console.log('保存成功')
          console.log('访问地址',imageDomain+'/'+fileName)
        });
      });
      // http.get(url,function(res){
      //   var image = ''
      //   res.setEncoding('binary')
      //   res.on('data',function(chunk){
      //     image += chunk
      //   })
      //   res.on('end',function(){
      //     fs.writeFile(filePath,image,'binary',function(err){
      //       if(!err) {
      //         if(urls.length){
      //           console.log('共'+urls.length+'张图片')
      //           getImages(urls.shift())
      //         }
      //         console.log('保存成功')
      //         console.log('访问地址',imageDomain+'/'+fileName)
      //       }
      //     })
      //   })
      // })
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
    // getType(urls.shift())
  }
}
