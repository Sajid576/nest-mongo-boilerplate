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

import { CampaignService } from './campaign.service';
import { CampaignCreateDto, CampaignSearchDto, CampaignUpdateDto } from './dto';
import { RolesGuard } from '../common/roles/roles.guard';
import { AuthGuard } from '../common/authentication/auth.guard';
import { Roles } from '../common/roles/roles.decorator';
import { Role } from '../common/roles/role.enum';
import { ResponseError, ResponseSuccess } from 'src/common/dto';

@ApiTags('Campaign')
@Controller('api/v1/campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create campaign' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and created campaign result',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in creating campaign',
  })
  @ApiBearerAuth('Authorization')
  @Post('/')
  @Roles(Role.Admin)
  async create(@Body() payload: CampaignCreateDto) {
    const result = await this.campaignService.create(payload);
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

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
  async find(@Query() query: CampaignSearchDto) {
    const result = await this.campaignService.find(query);
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @Get('/customer')
  async findByCustomer() {
    const result = await this.campaignService.findByCustomer();
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @ApiOperation({ summary: 'Get one campaign by id' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and found one campaign result by id',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in founding campaign by id',
  })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const result = await this.campaignService.findById(id);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update campaign given id' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and updated result',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in updating campaign by id',
  })
  @ApiBearerAuth('Authorization')
  @Patch('/:id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() payload: CampaignUpdateDto) {
    const result = await this.campaignService.update(id, payload);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete campaign given id' })
  @ApiResponse({ status: 200, description: 'Return success code' })
  @ApiResponse({ status: 403, description: 'Forbidden. Return error code' })
  @ApiBearerAuth('Authorization')
  @Delete('/:id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    const result = await this.campaignService.remove(id);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }
}
