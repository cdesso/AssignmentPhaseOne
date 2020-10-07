module.exports = function(db, app, formidable) {
    app.post('/api/upload', function(req, res){
        var form = new formidable.IncomingForm({ uploadDir: './userImages' });
        form.keepExtensions = true;
        // When error occurs, throw error
        form.on('error', function(err){
            throw err;
            res.send({
                result: 'failed',
                data: {},
                message: 'Unable to upload'
            })
        });
        // When file is uploaded, change the file path to ./userImages/<filename>
        form.on('fileBegin', function(name, file){
            file.path = form.uploadDir + "/" + file.name;
        });
        //When file is uploaded, send back the filename along with a result and message
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