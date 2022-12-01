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

import { BrandService } from './brand.service';
import { BrandCreateDto, BrandSearchDto, BrandUpdateDto } from './dto';
import { RolesGuard } from '../common/roles/roles.guard';
import { AuthGuard } from '../common/authentication/auth.guard';
import { Roles } from '../common/roles/roles.decorator';
import { Role } from '../common/roles/role.enum';
import { ResponseError, ResponseSuccess } from 'src/common/dto';

@ApiTags('Brand')
@Controller('api/v1/brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create brand' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and created brand result',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in creating brand',
  })
  @ApiBearerAuth('Authorization')
  @Post('/')
  @Roles(Role.Admin)
  async create(@Body() brandCreateDto: BrandCreateDto) {
    const result = await this.brandService.create(brandCreateDto);
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get brands by query' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and found brands result[Array]',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in founding brands',
  })
  @Get('/')
  async find(@Query() query: BrandSearchDto) {
    const result = await this.brandService.find(query);
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @Get('/customer')
  async findByCustomer() {
    const result = await this.brandService.findByCustomer();
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get one brand by id' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and found one brand result by id',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in founding brand by id',
  })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const result = await this.brandService.findById(id);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update brand given id' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and updated result',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in updating brand by id',
  })
  @ApiBearerAuth('Authorization')
  @Patch('/:id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() brandUpdateDto: BrandUpdateDto,
  ) {
    const result = await this.brandService.update(id, brandUpdateDto);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete brand given id' })
  @ApiResponse({ status: 200, description: 'Return success code' })
  @ApiResponse({ status: 403, description: 'Forbidden. Return error code' })
  @ApiBearerAuth('Authorization')
  @Delete('/:id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    const result = await this.brandService.remove(id);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }
}
