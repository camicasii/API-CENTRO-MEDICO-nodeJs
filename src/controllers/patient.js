const Patient = require('../models/Patient');

module.exports={
    getDatas:async(req,res,next)=>{
        const data = await Patient.find({}).catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })
        res.status(200).json({data})
    },
    getData:async(req,res,next)=>{
        const {id} = req.params;        
        const data = await Patient.findById(id).catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })
        res.json({data})
    },
    postData:async(req,res,next)=>{        
        const newdata = new Patient(req.body)
        await newdata.save().catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })
        res.status(201).json(data);
    },
    putData:async(req,res,next)=>{
        const newData = req.body
        const {id} = req.params        
        const olddata = await Patient.findByIdAndUpdate(id,newData).catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })
        res.status(201).json(olddata);
        
    },
    deleteData:async(req,res,next)=>{
        const {id} = req.params;        
        const check = true;
        const data = await Patient.findByIdAndDelete(id).catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })              
        res.status(200).json( {success:true})
        
    }
}