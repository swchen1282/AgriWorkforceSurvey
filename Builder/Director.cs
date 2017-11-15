using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace COAWebService.Builder
{
    public class Director
    {
        public void BuildFarmer(FarmerBuilder Builder)
        {
            Builder.GetBaseFarmer();
            Builder.GetBusiness();
            Builder.GetFarmerLandArea();
            Builder.GetCropSituation();
            Builder.GetAnimalMarketing();
            Builder.GetAnimalMarketing();
            Builder.GetAllMarketing();
            Builder.GetPopulationNumber();
            Builder.GetPopulation();
            Builder.GetLongTermForHire();
            Builder.GetShortTermForHire();
            Builder.GetNoSalaryForHire();
            Builder.GetLongTermForLack();
            Builder.GetShortTermForLack();
        }
        public void BuildFarmerList(FarmerListBuilder Builder)
        {
            Builder.GetIndexs();
            Builder.GetFarmerList();
        }
        public void BuildComponent(ComponentBuilder Builder)
        {
            Builder.GetFarmerProductionType();
            Builder.GetFarmerLandType();
            Builder.GetFacilityCode();
            Builder.GetIncomeRangeCode();
            Builder.GetMarketType();
            Builder.GetFarmerWorkDay();
            Builder.GetOtherFarmWorkCode();
            Builder.GetEducationLevelCode();
            Builder.GetRelationshipCode();
            Builder.GetLifeStyleCode();
            Builder.GetExperienceYears();
            Builder.GetFarmRelatedBusiness();
            Builder.GetLack();
            Builder.GetAgeScope();
            Builder.GetWorkerTypeCode();
            Builder.GetLackMonths();
            Builder.GetProductCode();
            Builder.GetFarmerIdList();

            Builder.GetEmptyBaseFarmer();
        }
        public string ImportFarmer(FarmerBuilder Builder) {

            try {
                if (!Builder.ImportFarmer()) {
                    return "BaseFarmerAlreadyExist";
                };
                return string.Empty;              
            }
            catch (Exception ex)
            {
                // if any exception, delete all related table on key = basefarmer.id
                var innerException = ex.InnerException == null ? string.Empty : string.Format(":{0}", ex.InnerException.Message);
                ExceptionHandler.Instance.WriteExceptionLog(ex, "SYSTEM", "ImportFarmerError" + innerException);
                Builder.DeleteFarmer();
                return "ImportFarmerError";
            }            
        }

        public string UpdateFarmer(FarmerBuilder Builder,string User) {
            var log = string.Empty;

            try { Builder.UpdateBaseFarmer(); } catch (Exception ex) { ExceptionHandler.Instance.WriteExceptionLog(ex, User, "UpdateBaseFarmerError"); log += "更新失敗：農戶基本資料。</br>"; }
            try { Builder.UpdateBusiness();} catch (Exception ex){ ExceptionHandler.Instance.WriteExceptionLog(ex, User, "UpdateBusinessError"); log += "更新失敗：農戶是否兼營相關事業。</br>"; }

            try { Builder.UpdateFarmerLandArea(); } catch (Exception ex) { ExceptionHandler.Instance.WriteExceptionLog(ex, User, "UpdateFarmerLandAreaError"); log += "更新失敗：可從事農牧生產之經營面積。</br>"; }
            try { Builder.UpdateCropSituation(); } catch (Exception ex) { ExceptionHandler.Instance.WriteExceptionLog(ex, User, "UpdateCropSituationError"); log += "更新失敗：全年農產品銷售情形。</br>"; }
            try { Builder.UpdateAnimalMarketing(); } catch (Exception ex) { ExceptionHandler.Instance.WriteExceptionLog(ex, User, "UpdateAnimalMarketingError"); log += "更新失敗：全年銷售額。</br>"; }
            try { Builder.UpdateAllMarketing(); } catch (Exception ex) { ExceptionHandler.Instance.WriteExceptionLog(ex, User, "UpdateAllMarketingError"); log += "更新失敗：農戶是否兼營相關事業資料。</br>"; }
            try { Builder.UpdatePopulationNumber(); } catch (Exception ex) { ExceptionHandler.Instance.WriteExceptionLog(ex, User, "UpdatePopulationNumberError"); log += "更新失敗：戶內人口數。</br>"; }

            try { Builder.UpdatePopulation(); } catch (Exception ex) { ExceptionHandler.Instance.WriteExceptionLog(ex, User, "UpdatePopulationError"); log += "更新失敗：戶內人口組成狀況。</br>"; }
            try { Builder.UpdateLongTermForHire(); } catch (Exception ex) { ExceptionHandler.Instance.WriteExceptionLog(ex, User, "UpdateLongTermForHireError"); log += "更新失敗：常僱員工僱用情形。</br>"; }
            try { Builder.UpdateShortTermForHire(); } catch (Exception ex) { ExceptionHandler.Instance.WriteExceptionLog(ex, User, "UpdateShortTermForHireError"); log += "更新失敗：臨時或季節性員工僱用情形。</br>"; }
            try { Builder.UpdateNoSalayForHire(); } catch (Exception ex) { ExceptionHandler.Instance.WriteExceptionLog(ex, User, "UpdateNoSalayForHireError"); log += "更新失敗：不支薪人員僱用情形。</br>"; }
            try { Builder.UpdateLongTermForLack(); } catch (Exception ex) { ExceptionHandler.Instance.WriteExceptionLog(ex, User, "UpdateLongTermForLackError"); log += "更新失敗：常僱員工短缺情形。</br>"; }
            try { Builder.UpdateShortTermForLack(); } catch (Exception ex) { ExceptionHandler.Instance.WriteExceptionLog(ex, User, "UpdateShortTermForLackError"); log += "更新失敗：臨時或季節性員工僱用情形短缺情形。</br>"; }

            Builder.UpdateLog(User);
            Builder.UpdateLogViewer(User);

            return log;
        }
    }
}