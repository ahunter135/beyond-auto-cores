using Onsharp.BeyondAutoCore.Domain.Command.Devices;
using Onsharp.BeyondAutoCore.Domain.Dto.Devices;

namespace Onsharp.BeyondAutoCore.Infrastructure
{
    public class AutoMapperConfig
    {
        private static IMapper _autoMapper;

        public static IMapper AutoMapper()
        {
            if (_autoMapper == null)
            {
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.AddProfile(new DefaultMappingProfile());
                });
                _autoMapper = config.CreateMapper();
            }

            return _autoMapper;
        }

        private class DefaultMappingProfile : Profile
        {
            
            public DefaultMappingProfile()
            {

                #region Create Command to Model

                CreateMap<CreateAlertCommand, AlertModel>()
                         .ForMember(dest => dest.Status, opt => opt.MapFrom
                                   (src => src.Status == 0 ? AlertStatusEnum.Unread :
                                   (src.Status == 0 ? AlertStatusEnum.Unread : AlertStatusEnum.Read)
                         ))
                         .ForMember(dest => dest.AlertType, opt => opt.MapFrom
                                   (src => src.AlertType == 0 ? AlertTypeEnum.PhotoGradeReview :
                                   (src.AlertType == 0 ? AlertTypeEnum.PhotoGradeReview : AlertTypeEnum.GradeCreditZero)
                         ));

                
                CreateMap<CreateCodeCommand, CodeModel>()
                        .ForMember(dest => dest.CodeType, opt => opt.MapFrom
                                  (src => src.IsCustom ? CodeTypeEnum.Converter: CodeTypeEnum.Generic));

                CreateMap<CreateDeviceCommand, DeviceModel>();
                CreateMap<CreateCommissionCommand, CommissionModel>();
                CreateMap<CreateGradeCreditCommand, GradeCreditModel>();
                CreateMap<CreateLotItemFullnessCommand, LotItemFullnessModel>();
                CreateMap<CreateLotItemCommand, LotItemModel>();
                CreateMap<CreateLotCommand, LotModel>();
                CreateMap<CreateMarginCommand, MasterMarginModel>();
                CreateMap<CreateMaterialOriginalPriceCommand, MaterialOriginalPriceModel>();
                CreateMap<CreateMetalCustomPriceCommand, MetalCustomPriceModel>();
                CreateMap<CreateMetalPriceHistoryCommand, MetalPriceHistoryModel>();
                CreateMap<CreateMetalPriceSummaryCommand, MetalPriceSummaryModel>();
                CreateMap<CreatePartnerCommand, PartnerModel>();

                CreateMap<CreatePaymentCommand, PaymentModel>()
                        .ForMember(dest => dest.PaymentType, opt => opt.MapFrom
                                  (src => src.PaymentType == PaymentTypeEnum.Registration ? 0 :
                                                             (src.PaymentType == PaymentTypeEnum.Affiliate ? 1 : 2)
                            ));

                CreateMap<CreatePhotoGradeCommand, PhotoGradeModel>();
                CreateMap<CreatePhotoGradeItemCommand, PhotoGradeItemModel>();
                CreateMap<CreateUserCommand, UserModel>();
                CreateMap<CreateRegCommand, RegistrationModel>();
                CreateMap<CreateSubscriptionCommand, SubscriptionModel>();

                #endregion Create Command to Model

                #region Dto to Model

                CreateMap<AlertDto, AlertModel>()
                        .ForMember(dest => dest.Status, opt => opt.MapFrom
                                  (src => src.Status == 0 ? AlertStatusEnum.Unread : AlertStatusEnum.Read));

                
                CreateMap<CodeDto, CodeModel>()
                        .ForMember(dest => dest.CodeType, opt => opt.MapFrom
                                  (src => src.IsCustom ? CodeTypeEnum.Converter : CodeTypeEnum.Generic));

                CreateMap<DeviceDto, DeviceModel>();
                CreateMap<GradeCreditDto, GradeCreditModel>();
                CreateMap<LotItemFullnessDto, LotItemFullnessModel>();
                CreateMap<LotItemDto, LotItemModel>();
                CreateMap<LotDto, LotModel>();
                CreateMap<MarginDto, MasterMarginModel>();
                CreateMap<MaterialOriginalPriceDto, MaterialOriginalPriceModel>();
                CreateMap<MetalCustomPriceDto, MetalCustomPriceModel>();
                
                CreateMap<MetalPriceHistoryListDto, MetalPriceHistoryModel>();
                CreateMap<MetalCustomPriceDto, MetalCustomPriceModel>();
                CreateMap<MetalPriceSummaryDto, MetalPriceSummaryModel>();
                CreateMap<PartnerDto, PartnerModel>();
                CreateMap<PaymentDto, PaymentModel>()
                        .ForMember(dest => dest.Status, opt => opt.MapFrom
                                  (src => src.PaymentType == PaymentTypeEnum.Registration ? 0 :
                                                            (src.PaymentType == PaymentTypeEnum.Affiliate ? 1 : 2)
                                  ));

                CreateMap<PriceDto, PriceModel>();

                CreateMap<PhotoGradeDto, PhotoGradeModel>();
                CreateMap<PhotoGradeItemDto, PhotoGradeItemModel>();
                CreateMap<UserDto, UserModel>();
                CreateMap<RegistrationDto, RegistrationModel>();
                CreateMap<SubscriptionDto, SubscriptionModel>();

                #endregion Dto to Model

                #region Model to Dto 
                CreateMap<AlertModel, AlertDto>()
                        .ForMember(dest => dest.Status, opt => opt.MapFrom
                                  (src => src.Status == AlertStatusEnum.Unread ? 0 : 1 ));
                CreateMap<CodeModel, CodeDto>()
                        .ForMember(dest => dest.IsCustom, opt => opt.MapFrom
                                  (src => src.CodeType == CodeTypeEnum.Generic ? false: true ));
                CreateMap<DeviceModel, DeviceDto>();
                CreateMap<CommissionModel, CommissionDto>();
                CreateMap<GradeCreditModel, GradeCreditDto>();
                CreateMap<LotItemFullnessModel, LotItemFullnessDto>();
                CreateMap<LotItemModel, LotItemDto>();
                CreateMap<LotModel, LotDto>();
                CreateMap<MasterMarginModel, MarginDto>();
                CreateMap<MaterialOriginalPriceModel, MaterialOriginalPriceDto>();
                CreateMap<MetalCustomPriceModel, MetalCustomPriceDto>();
                
                CreateMap<MetalPriceHistoryModel, MetalPriceHistoryDto>();
                CreateMap<MetalPriceSummaryModel, MetalPriceSummaryDto>();
                CreateMap<PartnerModel, PartnerDto>();
                CreateMap<PaymentModel, PaymentDto>()
                         .ForMember(dest => dest.PaymentType, opt => opt.MapFrom
                                 (src => src.PaymentType == 0 ? PaymentTypeEnum.Registration :
                                                                    (src.PaymentType == 1 ? PaymentTypeEnum.Affiliate : PaymentTypeEnum.GradeCredit)
                                 ));

                CreateMap<PriceModel, PriceDto>();
                CreateMap<PriceModel, PriceLiteDto>();

                CreateMap<PhotoGradeModel, PhotoGradeDto>().ForMember(dest => dest.PhotoGradeStatus, opt => opt.MapFrom
                                 (src => src.PhotoGradeStatus == 0 ? PhotoGradeStatusEnum.InReview :
                                                                    (src.PhotoGradeStatus == 1 ? PhotoGradeStatusEnum.Approved : PhotoGradeStatusEnum.Rejected)
                                 ));
                CreateMap<PhotoGradeModel, PhotoGradeListDto>().ForMember(dest => dest.PhotoGradeStatus, opt => opt.MapFrom
                                 (src => src.PhotoGradeStatus == 0 ? PhotoGradeStatusEnum.InReview :
                                                                    (src.PhotoGradeStatus == 1 ? PhotoGradeStatusEnum.Approved : PhotoGradeStatusEnum.Rejected)
                                 ));

                CreateMap<PhotoGradeItemModel, PhotoGradeItemDto>();
                CreateMap<UserModel, UserDto>();
                CreateMap<UserModel, UserAccessDto>();
                CreateMap<RegistrationModel, RegistrationDto>();
                CreateMap<SubscriptionModel, SubscriptionDto>();

                #endregion Model to Dto 

                #region Model to Command 
                CreateMap<RegistrationModel, CreateRegCommand>();
                CreateMap<RegistrationModel, CreateUserCommand>();
                #endregion Model to Command 

                #region Dto to Command

                CreateMap<CommissionDto, CreateCommissionCommand>();

                #endregion Dto to Command

            }
        }

    }
}
