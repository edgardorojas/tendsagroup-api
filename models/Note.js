const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    nombreCte:{
        type: String,
        required: true        
    },
    contacto: {
        type: String,
        required: true        
    },
    viaSolicitud: {
        type: String
        // required: true        
    }, 
    numCotizacion: {
        type: String
        // required: true        
    },
    numRevision: {
        type: String
        // required: true
    },  
    ordenCompra: {
        type: String
        // required: true        
    },
    numOTI: {
        type: String
        // required: true        
    },
    numReporte: {
        type: String
        // required: true        
    },
    tipoServicio: {
        type: String
        // required: true        
    },
    materialInspeccion: {
        type: String
        // required: true        
    },
    tecnica: {
        type: String
        // required: true        
    },
    metodo: {
        type: String
        // required: true        
    },
    hrsServicio: {
        type: Number
        // required: true        
    },
    tipoCorriente: {
        type: String
        // required: true        
    },
    lugarTrabajo: {
        type: String
        // required: true        
    },
    fechaInicio: {
        type: Date,
        default: Date.now
        // required: true        
    },
    fechaEntrega:  {
        type: Date,
        required: true,
        validate: {
            // La fecha final debe ser mayor o igual que la fecha de inicio
            validator: function(value) {
                return value >= this.fechaInicio;
            },
        message: 'La fecha de entrega debe ser mayor o igual que la fecha de inicio'
        }
    },
    estado: {
        type: String
        // required: true        
    },
    title: {
        type: String
        // required: true
    },
    text: {
        type: String
        // required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
)

// noteSchema.plugin(AutoIncrement, {
//     inc_field: 'ticket',
//     id: 'ticketNums',  //Crea un documento Counters para llevar el incremento
//     start_seq: 500
// })
module.exports = mongoose.model('Note', noteSchema)



// "user": "64c9738b6d608c98da1a026a",
    
// "nombreCte": "CAMERON DE MEXICO",
// "contacto": "Jesús Fernando Lastra Gallegos",
// "viaSolicitud":"Via correo", 
// "numCotizacion":"Pendiente",
// "numRevision":"00",  
// "ordenCompra": "4513797106",
// "numOTI": "TEN-OTI-23001",
// "numReporte": "TEN-REP-23001",
// "tipoServicio": "MT",
// "materialInspeccion": "LLAVES",
// "tecnica":"NA",
// "metodo": "MT" ,
// "hrsServicio": 4,
// "tipoCorriente": 100,
// "lugarTrabajo": "NAVE" ,
// "responsable": "HSA",
// "fechaInicio": "01/07/2023",
// "fechaLimite": "01/06/2023",
// "estado": "EN PROCESO",
// "title": "PRUEBA01",
// "text": "PRUEBAS" , 
// "completed": FALSE
    

// user,
// nombreCte,
// contacto,
// viaSolicitud, 
// numCotizacion,
// numRevision,  
// ordenCompra,
// numOTI,
// numReporte,
// tipoServicio,
// materialInspeccion,
// tecnica,
// metodo,
// hrsServicio,
// tipoCorriente
// lugarTrabajo,
// fechaInicio,
// fechaLimite,
// estado,
// title,
// text,
// completed