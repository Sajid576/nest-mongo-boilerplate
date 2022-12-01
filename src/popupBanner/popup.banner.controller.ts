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

import { PopupBannerService } from './popup.banner.service';
import {
  PopupBannerCreateDto,
  PopupBannerSearchDto,
  PopupBannerUpdateDto,
} from './dto';
import { RolesGuard } from '../common/roles/roles.guard';
import { AuthGuard } from '../common/authentication/auth.guard';
import { Roles } from '../common/roles/roles.decorator';
import { Role } from '../common/roles/role.enum';
import { ResponseError, ResponseSuccess } from 'src/common/dto';

@ApiTags('Popup Banner')
@Controller('api/v1/popup-banners')
export class PopupBannerController {
  constructor(private readonly popupBannerService: PopupBannerService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create popup banner' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and created popup banner result',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in creating popup banner',
  })
  @ApiBearerAuth('Authorization')
  @Post('/')
  @Roles(Role.Admin)
  async create(@Body() payload: PopupBannerCreateDto) {
    const result = await this.popupBannerService.create(payload);
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
  async find(@Query() query: PopupBannerSearchDto) {
    const result = await this.popupBannerService.find(query);
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @Get('/customer')
  async findByCustomer() {
    const result = await this.popupBannerService.findByCustomer();
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @ApiOperation({ summary: 'Get one popup banner by id' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and found one popup banner result by id',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in founding popup banner by id',
  })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const result = await this.popupBannerService.findById(id);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update popup banner given id' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and updated result',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in updating popup banner by id',
  })
  @ApiBearerAuth('Authorization')
  @Patch('/:id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() payload: PopupBannerUpdateDto) {
    const result = await this.popupBannerService.update(id, payload);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete popup banner given id' })
  @ApiResponse({ status: 200, description: 'Return success code' })
  @ApiResponse({ status: 403, description: 'Forbidden. Return error code' })
  @ApiBearerAuth('Authorization')
  @Delete('/:id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    const result = await this.popupBannerService.remove(id);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }
}
