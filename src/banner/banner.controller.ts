import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import {
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { BannerService } from './banner.service';
import { BannerCreateDto, BannerSearchDto, BannerUpdateDto } from './dto';
import { RolesGuard } from '../common/roles/roles.guard';
import { AuthGuard } from '../common/authentication/auth.guard';
import { Roles } from '../common/roles/roles.decorator';
import { Role } from '../common/roles/role.enum';
import { ResponseError, ResponseSuccess } from 'src/common/dto';

@ApiTags('Banner')
@Controller('api/v1/banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create banner' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and created banner result',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in creating banner',
  })
  @ApiBearerAuth('Authorization')
  @Post('/')
  @Roles(Role.Admin)
  async create(@Body() payload: BannerCreateDto) {
    const result = await this.bannerService.create(payload);
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @ApiOperation({ summary: 'Get banners by query' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and found banners result[Array]',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in founding banners',
  })
  @Get('/')
  async find(@Query() query: BannerSearchDto) {
    const result = await this.bannerService.find(query);
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @Get('/customer')
  async findByCustomer() {
    const result = await this.bannerService.findByCustomer();
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @ApiOperation({ summary: 'Get one banner by id' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and found one banner result by id',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in founding banner by id',
  })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const result = await this.bannerService.findById(id);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update banner given id' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and updated result',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in updating banner by id',
  })
  @ApiBearerAuth('Authorization')
  @Patch('/:id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() payload: BannerUpdateDto) {
    const result = await this.bannerService.update(id, payload);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete banner given id' })
  @ApiResponse({ status: 200, description: 'Return success code' })
  @ApiResponse({ status: 403, description: 'Forbidden. Return error code' })
  @ApiBearerAuth('Authorization')
  @Delete('/:id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    const result = await this.bannerService.remove(id);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }
}
