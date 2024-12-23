import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserProfileService } from './user_profile.service';
import { Observable } from 'rxjs';
import {
  DeleteUserProfileResponse,
  GetAllUsersProfileRequest,
  GetUserProfileByEmailResponse,
  UserDemographicsResponse,
  UserProfileResponse,
  UsersProfileResponse,
} from '../../common/interface/userProfile.interface';
import { CreateUserProfileDto } from './dto/create-user_profile.dto';
import { UpdateUserProfileDto } from './dto/update-user_profile.dto';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get()
  getAllUsersProfile(@Query() query): Observable<UsersProfileResponse> {
    const params: GetAllUsersProfileRequest = {
      page: query.page || 1,
      take: query.take || 10,
      fullName: query.fullName || '',
      userInfoId: query.userInfoId || '',
    };
    return this.userProfileService.getAllUsersProfile(params);
  }

  @Get('demographics')
  getUserDemographics(@Query() query): Observable<UserDemographicsResponse> {
    const params: GetAllUsersProfileRequest = {
      page: query.page || 1,
      take: query.take || 10,
      fullName: query.fullName || '',
      userInfoId: query.userInfoId || '',
    };
    return this.userProfileService.getUserDemographics(params);
  }

  @Get(':id')
  getUserProfileById(@Param('id') id: string): Observable<UserProfileResponse> {
    return this.userProfileService.getUserProfileById(id);
  }

  @Get('email/:email')
  getUserProfileByEmail(
    @Param('email') email: string,
  ): Observable<GetUserProfileByEmailResponse> {
    return this.userProfileService.getUserProfileByEmail(email);
  }

  @Post()
  createUserProfile(
    @Body() body: CreateUserProfileDto,
  ): Observable<UserProfileResponse> {
    return this.userProfileService.createUserProfile(body);
  }

  @Patch(':id')
  updateUserProfile(
    @Param('id') id: string,
    @Body() body: UpdateUserProfileDto,
  ): Observable<UserProfileResponse> {
    return this.userProfileService.updateUserProfile(id, body);
  }

  @Delete(':id')
  deleteUserProfile(
    @Param('id') id: string,
  ): Observable<DeleteUserProfileResponse> {
    return this.userProfileService.deleteUserProfile(id);
  }
}
