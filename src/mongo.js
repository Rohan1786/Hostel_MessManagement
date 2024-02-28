const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/LoginFormPractice")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{

    console.log('failed to connect');
})


const paymentschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
});

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const messDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    timetable: {
        monday: [{
            breakfast:{
                type:String,
                required:true
            },
            lunch:{
                type:String,
                required:true
            },
            dinner:{
                type:String,
                required:true
            }
        }],
        tuesday: [{
            breakfast:{
                type:String,
                required:true
            },
            lunch:{
                type:String,
                required:true
            },
            dinner:{
                type:String,
                required:true
            }
        }],
        wednesday: [{
            breakfast:{
                type:String,
                required:true
            },
            lunch:{
                type:String,
                required:true
            },
            dinner:{
                type:String,
                required:true
            }
        }],
        thursday: [{
            breakfast:{
                type:String,
                required:true
            },
            lunch:{
                type:String,
                required:true
            },
            dinner:{
                type:String,
                required:true
            }
        }],
        friday: [{
            breakfast:{
                type:String,
                required:true
            },
            lunch:{
                type:String,
                required:true
            },
            dinner:{
                type:String,
                required:true
            }
        }],
        saturday:[{
            breakfast:{
                type:String,
                required:true
            },
            lunch:{
                type:String,
                required:true
            },
            dinner:{
                type:String,
                required:true
            }
        }],
        sunday: [{
            breakfast:{
                type:String,
                required:true
            },
            lunch:{
                type:String,
                required:true
            },
            dinner:{
                type:String,
                required:true
            }
        }],
    }
});


const LogInCollection=new mongoose.model('LogInCollection',logInSchema)
const PaymentCollection=new mongoose.model('PaymentCollection',paymentschema);
const MessCollection=new mongoose.model('MessCollection',messDetailsSchema)
module.exports=
{
    LogInCollection,
    PaymentCollection,
    MessCollection
}