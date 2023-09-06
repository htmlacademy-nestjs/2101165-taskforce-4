

@Injectable()
export class TaskPostRepository implements CRUDRepository<TaskPostEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) {}

  
}