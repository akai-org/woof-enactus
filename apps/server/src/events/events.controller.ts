import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { CreateEventDto } from "./dto/CreateEventDto";
import { UpdateEventDto } from "./dto/UpdateEventDto";
import { EventsService } from "./events.service";

@ApiTags("Partner Events")
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: "Partner event created successfully.",
  })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: "List of all partner events." })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(":id")
  @ApiResponse({ status: 200, description: "Partner event found." })
  @ApiResponse({ status: 404, description: "Partner event not found." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  @Get("partner/:slug")
  async getPartnerEvents(@Param("slug") slug: string) {
    return await this.eventsService.findAllForPartner(slug);
  }

  @Put(":id")
  @ApiResponse({
    status: 200,
    description: "Partner event updated successfully.",
  })
  @ApiResponse({ status: 404, description: "Partner event not found." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: 200,
    description: "Partner event deleted successfully.",
  })
  @ApiResponse({ status: 404, description: "Partner event not found." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.eventsService.remove(id);
  }
}
