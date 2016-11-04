var loopback = require('loopback');
var boot = require('loopback-boot');
var fs = require('fs');
var ffmpeg = require('ffmpeg');
var morgan = require('morgan');
var path = require('path');

var app = module.exports = loopback();
// create a write stream (in append mode)
//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
//
//// setup the logger
//app.use(morgan('combined', {stream: accessLogStream}));

app.use('/api/containers/file/upload',function(req,res,next){
  if(req.query.filename != '' && req.query.filename != null && req.query.filename != undefined){
    res.once('finish',function(){
      var filename = req.query.filename.split('/')[req.query.filename.split('/').length - 1];
      var type = '3gp,avi,mov';
      var name = filename.split('.')[0];
      var tag = filename.split('.')[1];
      var uploadDir = './server/storage/file/';
      if(type.toUpperCase().indexOf(tag.toUpperCase()) != - 1){
        try{
          var process = new ffmpeg(uploadDir + filename);
          process.then(function(video){
            video.save(uploadDir + name + '.mp4',function(error,file){
              if(error)
                console.log(error);
              else
                fs.unlink(uploadDir + filename,function(err){
                  if(err) throw err;
                  console.log('successfully deleted');
                });
            });
          },function(err){
            console.log('Error: ' + err);
          });
        }catch(e){
          console.log(e.msg);
        }
      }else{
        return;
      }
    })
  }
  next();
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
