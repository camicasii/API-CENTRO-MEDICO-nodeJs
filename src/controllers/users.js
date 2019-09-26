const User = require('../models/User');
module.exports={
     getDatas:async(req,res,next)=>{
         console.log("get data");         
        await User.find({}).then((data)=>res.json({data}))        
    },
    getData:async(req,res,next)=>{
        const {id} = req.params;        
        const data = await User.findById(id).catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })
        const rows = await User.findOne({username:"Camicasii"})
        
        console.log(rows);
        res.json({data})
    },
    postData:async(req,res,next)=>{        
        const newdata = new User(req.body)
        await newdata.save().catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })
        res.status(201).json(data);
    },
    putData:async(req,res,next)=>{
        const newData = req.body
        const {id} = req.params        
        const olddata = await User.findByIdAndUpdate(id,newData).catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })
        res.status(201).json(olddata);
        
    },
    deleteData:async(req,res,next)=>{
        const {id} = req.params;        
        const check = true;
        const data = await User.findById(id).catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })              
        res.status(200).json( {success:true})
        
    }
}