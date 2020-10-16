import {Request, Response} from 'express'
import {getRepository, Like} from 'typeorm'
import * as Yup from 'yup'

import orphanagesView from '../views/orphanages_view'
import Orphanage from '../models/Orphanage'

export default {
	async index(request:Request, response:Response){
		let {search} = request.query
		search = search ==undefined ? '_' : search
		const orphanagesRepository = getRepository(Orphanage)
		const orphanages = await orphanagesRepository.find({
			name: Like(`%${search}%`),
			relations: ['images']
		})

		return response.status(200).json(orphanagesView.renderMany(orphanages))

	},
	async show(request:Request, response:Response){
		const {id} = request.params
		const orphanagesRepository = getRepository(Orphanage)

		try{
			const orphanage = await orphanagesRepository.findOneOrFail(id,{
				relations: ['images']
			})
			return response.status(200).json(orphanagesView.render(orphanage))
		}catch{
			return response.status(404).json({message: "O ID informado é inválido."})
		}
	},
	async create(request:Request, response:Response){
		const {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends, whatsapp} = request.body
		
		const requestImages = request.files as Express.Multer.File[]
		const images = requestImages.map(file=>{
			return {path: file.filename} 
		})

		const orphanagesRepository = getRepository(Orphanage)

		const data = {
			name, 
			latitude,
			longitude,
			whatsapp,
			about,
			instructions,
			opening_hours,
			open_on_weekends: open_on_weekends === "true" ? true: false,
			images

		}

		const schema = Yup.object().shape({
			name: Yup.string().required(),
			latitude: Yup.number().required(),
			longitude: Yup.number().required(),
			whatsapp: Yup.number().required(),
			about: Yup.string().required().max(300),
			instructions: Yup.string().required(),
			opening_hours: Yup.string().required(),
			open_on_weekends: Yup.boolean().required(),
			images: Yup.array(Yup.object().shape({
				path: Yup.string().required()
			}))
		})

		await schema.validate(data, {
			abortEarly:false,
		})

		const orphanage = orphanagesRepository.create(data)

		await orphanagesRepository.save(orphanage)

		return response.status(201).json({message: "Success"})


	}
}