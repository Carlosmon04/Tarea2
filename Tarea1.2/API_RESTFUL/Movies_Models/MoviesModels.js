import Productos from "../Base_Datos/DB.json" with {type:"json"}
import {readFile, writeFile} from "node:fs/promises"
import pool from "../config_BDdelInge/DB-Mysql.js"


export const SearchDisponibles =async ()=>{
        
  const query = "SELECT * from productos where disponible = true"
  const [resultado] = await pool.query(query)
 
    return resultado
}

export const All = async ()=>{
  const query = "SELECT * from productos"
  const [resultado] = await pool.query(query)
  return resultado
}

export const SearchbyID = async (id)=>{
    
    const query = "SELECT * from productos where id = ?"
    const [resultado] = await pool.query(query,[id])
    
    return resultado
}


export const NuevoProducto = async (body,res)=>{

    try {
    const { nombre, precio, descripcion, disponible,categoria_id } = body

    
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ message: 'El campo "nombre" es obligatorio.' })
    }

    if (typeof precio !== 'number' || precio <= 0) {
      return res.status(400).json({ message: 'El precio debe ser un número positivo mayor a cero.' })
    }

    if (!descripcion || descripcion.trim().length < 10) {
      return res.status(400).json({ message: 'La descripción debe tener al menos 10 caracteres.' })
    }

    if (typeof disponible !== 'boolean') {
      return res.status(400).json({ message: 'El campo "disponible" debe ser true o false.' })
    }


    const query2 = "Select * from categorias "
    const [categorias] = await pool.query(query2)
    console.log(categorias)
    
    
    const quien = categorias.some((comprobado)=>{
      return comprobado.id === categoria_id

    })
  console.log(categoria_id,nombre,descripcion,disponible,precio)
  console.log(quien)
    if(quien){

      
    const query = "insert into productos (nombre,precio,descripcion,disponible,categoria_id) values (?,?,?,?,?)"
    const [nuevoProducto] = await pool.query(query,[nombre,precio,descripcion,disponible,categoria_id])
    

    return { nombre, precio, descripcion, disponible,categoria_id }
    }else{
            res.status(400).json({message:"Este id de categoria no es valido"})

    }
    

 

}catch(error){throw error}




}

export const Update= async (req,res)=>{
    try {
    const { id } = req.params
    console.log(req.body)
    
      

      
    const query = "Select * from productos where id = ?"
    const [productos] = await pool.query(query,[id])
      
    const {nombre:bodyNombre,precio:bodyPrecio,descripcion:bodyDescripcion,disponible:bodyDisponible,categoria_id:bodyCatID} = req.body
    let [{ nombre, precio, descripcion, disponible, categoria_id }] = productos
    
    if(bodyNombre !==undefined) nombre=bodyNombre
    if(bodyPrecio !==undefined) precio=bodyPrecio
    if(bodyDescripcion!==undefined) descripcion=bodyDescripcion
    if(bodyDisponible !==undefined) disponible=bodyDisponible
    if(bodyCatID !==undefined) categoria_id=bodyCatID

    if (productos.length ===0) {
       return res.status(404).json({ message: 'Producto no encontrado' })
    }

    if (nombre !== undefined && (typeof nombre !== 'string' || nombre.trim() === '')) {
      return res.status(400).json({ message: 'El campo "nombre" debe ser un texto válido.' })
    }

    if (Number(precio) !== undefined && (typeof Number(precio) !== 'number' || Number(precio) <= 0)) {
      return res.status(400).json({ message: 'El campo "precio" debe ser un número positivo mayor a cero.' })
    }

    if (descripcion !== undefined && (typeof descripcion !== 'string' || descripcion.trim().length < 10)) {
      return res.status(400).json({ message: 'La descripción debe tener al menos 10 caracteres.' })
    }

    if (disponible !== undefined && typeof disponible == true) {
      return res.status(400).json({ message: 'El campo "disponible" debe ser true o false.' })
    }

    const query2 = "Select id from categorias"
    const [CategoriasID]= await pool.query(query2)

    console.log(CategoriasID,categoria_id)

    const valido=CategoriasID.some((ID)=>{
      return ID.id==categoria_id
    })
    console.log(valido)
  
    


console.log(nombre,precio,descripcion,disponible,categoria_id,id)

    if(valido){
      const query3 = "UPDATE productos SET nombre=?,precio=?,descripcion=?,disponible=?,categoria_id=? where id = ?"
      const [resultado]= await pool.query(query3,[nombre,precio,descripcion,disponible,categoria_id,id])
      return {nombre,precio,descripcion,disponible,categoria_id,id}
    }else{res.status(400).json({message:"Esta categoria no es valida"})}

   

    

    

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}


export const Delete=async (req,res)=>{

    try {
    const { id } = req.params

    const query = "Select * from productos where id = ?"
    const [resultado] = await pool.query(query,id)

    if (resultado.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    const query2= "delete from productos where id =?"
    const [eliminado] = await pool.query(query2,id)

    return resultado



   return productoEliminado
  } catch (error) {
    console.error(error)

    return error
  }

}

export const AllCategory = async ()=>{
  const query = "SELECT * from categorias"
  const [resultado] = await pool.query(query)
  
  return resultado



}

export const byCategoryID = async (id)=>{
  const query = "SELECT * from categorias where id = ?"
    const [resultado] = await  pool.query(query,[id])

    return resultado
}

export const PostCategory=async (body,res)=>{

  try{

    
  

  const query2 = "Select nombre from categorias"
  const [resultado] = await pool.query(query2)
   
    if(body===undefined) return res.status(400).json({message:"Nombre de la categoria es obligatorio"})

  const nuevoMinusculas = body.map((mini)=>{return mini.toLowerCase().trim()})
  const SQLmini = resultado.map((m)=>{return m.nombre.toLowerCase().trim()})


  

    const Existe= SQLmini.some((objetos)=>{
      return nuevoMinusculas.includes(objetos)
    })

   

    if(Existe) return res.status(400).json({message:"Esta categoria ya existe"})

    console.log(Existe)
    const query = "INSERT INTO categorias (nombre) VALUES (?)"

    const promesas = body.map((Nueva)=>{
      return pool.query(query,[Nueva])

    })

    await Promise.all(promesas)
    return body

  }catch(error){throw error}
}

export const PutCategory = async (id,nombre)=>{

  const query = "UPDATE categorias set nombre = ? where id = ?"
  const [resultado] = await pool.query(query,[nombre,id])
  return {id,nombre}

}

export const BorrarCategory =  async (id,res)=>{

  const query3= "select c.id as categoruID, p.categoria_id from productos as p inner join categorias as c on c.id=p.categoria_id where c.id = ?"
  const query = "DELETE FROM categorias where id = ?"
  const query2 = "SELECT * from categorias where id =?"


  const [pasaPrueba] = await pool.query(query3,[id])

  if(pasaPrueba.length!==0) return res.status(400).json({message:"Esta categoria tiene un prodsucto asignado y no se puede eliminar"})

  const [eliminado] = await pool.query(query2,[id])
  await pool.query(query,[id])
 
  return eliminado
}