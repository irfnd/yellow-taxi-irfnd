import * as Nest from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';
import { JwtGuard } from '../jwt/jwt.guard';
import { ErrorResponses } from '../utils/dto/global-error.dto';
import { TripQueryDto } from './dto/trip-query.dto';
import { TripResponses } from './dto/trip-response.dto';
import { TripService } from './trip.service';

@Nest.Controller('trips')
@Nest.UseGuards(JwtGuard)
@Swagger.ApiTags('Trips')
@Swagger.ApiBearerAuth()
@ErrorResponses.Unauthorized()
@ErrorResponses.InternalServerError()
export class TripController {
	constructor(private readonly trip: TripService) {}

	@Nest.Get()
	@Swagger.ApiOperation({ summary: 'Find All', description: 'Get all trips by query params' })
	@TripResponses.FindAll.OK()
	@ErrorResponses.BadRequest()
	async findAll(@Nest.Query() query: TripQueryDto) {
		const trips = await this.trip.findAll(query);
		return { message: 'Trips retrieved successfully.', trips };
	}
}
