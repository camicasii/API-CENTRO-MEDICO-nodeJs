const Doctor = require('../models/Doctor');

module.exports={
    getDatas:async(req,res,next)=>{
        const data = await Doctor.find({}).catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })
        res.status(200).json({data})
    },
    getData:async(req,res,next)=>{
        const {id} = req.params;        
        const data = await Doctor.findById(id).catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })
        res.json({data})
    },
    postData:async(req,res,next)=>{        
        const newdata = new Doctor(req.body)
        newdata.save().catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })
        res.status(201).json(data);
    },
    putData:async(req,res,next)=>{
        const newData = req.body
        const {id} = req.params        
        const olddata = await Doctor.findByIdAndUpdate(id,newData).catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })
        res.status(201).json(olddata);
        
    },
    deleteData:async(req,res,next)=>{
        const {id} = req.params;        
        const check = true;
        const data = await Doctor.findByIdAndDelete(id).catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })              
        res.status(200).json( {success:true})
        
    }
}