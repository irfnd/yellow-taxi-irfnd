import { CreateResponse as SetRes } from '../../utils/others/response.builder';
import { TripEntityDto } from './trip-entity.dto';

export const TripResponses = {
	FindAll: {
		OK: () => {
			return SetRes({
				key: 'trips',
				type: 'array',
				data: TripEntityDto,
				response: {
					code: 200,
					status: 'OK',
					message: 'Trips retrieved successfully',
				},
			});
		},
	},
};
