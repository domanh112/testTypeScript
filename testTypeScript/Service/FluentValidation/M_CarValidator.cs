using FluentValidation;
using testTypeScript.Models.Entities;

namespace testTypeScript.Service.FluentValidation
{
    public class M_CarValidator : AbstractValidator<M_CAR>
    {
        public M_CarValidator() {
            // validate biển số 
            RuleFor(model => model.PLATE_NUMBER)
                .NotNull()
                .WithMessage("Biển số xe không được để trống!")
                .MaximumLength(10)
                .WithMessage("Biển số không vượt quá 10 kí tự");

            // validate loại xe
                     RuleFor(model => model.CATEGORY_ID)
                .NotNull()
                .WithMessage("Loại xe không được để trống!");
            
            // validate Giá thuê
                     RuleFor(model => model.PRICE)
                .NotNull()
                .WithMessage("Giá thuê không được để trống!");
            
            // validate Mô tả
                     RuleFor(model => model.DESCRIPTION)
                .MaximumLength(256)
                .WithMessage("Mô tả xe không được quá 256 kí tự!");

        }
    }
}
