import { Router } from "express";
import MController from "../Movies_Controllers/MoviesController.js"


const MovieRoute=Router()

MovieRoute.get("/disponibles",MController.Disponibles)
MovieRoute.get("/",MController.Todos)
MovieRoute.get("/categorias",MController.ListaCategorias)
MovieRoute.get("/categorias/:id",MController.CategoryID)
MovieRoute.get("/:id",MController.byID)


MovieRoute.post('/',MController.CrearP)
MovieRoute.post("/categorias",MController.CrearCategory)

MovieRoute.put("/categorias/:id",MController.UpdateCategory)
MovieRoute.put("/:id",MController.Actualizar)

MovieRoute.delete("/categorias/:id",MController.DeleteCategory)
MovieRoute.delete("/:id",MController.Eliminar)


export default MovieRoute