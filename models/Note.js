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
        type: Number
        // required: true
    },  
    ordenCompra: {
        type: String
        // required: true        
    },
    numOTI: {
        type: String,
        required: true        
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
        type: Number
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
        // required: true,
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
    correo: {
        type: Boolean,
        default: false
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
