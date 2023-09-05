import { Body, Controller, HttpStatus, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { AddNewPostDto } from './dto/add-new-post.dto';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
@UseFilters(AxiosExceptionFilter)
export class TasksController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/')
  public async create(@Body() dto: AddNewPostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}/`, dto);
    return data;
  }

}
