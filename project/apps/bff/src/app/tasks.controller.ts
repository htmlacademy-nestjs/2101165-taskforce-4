import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { AddNewPostDto } from './dto/add-new-post.dto';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UseridInterceptor } from './interceptors/userid.interceptor';

@Controller('tasks')
@UseFilters(AxiosExceptionFilter)
export class TasksController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/')
  public async create(@Body() dto: AddNewPostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tasks}/`, dto);
    return data;
  }

}
