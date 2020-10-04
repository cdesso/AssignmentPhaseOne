module.exports = function(db, app, formidable) {
    app.post('/api/upload', function(req, res){
        var form = new formidable.IncomingForm({ uploadDir: './userImages' });
        form.keepExtensions = true;

        form.on('error', function(err){
            throw err;
            res.send({
                result: 'failed',
                data: {},
                message: 'Unable to upload'
            })
        });

        form.on('fileBegin', function(name, file){
            file.path = form.uploadDir + "/" + file.name;
        });

        form.on('file', function(field, file){
            res.send({
                result: 'OK',
                data: {'filename': file.name},
                message: 'success'
            });
        });

        form.parse(req);
    });
}