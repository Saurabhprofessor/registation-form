const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/youtubeRegistration",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    serverSelectionTimeoutMS: 10000
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(`no connection `);
})