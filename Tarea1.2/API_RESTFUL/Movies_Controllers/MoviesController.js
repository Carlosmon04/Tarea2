import { SearchDisponibles,SearchbyID,NuevoProducto,Update,Delete,
        AllCategory,byCategoryID,PostCategory,PutCategory,BorrarCategory,All} from "../Movies_Models/MoviesModels.js"
class MController{

    static Disponibles=async(req,res)=>{
        const resultado = await SearchDisponibles()
        console.log(resultado)

    if(resultado) res.status(201).json(resultado)
        else res.status(404).json({message:"No hay Stock de productos"})
    }

    static  Todos=async (req,res)=>{

        const resultado = await All()
        res.status(201).json(resultado)

    }

   static byID=async (req,res)=>{
        const {id} = req.params


        if(!(Number(id))){
        res.status(400).json({message:"ID debe ser numerico"})
    }

    const resultado = await SearchbyID(id)

    if(resultado && resultado.length !==0){
            res.status(201).json(resultado)
        }
        else{
            res.status(404).json({message:"Este id no existe"})
        }

   }

   static CrearP = async (req,res)=>{
    const body=req.body
    const NuevoP= await NuevoProducto(body,res)
    console.log(NuevoP)
 res.status(201).json({message:"Creado con exito",
    NuevoP
    
 })


   }

   static Actualizar= async (req,res)=>{
    const resultado =await Update(req,res)

    res.status(201).json({message:"Actualizacion completada",
        resultado
    })

   }

   static Eliminar= async (req,res)=>{

    const resultado=await Delete(req,res)

    res.status(201).json({
      message: 'Producto eliminado correctamente',
      producto: resultado
    })

        if(!resultado){
                res.status(500).json({ message: 'Error al eliminar el producto' })

        }

   }


   static ListaCategorias= async (req,res)=>{

   
     const respuesta = await AllCategory()

     res.status(201).json(respuesta)

 
   }

   static CategoryID=async (req,res)=>{
    const {id} = req.params
    const respuesta = await byCategoryID(id) 
    res.status(201).json(respuesta)
   }

   static CrearCategory= async (req,res)=>{

    const body = req.body
    console.log(body)
    const resultado = await PostCategory(body,res)

    if(resultado) res.status(201).json({message:"Categorias agreagdas",resultado})
       
    


   }

   static UpdateCategory = async (req,res)=>{
    // const {id} = req.params
    // const body = req.body

    const resultado = await PutCategory(req,res)

    res.status(201).json({message:"Actualizacion con exito",
        resultado
    })
   }

   static DeleteCategory= async (req,res)=>{
    const {id}=req.params
    const resultado = await BorrarCategory(id,res)

    
    res.status(201).json({message:"Eliminado con Exito",
        resultado
    })
   }
}


export default MController