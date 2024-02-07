const Note = require('../models/Note')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const { post } = require('../routes/root')

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
    //Define pagination
    const PAGE_SIZE = 3
    const page = parseInt(req.query.page || "0")
    const totalNotes = await Note.countDocuments()
    const totalPages = Math.ceil(totalNotes / PAGE_SIZE)
    // Get all notes from MongoDB
    const notes = await Note.find().lean()
    // const notes = await Note.find()
    //                         .lean()
    //                         .limit(PAGE_SIZE)
    //                         .skip(PAGE_SIZE * page)

    // console.log(PAGE_SIZE, page, totalNotes, totalPages)
    // If no notes 
    if (!notes?.length) {
        return res.status(400).json({ message: 'No se han encontrado servicios' })
    }

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const notesWithUser = await Promise.all(notes.map(async (note) => {
        const user = await User.findById(note.user).lean().exec()
        return { ...note, username: user.username }
    }))

    res.json(notesWithUser)
})

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = async (req, res) => {
    const { user,  
        nombreCte,
        // contacto,
        // viaSolicitud, 
        // numCotizacion,
        // numRevision,  
        // ordenCompra,
        numOTI,
        // numReporte,
        tipoServicio,
        // materialInspeccion,
        // tecnica,
        // metodo,
        // hrsServicio,
        // tipoCorriente,
        lugarTrabajo,
        fechaInicio,
        fechaEntrega,
        estado, 
        correo} = req.body
    console.log(user, numOTI)
    // Confirm data
    // if (!user || !nombreCte || !contacto) {
    if (!user || !nombreCte) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ numOTI }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Servicio ya existe' })
    }

    // Create and store the new user 
    const note = await Note.create({ user, 
        nombreCte,
        // contacto,
        // viaSolicitud, 
        // numCotizacion,
        // numRevision,  
        // ordenCompra,
        numOTI,
        // numReporte,
        tipoServicio,
        // materialInspeccion,
        // tecnica,
        // metodo,
        // hrsServicio,
        // tipoCorriente,
        lugarTrabajo,
        fechaInicio,
        fechaEntrega,
        estado,
        correo })

    if (note) { // Created 
        return res.status(201).json({ message: 'Servicio creado' })
    } else {
        return res.status(400).json({ message: 'Se han recibido datos invalidos' })
    }

}

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, 
        nombreCte,
        // contacto,
        // viaSolicitud, 
        // numCotizacion,
        // numRevision,  
        // ordenCompra,
        numOTI,
        // numReporte,
        tipoServicio,
        // materialInspeccion,
        // tecnica,
        // metodo,
        // hrsServicio,
        // tipoCorriente,
        lugarTrabajo,
        fechaInicio,
        fechaEntrega,
        estado, 
        correo,
        completed } = req.body

    // Confirm data
    // if (!id || !user || !nombreCte || !contacto || typeof completed !== 'boolean') {
    if (!id || !user || !nombreCte || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Todos los campos SON requeridos' })
    }

    // Confirm note exists to update
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Servicio no encontrado' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ numOTI }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Servicio ya existe' })
    }

    note.user = user
    note.nombreCte = nombreCte,
    // note.contacto = contacto,
    // note.viaSolicitud = viaSolicitud,  
    // note.numCotizacion = numCotizacion,
    // note.numRevision = numRevision,  
    // note.ordenCompra = ordenCompra,
    note.numOTI = numOTI,
    // note.numReporte = numReporte,
    note.tipoServicio = tipoServicio,
    // note.materialInspeccion = materialInspeccion,
    // note.tecnica = tecnica,
    // note.metodo = metodo,
    // note.hrsServicio = hrsServicio,
    // note.tipoCorriente = tipoCorriente,
    note.lugarTrabajo = lugarTrabajo,
    note.fechaInicio = fechaInicio,
    note.fechaEntrega = fechaEntrega,
    note.estado =  estado, 
    note.correo = correo,
    note.completed = completed

    const updatedNote = await note.save()

    res.json(`'${updatedNote.numOTI}' actualizado`)
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'ID de servicio requerido' })
    }

    // Confirm note exists to delete 
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Servicio no encontrado' })
    }

    const result = await note.deleteOne()

    const reply = `Servicio '${result.title}' con ID ${result._id} eliminado`

    res.json(reply)
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}