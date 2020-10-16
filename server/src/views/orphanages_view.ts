import Orphanage from '../models/Orphanage'
import ImagesView from './images_view'
export default{
	render(orphanage: Orphanage){
		const {id,name,latitude,longitude, about, instructions, opening_hours, open_on_weekends,images, whatsapp} = orphanage
		return {
			id,
			name,
			latitude,
			longitude, 
			about, 
			instructions, 
			opening_hours, 
			open_on_weekends,
			whatsapp,
			images: ImagesView.renderMany(images)
		}
	},
	renderMany(orphanages: Orphanage[]){
		return orphanages.map(orphanage => this.render(orphanage))
	}
}