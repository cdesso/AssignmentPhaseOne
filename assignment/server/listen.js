module.exports = {
    listen: function(app){
        app.listen(3000, ()=>{
            console.log("running");
        });
    }
}
