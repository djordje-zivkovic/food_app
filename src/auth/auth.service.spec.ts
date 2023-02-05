import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find users by their email', () => {});

  //   it('should return user information if email and password are correct', async () => {
  //     const email = 'admin@gmail.com';
  //     const password = 'password';

  //     const result = await service.validateUser(email, password);
  //     expect(result).not.toBe('null');
  //     expect(result).toMatchObject(['id', 'email']);
  //   });
});
