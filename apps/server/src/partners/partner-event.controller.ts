import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreatePartnerEventDto } from "./dto/CreatePartnerEventDto";
import { PartnerEventService } from "./partner-event.service";
import { UpdatePartnerEventDto } from "./dto/UpdatePartnerEventDto";

@ApiTags("Partner Events")
@Controller("partner-events")
export class PartnerEventController {
  constructor(private readonly partnerEventService: PartnerEventService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: "Partner event created successfully.",
  })
  create(@Body() createPartnerEventDto: CreatePartnerEventDto) {
    return this.partnerEventService.create(createPartnerEventDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: "List of all partner events." })
  findAll() {
    return this.partnerEventService.findAll();
  }

  @Get(":id")
  @ApiResponse({ status: 200, description: "Partner event found." })
  @ApiResponse({ status: 404, description: "Partner event not found." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.partnerEventService.findOne(id);
  }

  @Patch(":id")
  @ApiResponse({
    status: 200,
    description: "Partner event updated successfully.",
  })
  @ApiResponse({ status: 404, description: "Partner event not found." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePartnerEventDto: UpdatePartnerEventDto,
  ) {
    return this.partnerEventService.update(id, updatePartnerEventDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: 200,
    description: "Partner event deleted successfully.",
  })
  @ApiResponse({ status: 404, description: "Partner event not found." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.partnerEventService.remove(id);
  }
}
