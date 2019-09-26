const Cita = require('../models/Cita');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Employee = require('../models/Employee');
const Update = require('../models/Update');
const { getFilter} = require('../lib/helpers')

module.exports={
getCitas:async(req,res)=>{    
    const data = await Cita.find({}).catch(e=>{
        console.log("error");
        return res.status(404).json( {success:false})            
    })
    res.status(200).json({data});
},

getCita:async(req,res)=>{
    const {id} = req.params;       
    const data = await Cita.findById(id).catch(e=>{
        console.log("error");
        return res.status(404).json( {success:false})            
    })
    res.status(200).json({data});
},

postCita:async(req,res)=>{
    
    const {userId,docId} = req.params;
    const doctorExt = await Doctor.findById(docId).catch(e=>{
        console.log("error");
        return res.status(404).json( {success:false});
    })
    const patientData = await Patient.findById(userId).catch(e=>{
        console.log("error");
        return res.status(404).json( {success:false});           
    })
    
    const newdata = new Cita(req.body);
    newdata.doctor =doctorExt;
    newdata.patient =patientData;

    newdata.save().catch(e=>{
        console.log("error");
        return res.status(404).json( {success:false});
    })
    
    doctorExt.patient.push(data);
    patientData.citas.push(data);
    
    doctorExt.save().catch(e=>{
        console.log("error");
        return res.status(404).json( {success:false});           
    })
    patientData.save().catch(e=>{
        console.log("error");
        return res.status(404).json( {success:false});           
    })
    res.status(201).json(data);
 
},

postCitaEmployee:async(req,res)=>{    
    const {userId,docId} = req.params;
    const deduction = 0.85;//descuento de un 15% del valor actual
    const doctorExt = await Doctor.findById(docId).catch(e=>{
        console.log("error");
        return res.status(404).json( {success:false});
    })
    const employeeData = await Employee.findById(userId).catch(e=>{
        console.log("error");
        return res.status(404).json( {success:false});           
    })
    
    const newdata = new Cita(req.body);
    newdata.doctor =doctorExt;
    newdata.patient =employeeData;
    newdata.price *= deduction;
    newdata.save().catch(e=>{
        console.log("error");
        return res.status(404).json( {success:false});
    })    
    
    doctorExt.patient.push(data);
    employeeData.citas.push(data);
    
    doctorExt.save().catch(e=>{
        console.log("error");
        return res.status(404).json( {success:false});
    })
    employeeData.save().catch(e=>{
        console.log("error");
        return res.status(404).json( {success:false});
    })
    res.status(201).json(data); 
},

putCita:async(req,res)=>{
    const newData = req.body;
    const {id} = req.params;    
    //gualda cambios antes del update
    await Cita.findById(id).then(async(res)=>{        
        const newUpdate = new Update(res);
        newUpdate.save();
    })
    //actualiza
    await Cita.findByIdAndUpdate(id,newData).then(async(res)=>{
       const updateDate = await Cita.findById(id).catch(e=>{        
            return res.status(404).json( {success:false});
        })        
        //agrega ultima fecha actualizacion
        updateDate.Updatecount.push(Date.now())
        updateDate.save();
    })
    .catch(e=>{        
        return res.status(404).json( {success:false});
    })
    return res.status(200).json( {success:true});
    
    
},

deleteCita:async(req,res)=>{
        const {id,userid} = req.params;        
        const check = true;
        const data = await Patient.findById(userid)        
        .catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false});
        })
        const oldCitas = data.citas
         const newCitas = await getFilter(oldCitas,id).catch(e=>{            
            return res.status(404).json( {success:false});           
        })
                  
         if(newCitas){
            data.citas = newCitas;
            data.save().then(async()=>{                
                const datacita = await Cita.findById(id).catch(e=>{                
                    return res.status(404).json( {success:false});          
                })
                datacita.delete=true;                  
                datacita.save().catch(e=>{                
                    return res.status(404).json( {success:false});
                })
                })
                .catch(e=>{            
                    return res.status(404).json( {success:false});
                })
            return res.status(200).json( {success:true});       
         }
         else{
            return res.status(404).json( {success:false});
         }
},

deleteCitaEmployee:async(req,res)=>{
    const {id,userid} = req.params;        
    const check = true;
    const data = await Employee.findById(userid)        
        .catch(e=>{
            console.log("error");
            return res.status(404).json( {success:false})            
        })
    const oldCitas = data.citas
    const newCitas = await getFilter(oldCitas,id).catch(e=>{
        console.log("error");
        return res.status(404).json( {success:false})            
    })
              
    if(newCitas){
        data.citas = newCitas;
        data.save().then(async()=>{
            const datacita = await Cita.findById(id).catch(e=>{                
                return res.status(404).json( {success:false});
            })
            datacita.delete=true;                  
            datacita.save().catch(e=>{            
                return res.status(404).json( {success:false});           
            })
            })
            .catch(e=>{
                console.log("error");
                return res.status(404).json( {success:false});           
        })
    return res.status(200).json( {success:true});  
     }
     else{
        return res.status(404).json( {success:false});            
     }    
}
}