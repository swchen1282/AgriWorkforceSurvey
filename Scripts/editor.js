/* GLOBAL */
/* UI */
var Components = $.parseJSON($('#component').val());
var InputUI = '\
                    <div class="float-label-control">\
                        <input type="text" class="form-control empty">\
                    </div>\
                  ';
var DeleteButtonUI = '\
                    <button type="button" class="btn btn-default btn-sm">\
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>\
                    </button>\
                  ';
var ProductCode = null;
var FacilityCodeUI = null;
var CropProductCodeUI = null;
var AnimalProductCodeUI = null;
var RelationshipCodeUI = null;
var EducationLevelCodeUI = null;
var FarmerWorkDayUI = null;
var LifeStyleCodeUI = null;
var OtherFarmWorkCodeUI = null;
var WorkerTypeCodeUI = null;
/* data */
var Data = null;
var DataCopy = null;
var FirstPageIndex = 0;
var ExaminLogger = {
    ReadErrorArray: [],
    WriteErrorArray: []
}
/* dialog */
var Alert = null;
var Info = null;
var CropSituationAdder = null;
var Loading = null;

$(document).ready(function () {
    /*set ui*/
    SetUI();    
    /*set alert dialog*/
    Alert = new BootstrapDialog({
        title: '錯誤訊息',
        type: BootstrapDialog.TYPE_DANGER,
        buttons: [{
            label: '確定',
            action: function (dialogRef) {
                dialogRef.close();
            }
        }]
    });
    /*set info dialog*/
    Info = new BootstrapDialog({
        title: '訊息',
        type: BootstrapDialog.TYPE_INFO,
        buttons: [{
            label: '確定',
            action: function (dialogRef) {
                dialogRef.close();
            }
        }]
    });
    /*set loading*/
    Loading = $.loading();

    /* set Adder*/
    CropSituationAdder = new BootstrapDialog({
        title: '新增農產品銷售情形',
        message: function (dialog) {
            var content = $(CropSituationHelper.AdderUI);
            content.find('.productCodeId').html(CropProductCodeUI.clone());
            content.find('.facilityCodeId').html(FacilityCodeUI.clone());
            return content;
        },
        buttons: [{
            label: '新增',
            action: function (dialogRef) {
                var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
                var index = baseFarmer.CropSituation.length;
                var productCodeId = dialogRef.$modalContent.find('.productCodeId select').val();
                var facilityCodeId = dialogRef.$modalContent.find('.facilityCodeId select').val();
                var salesRatio = dialogRef.$modalContent.find('.salesRatio input').val();
                var log = '';
                if (productCodeId == '-1') {
                    log += '請選擇農產品代碼！<br>';
                }
                if (facilityCodeId == '-1') {
                    log += '請選擇農業設施代碼！<br>';
                }
                if (!Helper.NumberValidate(salesRatio)) {
                    log += '銷售額比例請填寫不小於0的整數！<br>';
                }
                if (log) {
                    Alert.setMessage(log).open();
                } else {
                    var initObj = [];
                    var cropSituation = {
                        baseFarmerId: baseFarmer.id,
                        facilityCodeId: facilityCodeId,
                        productCodeId: productCodeId,
                        salesRatio: parseInt(salesRatio)
                    }
                    initObj.push(cropSituation);
                    CropSituationHelper.Init(initObj, FirstPageIndex);
                    baseFarmer.CropSituation.push(cropSituation);
                    dialogRef.close();
                }
            }
        }, {
            label: '取消',
            action: function (dialogRef) {
                dialogRef.close();
            }
        }]
    });
    AnimalMarketingAdder = new BootstrapDialog({
        title: '新增畜禽產品銷售情形',
        message: function (dialog) {
            var content = $(AnimalMarketingHelper.AdderUI);
            content.find('.productCodeId').html(AnimalProductCodeUI.clone());
            return content;
        },
        buttons: [{
            label: '新增',
            action: function (dialogRef) {
                var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
                var index = baseFarmer.AnimalMarketing.length;
                var productCodeId = dialogRef.$modalContent.find('.productCodeId select').val();
                var marketingRatio = dialogRef.$modalContent.find('.marketingRatio input').val();
                var log = '';
                if (productCodeId == '-1') {
                    log += '請選擇畜禽產品代碼！<br>';
                }
                if (!Helper.NumberValidate(marketingRatio)) {
                    log += '銷售額比例請填寫不小於0的整數！<br>';
                }
                if (log) {
                    Alert.setMessage(log).open();
                } else {
                    var initObj = [];
                    var animalMarketing = {
                        baseFarmerId: baseFarmer.id,
                        productCodeId: productCodeId,
                        marketingRatio: parseInt(marketingRatio)
                    }
                    initObj.push(animalMarketing);
                    AnimalMarketingHelper.Init(initObj, FirstPageIndex);
                    baseFarmer.AnimalMarketing.push(animalMarketing);
                    dialogRef.close();
                }
            }
        }, {
            label: '取消',
            action: function (dialogRef) {
                dialogRef.close();
            }
        }]
    });
    PopulationAdder = new BootstrapDialog({
        title: '新增戶內人口',
        message: function (dialog) {
            var content = $(PopulationHelper.AdderUI);
            content.find('.relationshipCodeId').html(RelationshipCodeUI.clone());
            content.find('.sex').html($(PopulationHelper.SexUI));
            content.find('.educationLevelCodeId').html(EducationLevelCodeUI.clone());
            content.find('.farmerWorkDayId').html(FarmerWorkDayUI.clone());
            content.find('.lifeStyleCodeId').html(LifeStyleCodeUI.clone());
            content.find('.otherFarmWorkCodeId').html(OtherFarmWorkCodeUI.clone());
            return content;
        },
        buttons: [{
            label: '新增',
            action: function (dialogRef) {
                var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
                var index = baseFarmer.Population.length;

                var relationshipCodeId = dialogRef.$modalContent.find('.relationshipCodeId select').val();
                var sex = dialogRef.$modalContent.find('.sex select').val();
                var birthYear = dialogRef.$modalContent.find('.birthYear input').val();
                var educationLevelCodeId = dialogRef.$modalContent.find('.educationLevelCodeId select').val();
                var farmerWorkDayId = dialogRef.$modalContent.find('.farmerWorkDayId select').val();
                var lifeStyleCodeId = dialogRef.$modalContent.find('.lifeStyleCodeId select').val();
                var otherFarmWorkCodeId = dialogRef.$modalContent.find('.otherFarmWorkCodeId select').val();

                var log = '';
                if (relationshipCodeId == '-1') {
                    log += '請選擇與戶長之關係！<br>';
                }
                if (sex == '-1') {
                    log += '請選擇性別！<br>';
                }
                if (!Helper.NumberValidate(birthYear)) {
                    log += '出生年次請填寫不小於0的整數！<br>';
                }
                if (educationLevelCodeId == '-1') {
                    log += '請選擇教育程度別！<br>';
                }
                if (farmerWorkDayId == '-1') {
                    log += '請選擇全年從事自家農牧業工作日數！<br>';
                }
                if (lifeStyleCodeId == '-1') {
                    log += '請選擇全年主要生活型態！<br>';
                }
                if (otherFarmWorkCodeId == '-1') {
                    log += '請選擇是否有從事農牧業外工作！<br>';
                }

                if (log) {
                    Alert.setMessage(log).open();
                } else {
                    var initObj = [];
                    var population = {
                        baseFarmerId: baseFarmer.id,
                        sex: sex,
                        birthYear: birthYear,
                        educationLevelCodeId: educationLevelCodeId,
                        farmerWorkDayId: farmerWorkDayId,
                        lifeStyleCodeId: lifeStyleCodeId,
                        otherFarmWorkCodeId: otherFarmWorkCodeId,
                        relationshipCodeId: relationshipCodeId
                    }
                    initObj.push(population);
                    PopulationHelper.Init(initObj, FirstPageIndex);
                    baseFarmer.Population.push(population);
                    dialogRef.close();
                }
            }
        }, {
            label: '取消',
            action: function (dialogRef) {
                dialogRef.close();
            }
        }]
    });
    ShortTermForLackAdder = new BootstrapDialog({
        title: '新增臨時或季節性員工短缺情形',
        message: function (dialog) {
            var content = $(ShortTermForLackHelper.AdderUI);
            content.find('.productCodeId').html(ProductCodeUI.clone());
            content.find('.workerTypeCodeId').html(WorkerTypeCodeUI.clone());
            content.find('.LackMonths').html(MonthPickerUI_Multi.clone());
            content.find('.LackMonths .selectpicker').selectpicker('refresh');
            return content;
        },
        buttons: [{
            label: '新增',
            action: function (dialogRef) {
                var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
                var index = baseFarmer.ShortTermForLack.length;
                var productCodeId = dialogRef.$modalContent.find('.productCodeId select').val();
                var workerTypeCodeId = dialogRef.$modalContent.find('.workerTypeCodeId select').val();
                var numberOfPeople = dialogRef.$modalContent.find('.numberOfPeople input').val();
                var lackMonths_array = dialogRef.$modalContent.find('.LackMonths select').val();

                var log = '';
                if (productCodeId == '-1') {
                    log += '請選擇產品代碼！<br>';
                }
                if (workerTypeCodeId == '-1') {
                    log += '請選擇受僱農牧業工作類型！<br>';
                }
                if (!Helper.NumberValidate(numberOfPeople)) {
                    log += '人次請填寫不小於0的整數！<br>';
                }
                if (!lackMonths_array) {
                    log += '請選擇缺工月份！<br>';
                }
                if (log) {
                    Alert.setMessage(log).open();
                } else {
                    var initObj = [];
                    var LackMonths = [];
                    for (var i = 0; i < lackMonths_array.length; i++) {
                        LackMonths.push({
                            month: parseInt(lackMonths_array[i])
                        });
                    }
                    var shortTermForLack = {
                        LackMonths: LackMonths,
                        baseFarmerId: baseFarmer.id,
                        numberOfPeople: parseInt(numberOfPeople),
                        productCodeId: productCodeId,
                        workerTypeCodeId: workerTypeCodeId
                    }
                    initObj.push(shortTermForLack);
                    ShortTermForLackHelper.Init(initObj, FirstPageIndex);
                    baseFarmer.ShortTermForLack.push(shortTermForLack);
                    dialogRef.close();
                }
            }
        }, {
            label: '取消',
            action: function (dialogRef) {
                dialogRef.close();
            }
        }]
    });
    LongTermForHireAdder = new BootstrapDialog({
        title: '新增常僱員工僱用情形',
        message: function (dialog) {
            var content = $(LongTermForHireHelper.AdderUI);
            content.find('.workerTypeCodeId').html(WorkerTypeCodeUI.clone());
            return content;
        },
        buttons: [{
            label: '新增',
            action: function (dialogRef) {
                var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
                var index = baseFarmer.ShortTermForLack.length;

                var workerTypeCodeId = dialogRef.$modalContent.find('.workerTypeCodeId select').val();
                var avgSalary = dialogRef.$modalContent.find('.avgSalary input').val();

                var log = '';
                if (workerTypeCodeId == '-1') {
                    log += '請選擇受僱農牧業工作類型！<br>';
                }
                var isAgeScopeValid = true;
                dialogRef.$modalContent.find('.ageScopeId').each(function(){
                    var value = $(this).find('input').val();
                    if(!Helper.NumberValidate(value)) {
                        isAgeScopeValid = false;
                    }
                });
                if (!isAgeScopeValid) {
                    log += '人數請填寫不小於0的整數！<br>';
                }
                if (!Helper.NumberValidate(avgSalary)) {
                    log += '平均月薪請填寫不小於0的整數！<br>';
                }
                if (log) {
                    Alert.setMessage(log).open();
                } else {
                    var initObj = [];

                    var NumberWorkers = [];
                    dialogRef.$modalContent.find('.ageScopeId').each(function(){
                        var value = $(this).find('input').val();
                        NumberWorkers.push({
                            ageScopeId: $(this).data('id'),
                            value: parseInt(value)
                        });
                    });

                    var longTermForHire = {
                        baseFarmerId: baseFarmer.id,
                        workerTypeCodeId: workerTypeCodeId,
                        avgSalary: parseInt(avgSalary),
                        NumberWorkers: NumberWorkers                        
                    }

                    initObj.push(longTermForHire);
                    LongTermForHireHelper.Init(initObj, FirstPageIndex);
                    baseFarmer.LongTermForHire.push(longTermForHire);
                    dialogRef.close();
                }
            }
        }, {
            label: '取消',
            action: function (dialogRef) {
                dialogRef.close();
            }
        }]
    });

    /* open Adder*/
    $('#btnAddCropSituation').click(function () {
        CropSituationAdder.open();
    });
    $('#btnAddAnimalMarketing').click(function () {
        AnimalMarketingAdder.open();
    });
    $('#btnAddPopulation').click(function () {
        PopulationAdder.open();
    });
    $('#btnAddShortTermForLack').click(function () {
        ShortTermForLackAdder.open();
    });
    $('#btnAddLongTermForHire').click(function () {
        LongTermForHireAdder.open();
    });
})

var Reset = function () {
    ExaminLogger.ReadErrorArray = 0;
    ExaminLogger.WriteErrorArray = 0;
    $('.bg-danger').each(function () {
        $(this).removeClass('bg-danger');
    });
    BaseFarmerHelper.Reset();
    FarmerLandAreaHelper.Reset();
    CropSituationHelper.Reset();
    AnimalMarketingHelper.Reset();
    AllMarketingHelper.Reset();
    PopulationNumberHelper.Reset();
    PopulationHelper.Reset();
    LongTermForHireHelper.Reset();
    ShortTermForHireHelper.Reset();
    NoSalaryForHireHelper.Reset();
    LongTermForLackHelper.Reset();
    ShortTermForLackHelper.Reset();
}
var Init = function (data, index) {
    if (data.page == 1) {
        FirstPageIndex = index;
        BaseFarmerHelper.Init(data);
        FarmerLandAreaHelper.Init(data.FarmerLandArea);
        AllMarketingHelper.Init(data.AllMarketing);
        PopulationNumberHelper.Init(data.PopulationNumber);        
        ShortTermForHireHelper.Init(data.ShortTermForHire);
        NoSalaryForHireHelper.Init(data.NoSalaryForHire);
        LongTermForLackHelper.Init(data.LongTermForLack);
    }
    /* need setting basefarmer index to locate which obj */
    PopulationHelper.Init(data.Population, index);
    CropSituationHelper.Init(data.CropSituation, index);
    AnimalMarketingHelper.Init(data.AnimalMarketing, index);
    LongTermForHireHelper.Init(data.LongTermForHire, index);
    ShortTermForLackHelper.Init(data.ShortTermForLack, index);
}
var SetUI = function () {
    /* ProductCode */
    ProductCodeUI = $('<select class="form-control" data-name="ProductCodeUI">');
    ProductCodeUI.append($('<option>').val(-1).text('--請選擇--'));
    for (var i in Components.ProductCode) {
        ProductCodeUI.append($('<option>')
            .val(Components.ProductCode[i].id)
            .attr('data-code', Components.ProductCode[i].code)
            .html(Components.ProductCode[i].code + Components.ProductCode[i].name));
    }
    /* CropProductCodeUI & AnimalProductCodeUI */
    CropProductCodeUI = $('<select class="form-control" data-name="CropProductCodeUI">');
    AnimalProductCodeUI = $('<select class="form-control" data-name="AnimalProductCodeUI">');
    CropProductCodeUI.append($('<option>').val(-1).text('--請選擇--'));
    AnimalProductCodeUI.append($('<option>').val(-1).text('--請選擇--'));
    var crops = $.grep(Components.ProductCode, function (e) {
        return e.type == 'Crop';
    });
    var animals = $.grep(Components.ProductCode, function (e) {
        return e.type == 'Animal';
    });
    for (var i in crops) {
        CropProductCodeUI.append($('<option>').val(crops[i].id).attr('data-code', crops[i].code).html(crops[i].code + crops[i].name));
    }
    for (var i in animals) {
        AnimalProductCodeUI.append($('<option>').val(animals[i].id).attr('data-code', animals[i].code).html(animals[i].code + animals[i].name));
    }

    /* FacilityCodeUI */
    FacilityCodeUI = $('<select class="form-control" data-name="FacilityCodeUI">');
    FacilityCodeUI.append($('<option>').val(-1).text('--請選擇--'));
    for (var i in Components.FacilityCode) {
        FacilityCodeUI.append($('<option>')
            .val(Components.FacilityCode[i].id)
            .html(Components.FacilityCode[i].id + '.' + Components.FacilityCode[i].name));
    }
    /* AllMarketing Table */
    for (var i in Components.IncomeRangeCode) {
        $('#AllMarketing').find('thead>tr').append($('<th>').val(Components.IncomeRangeCode[i].id).html(Components.IncomeRangeCode[i].name));
    }
    for (var i in Components.MarketType) {
        var tr = $('<tr>')
            .append($('<th scopt="row">')
                .append(Components.MarketType[i].name));
        for (var j = 0; j < Components.IncomeRangeCode.length; j++) {
            var td = $('<td>');
            td.append(
                $('<input type="checkbox" style="width:20px;height:20px;">')
                .attr('data-name', Components.MarketType[i].name)
                .attr('data-incomerangecodeid', Components.IncomeRangeCode[j].id)
                .attr('data-incomerangecodemin', Components.IncomeRangeCode[j].min)
                .attr('data-incomerangecodemax', Components.IncomeRangeCode[j].max)
                .attr('data-markettypeid', Components.MarketType[i].id))
            tr.append(td);
        }
        $('#AllMarketing').find('tbody').append(tr);
    }
    /* RelationshipCodeUI */
    RelationshipCodeUI = $('<select class="form-control" data-name="RelationshipCodeUI">');

    RelationshipCodeUI.append($('<option>').val(-1).text('--請選擇--'));
    for (var i in Components.RelationshipCode) {
        RelationshipCodeUI.append($('<option>').val(Components.RelationshipCode[i].id).html(Components.RelationshipCode[i].id + '.' + Components.RelationshipCode[i].name));
    }
    /* EducationLevelCodeUI */
    EducationLevelCodeUI = $('<select class="form-control" data-name="EducationLevelCodeUI">');
    EducationLevelCodeUI.append($('<option>').val(-1).text('--請選擇--'));
    for (var i in Components.EducationLevelCode) {
        EducationLevelCodeUI.append($('<option>')
            .val(Components.EducationLevelCode[i].id)
            .attr('data-age', Components.EducationLevelCode[i].age)
            .html(Components.EducationLevelCode[i].id + '.' + Components.EducationLevelCode[i].name));
    }
    /* FarmerWorkDayUI */
    FarmerWorkDayUI = $('<select class="form-control" data-name="FarmerWorkDayUI">');
    FarmerWorkDayUI.append($('<option>').val(-1).text('--請選擇--'));
    for (var i in Components.FarmerWorkDay) {
        FarmerWorkDayUI.append($('<option>').val(Components.FarmerWorkDay[i].id).html(Components.FarmerWorkDay[i].id + '.' + Components.FarmerWorkDay[i].name));
    }
    /* LifeStyleCodeUI */
    LifeStyleCodeUI = $('<select class="form-control" data-name="LifeStyleCodeUI">');
    LifeStyleCodeUI.append($('<option>').val(-1).text('--請選擇--'));
    for (var i in Components.LifeStyleCode) {
        LifeStyleCodeUI.append($('<option>').val(Components.LifeStyleCode[i].id).html(Components.LifeStyleCode[i].id + '.' + Components.LifeStyleCode[i].name));
    }

    /* OtherFarmWorkCodeUI */
    OtherFarmWorkCodeUI = $('<select class="form-control" data-name="OtherFarmWorkCodeUI">');
    OtherFarmWorkCodeUI.append($('<option>').val(-1).text('--請選擇--'));
    for (var i in Components.OtherFarmWorkCode) {
        OtherFarmWorkCodeUI.append($('<option>').val(Components.OtherFarmWorkCode[i].id).html(Components.OtherFarmWorkCode[i].id + '.' + Components.OtherFarmWorkCode[i].name));
    }

    /* WorkerTypeCodeUI */
    WorkerTypeCodeUI = $('<select class="form-control" data-name="WorkerTypeCodeUI">');
    WorkerTypeCodeUI.append($('<option>').val(-1).text('--請選擇--'));
    for (var i in Components.WorkerTypeCode) {
        WorkerTypeCodeUI.append($('<option>').val(Components.WorkerTypeCode[i].id).html(Components.WorkerTypeCode[i].code + '.' + Components.WorkerTypeCode[i].name));
    }

    /* WorkerTypeCodeUI_Multi */
    WorkerTypeCodeUI_Multi = $('<select class="selectpicker" title="--請選擇--" multiple data-name="WorkerTypeCodeUI_Multi">');
    for (var i in Components.WorkerTypeCode) {
        WorkerTypeCodeUI_Multi.append($('<option>').val(Components.WorkerTypeCode[i].id).html(Components.WorkerTypeCode[i].code + '.' + Components.WorkerTypeCode[i].name));
    }

    MonthPickerUI_Multi = $('<select class="selectpicker" title="--請選擇--" multiple data-name="MonthPickerUI_Multi">');
    for (var i = 1; i <= 12; i++) {
        MonthPickerUI_Multi.append($('<option>').val(i).html(i));
    }

}
var Helper = {
    GetFarmerLandTypeName: function (id) {
        if (Components) {
            var array = $.grep(Components.FarmerLandType, function (farmerLandType) {
                return farmerLandType.id == id;
            })
            return array[0].name;
        }
    },
    GetProductionTypeName: function (id) {
        if (Components) {
            var array = $.grep(Components.FarmerProductionType, function (farmerProductionType) {
                return farmerProductionType.id == id;
            })
            return array[0].name;
        }
    },
    NumberValidate: function (number) {
        return $.isNumeric(number) && Math.floor(number) == number && number >= 0;
    },
    LogHandler: function (condition, alert, target, log, classname) {
        if (condition) {
            if (!alert.message.includes(log)) {
                alert.message += log;
            };
            if (target) {
                for (var i = 0; i < target.length; i++) { target[i].className += ' ' + classname; }
            }
        } else {
            alert.message = alert.message.replace(log, '');
            if (target) {
                var re = new RegExp(' ' + classname, "g");
                for (var i = 0; i < target.length; i++) { target[i].className = target[i].className.replace(re, ''); }
            }
        }
        alert.autocall();
    },
    Alert: function (obj) {
        this.object = obj;
        this.message = '';
        this.autocall = function () {
            if (this.message) {
                this.object.html(this.message).show();
            } else {
                this.object.hide();
            }
        };
        this.reset = function () {
            this.message = '';
            this.object.html('').hide();
        }
    },
    CountError: function () {
        var array = [];
        var alerts = [
            BaseFarmerHelper.Alert00,
            BaseFarmerHelper.Alert01,
            BaseFarmerHelper.Alert11,
            BaseFarmerHelper.Alert14,
            FarmerLandAreaHelper.Alert02,
            CropSituationHelper.Alert03,
            AnimalMarketingHelper.Alert04,
            AllMarketingHelper.Alert05,
            PopulationHelper.Alert07,
            LongTermForHireHelper.Alert,
            ShortTermForHireHelper.Alert09,
            NoSalaryForHireHelper.Alert,
            LongTermForLackHelper.Alert,
            ShortTermForLackHelper.Alert13]
        for (var i in alerts) {
            var logs = alerts[i].message.split('<br>');
            for (var j in logs) {
                if ($.inArray(logs[j], array) == -1 && logs[j]) {
                    array.push(logs[j]);
                }
            }
        }
        return array;
    },
    CheckIsHireAndIsLackToReset: function (farmerList, firstPageIndex) {
        var isHire = farmerList[firstPageIndex].BaseFarmer.isHire == 'Y';
        var isLack = $.inArray(farmerList[firstPageIndex].BaseFarmer.lackId, [1, 2]) == -1;

        var baseFarmer = farmerList[firstPageIndex].BaseFarmer;
        if (!isHire) {
            LongTermForHireHelper.ResetObject(baseFarmer.LongTermForHire);
            ShortTermForHireHelper.ResetObject(baseFarmer.ShortTermForHire);
            NoSalaryForHireHelper.ResetObject(baseFarmer.NoSalaryForHire);
        }
        if (!isLack) {
            LongTermForLackHelper.ResetObject(baseFarmer.LongTermForLack);
            for (var i in farmerList) {
                farmerList[i].BaseFarmer.ShortTermForLack = [];
            }
        }
    }
}
var MultiTableExamine = {
    Direct: function () {
        this.CheckCrop_Animal_Marketing.Check_Crop();
        this.CheckCrop_Animal_Marketing.Check_Animal();
        this.CheckBusiness_Marketing();
        this.CheckCrop_Animal_FarmerLandArea.Check_Crop();
        this.CheckCrop_Animal_FarmerLandArea.Check_Animal();
        this.CheckPopulationNumber_Population();
        this.CheckCrop_Animal_ShortTermForLack();
        this.CheckCrop_Animal_Business();
        this.CheckCrop_Population();
        this.CheckMarketing_Popuation();
    },
    CheckCrop_Animal_Business: function () {
        var con00 = $('#Business input[data-farmrelatedbusinessid="2"]').prop('checked');
        var con01 = ($('#CropSituation .CropSituationObj').length + $('#AnimalMarketing .AnimalMarketingObj').length) > 0;
        var con02 = ($('#AllMarketing input[data-name="農產品(含生產及加工)"]:checked').length + $('#AllMarketing input[data-name="畜禽產品(含生產及加工)"]:checked').length) > 0;
        var con0 = con00 && !con01;
        var con1 = con00 && !con02;
        var log00 = '若勾選「2.農產品加工」者，應於【問項3.1、3.2及3.3】之「農產品」及「畜禽產品」類別之銷售額計入其加工收入。' + '<br>';
        var log01 = '【問項1.2】若勾選「2.農產品加工」者，【問項3.1、3.2】應有「農產品」或「畜禽產品」。' + '<br>';
        var log02 = '【問項1.2】若勾選「2.農產品加工」者，【問項3.3】應有「農產品」或「畜禽產品」之全年銷售額。' + '<br>';

        Helper.LogHandler(con00, BaseFarmerHelper.Alert20, null, log00);
        Helper.LogHandler(con0, BaseFarmerHelper.Alert01, null, log01);
        Helper.LogHandler(con0, CropSituationHelper.Alert03, null, log01);
        Helper.LogHandler(con0, AnimalMarketingHelper.Alert04, null, log01);
        Helper.LogHandler(con1, BaseFarmerHelper.Alert01, null, log02);
        Helper.LogHandler(con1, AllMarketingHelper.Alert05, null, log02);
    },
    CheckCrop_Animal_Marketing: {
        Check_Crop: function () {
            var con00 = $('#CropSituation .CropSituationObj').length > 0;
            var con01 = $('#AllMarketing input[data-name="農產品(含生產及加工)"]:checked').length > 0;
            var log00 = '【問項3.1】有生產農產品，【問項3.3】應有生產農產品銷售額。' + '<br>';
            var con0 = (con00 && !con01) || (!con00 && con01);
            Helper.LogHandler(con0, CropSituationHelper.Alert03, null, log00);
            Helper.LogHandler(con0, AllMarketingHelper.Alert05, null, log00);

            var con02 = CropSituationHelper.GetRatioSum() == 0 && con00;
            var con03 = $('#AllMarketing input[data-name="農產品(含生產及加工)"]:checked').data('incomerangecodeid') == '1';
            var log1 = '若農產品銷售額比例總和為「0」，【問項3.3】農產品全年銷售額應勾選「未達20萬元」。' + '<br>';
            var con1 = con02 && !con03;
            Helper.LogHandler(con1, CropSituationHelper.Alert03, null, log1);
            Helper.LogHandler(con1, AllMarketingHelper.Alert05, null, log1);
        },
        Check_Animal: function () {
            var con00 = $('#AnimalMarketing .AnimalMarketingObj').length > 0;
            var con01 = $('#AllMarketing input[data-name="畜禽產品(含生產及加工)"]:checked').length > 0;
            var log0 = '【問項3.2】有生產畜產品，【問項3.3】應有生產畜產品銷售額。' + '<br>';
            var con0 = (con00 && !con01) || (!con00 && con01);
            Helper.LogHandler(con0, AnimalMarketingHelper.Alert04, null, log0);
            Helper.LogHandler(con0, AllMarketingHelper.Alert05, null, log0);

            var con02 = AnimalMarketingHelper.GetRatioSum() == 0 && con00;
            var con03 = $('#AllMarketing input[data-name="畜禽產品(含生產及加工)"]:checked').data('incomerangecodeid') == '1';
            var log1 = '若畜禽產品銷售額比例總和為「0」，【問項3.3】畜禽全年銷售額應勾選「未達20萬元」。' + '<br>';
            var con1 = con02 && !con03;
            Helper.LogHandler(con1, AnimalMarketingHelper.Alert04, null, log1);
            Helper.LogHandler(con1, AllMarketingHelper.Alert05, null, log1);
        }
    },
    CheckBusiness_Marketing: function () {
        var con00 = $('#Business input[data-source="Business"][data-has-business="Y"]:checked').length > 0;
        var con01 = $('#AllMarketing input[data-markettypeid="4"]:checked').length > 0;
        var con1 = con00 && !con01;
        var log1 = '【問項1.2】若勾選休閒農業」或「餐飲店」之兼營農業相關事業者，應於【問項3.3】之「休閒及相關事業」中填列其銷售收入。' + '<br>';
        Helper.LogHandler(con1, BaseFarmerHelper.Alert01, null, log1);
        Helper.LogHandler(con1, AllMarketingHelper.Alert05, null, log1);

        var con02 = false;
        $('#Business input[data-source="Business"]:checked').each(function () {
            var id = $(this).data('farmrelatedbusinessid');
            if ($.inArray(id, [3, 4, 6, 7]) != -1) {
                con02 = true;
            }
        });
        var con2 = con01 && !con02;
        var log2 = '【問項3.3】「休閒及相關事業」有填列銷售收入者，【問項1.2】應至少勾選「休閒農業」或「餐飲店」或「販售門市」或「其他」之兼營農業相關事業。' + '<br>';
        Helper.LogHandler(con2, BaseFarmerHelper.Alert01, null, log2);
        Helper.LogHandler(con2, AllMarketingHelper.Alert05, null, log2);

    },
    CheckCrop_Animal_FarmerLandArea: {
        Check_Crop: function () {
            var con00 = FarmerLandAreaHelper.GetSum(2) > 0;
            var con01 = false;
            $('#CropSituation select[data-name="FacilityCodeUI"]').each(function () {
                var value = $(this).val();
                var array = ['3', '4', '5', '6', '7'];
                if ($.inArray(value, array) != -1) {
                    con01 = true;
                }
            });
            var con1 = con00 && !con01;
            var log1 = '【問項2】有填寫人工鋪面的面積者，則【問項3.1】應有對應之農業設施種類代號3~7，若無則應於附記欄加註原因。' + '<br>';
            Helper.LogHandler(con1, FarmerLandAreaHelper.Alert16, null, log1);
            Helper.LogHandler(con1, CropSituationHelper.Alert17, null, log1);

            var con02 = $('#CropSituation .CropSituationObj').length > 0;
            var con03 = FarmerLandAreaHelper.GetSum(1) > 0 || con00;
            var log2 = '【問項3.1】有生產農產品者，應有填寫可耕作面積或人工鋪面面積。' + '<br>';
            var con2 = con02 && !con03;
            Helper.LogHandler(con2, FarmerLandAreaHelper.Alert02, null, log2);
            Helper.LogHandler(con2, CropSituationHelper.Alert03, null, log2);

        },
        Check_Animal: function () {
            var con00 = FarmerLandAreaHelper.GetSum(3) > 0;
            var con01 = $('#AnimalMarketing .AnimalMarketingObj').length > 0;
            var con1 = con00 && !con01
            var log1 = '【問項2】有填寫畜牧用地面積者，則【問項3.2】應有生產畜禽產品，若無則應於附記欄加註原因。 ' + '<br>';
            Helper.LogHandler(con1, FarmerLandAreaHelper.Alert16, null, log1);
            Helper.LogHandler(con1, AnimalMarketingHelper.Alert18, null, log1);

            var log2 = '【問項3.2】有生產畜禽產品，【問項2】應有填寫畜牧用地面積。' + '<br>';
            var con2 = !con00 && con01;
            Helper.LogHandler(con2, FarmerLandAreaHelper.Alert02, null, log2);
            Helper.LogHandler(con2, AnimalMarketingHelper.Alert04, null, log2);
        }
    },
    CheckPopulationNumber_Population: function () {
        var over15MaleCount = parseInt($('#PopulationNumber input[data-key="over15Men"]').val());
        var over15FemaleCount = parseInt($('#PopulationNumber input[data-key="over15Women"]').val());
        var populationMaleCount = 0;
        var populationFemaleCount = 0;
        var selects = $('#Population .sex select');
        selects.each(function () {
            if ($(this).val() == '男') { populationMaleCount += 1; }
            if ($(this).val() == '女') { populationFemaleCount += 1; }
        });
        var con = over15MaleCount != populationMaleCount || over15FemaleCount != populationFemaleCount;
        var log = '【問項4.1】滿15歲以上男、女性人數，應等於【問項4.2】男、女性人數。' + '<br>';
        Helper.LogHandler(con, PopulationNumberHelper.Alert, null, log);
        Helper.LogHandler(con, PopulationHelper.Alert07, null, log);
    },
    CheckCrop_Animal_ShortTermForLack: function () {
        var crop_array = []; CropSituationHelper.Alert03
        $('#CropSituation .productCodeId select').each(function () {
            crop_array.push($(this).val());
        });
        var animal_array = [];
        $('#AnimalMarketing .productCodeId select').each(function () {
            animal_array.push($(this).val());
        });
        $('#ShortTermForLack .productCodeId select').each(function () {
            var target = $(this).closest('td');
            var con = $.inArray($(this).val(), crop_array) == -1 && $.inArray($(this).val(), animal_array) == -1;
            var log = '第' + target.data('rownum') + '列之產品代碼應有對應【問項3.1或3.2】之生產農畜產品。' + '<br>';
            Helper.LogHandler(con, ShortTermForLackHelper.Alert13, null, log);
        });
    },
    CheckCrop_Population: function () {
        $('#Population .PopulationObj').each(function () {

            var this_id = $(this).data('id');
            var this_obj = PopulationHelper.GetPopulation(this_id);

            var log = '戶內人口代號' + $(this).find('.rownum').text() + '：主要生活型態勾選「自營農牧業工作」，則其全年從事自家農牧工作日數應大於「30~59日」，惟種稻或果樹採粗放式經營者不在此限。' + '<br>';

            var product_not_include_array = [101, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520];
            var con00 = this_obj.FarmerWorkDayUI.val() == '2' && this_obj.LifeStyleCodeUI.val() == '1'
            var con01 = false;
            $('#CropSituation .productCodeId select').each(function () {
                var value = $(this).find('option:selected').data('code');
                if ($.inArray(value, product_not_include_array) != -1) {
                    con01 = true;
                }
            });
            var con = con00 && !con01;

            Helper.LogHandler(con, PopulationHelper.Alert19, null, log);
        });
    },
    CheckMarketing_Popuation: function () {
        var log = '【問項4.2】若主要生活型態有勾選「受託提供農事及畜牧服務」，則【問項3.3】應有勾選「受託提供農事及畜牧服務」之銷售額區間。' + '<br>';
        var con00 = $('#AllMarketing input[data-name="受託提供農事及畜牧服務"]:checked').length > 0;
        var con01 = false;
        $('#Population .lifeStyleCodeId select').each(function () {
            if ($(this).val() == '3') {
                con01 = true;
            }
        });
        var con = !con00 && con01;
        Helper.LogHandler(con, PopulationHelper.Alert07, null, log);
        Helper.LogHandler(con, AllMarketingHelper.Alert05, null, log);
    }
}
var BaseFarmerHelper = {
    Alert00: null,
    Alert01: null,
    Alert11: null,
    Alert14: null,
    Alert20: null,
    Reset: function () {
        if (this.Alert00) { this.Alert00.reset(); }
        if (this.Alert01) { this.Alert01.reset(); }
        if (this.Alert11) { this.Alert11.reset(); }
        if (this.Alert14) { this.Alert14.reset(); }
        if (this.Alert20) { this.Alert20.reset(); }
        $('#ExperienceYears input').prop('checked', false);
        $('#Business input[data-farmRelatedBusinessId]').prop('checked', false);
        $('#phone').val('');
        $('#farmerId').html('');
        $('#isHire input').prop('checked', false);
        $('#Lack input').prop('checked', false);
        $('#note').val('');
    },
    Init: function (obj) {
        this.Alert00 = new Helper.Alert($('#Alert00'));
        this.Alert01 = new Helper.Alert($('#Alert01'));
        this.Alert11 = new Helper.Alert($('#Alert11'));
        this.Alert14 = new Helper.Alert($('#Alert14'));
        this.Alert20 = new Helper.Alert($('#Alert20'));
        $('#farmerId').html(obj.farmerId);
        this.InitPhone(obj);
        this.InitExperienceId(obj);
        this.InitBusiness(obj);
        this.InitLackId(obj);
        this.InitIsHire(obj);
        this.InitNote(obj);
        this.BindEvent();
        this.Alert00.autocall();
        this.Alert01.autocall();
        this.Alert11.autocall();
        this.Alert14.autocall();
        this.Alert20.autocall();
    },
    InitPhone: function (obj) {
        $('#phone').val(obj.phone);
        this.CheckPhone($('#phone'));
    },
    InitExperienceId: function (obj) {
        $('#ExperienceYears input[data-experienceYearsId=' + obj.experienceYearsId + ']').prop('checked', true);
        this.CheckExperienceYear();
    },
    InitBusiness: function (obj) {
        for (var i in obj.Business) {
            $('#Business input[data-farmRelatedBusinessId="' + obj.Business[i].farmRelatedBusinessId + '"]').each(function () {
                $(this).prop('checked', true);
            });
        }
        this.CheckBusiness();
    },
    InitLackId: function (obj) {
        $('#Lack input[data-lackId="' + obj.lackId + '"]').prop('checked', true);
        this.CheckLack();
        this.ShowOrHideLack($('#Lack input:checked'));
    },
    InitIsHire: function (obj) {
        $('#isHire input[data-ishire="' + obj.isHire + '"]').prop('checked', true);
        this.CheckIsHire();
        this.ShowOrHideIsHire($('#isHire input:checked'));
    },
    InitNote: function (obj) {
        $('#note').val(obj.note);
    },
    CheckLack: function () {
        var log00 = '貴戶是否有農業人力短缺情形不得漏填。' + '<br>';
        var log01 = '若【問項5.2.1】無人力短缺情形，則【問項5.2.2及5.3.3】應為空白。' + '<br>';
        var log02 = '若【問項5.2.1】有人力短缺情形，則【問項5.2.2及5.3.3】不應為空白。' + '<br>';
        //
        var target = [];
        for (i = 0 ; i < $('#Lack tr').length; i++) {
            target.push($('#Lack tr:eq(' + i + ') td:last-child')[0]);
        }
        var con = $('#Lack input[name="Lack"]:checked').length == 0;
        Helper.LogHandler(con, BaseFarmerHelper.Alert11, target, log00, 'bg-danger');
        //
        var con00 = $('#Lack input[name="Lack"]:checked').data('has-lack') == 'N';
        var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
        var numberOfPeople = 0;        
        for (var i in baseFarmer.LongTermForLack) {
            numberOfPeople += baseFarmer.LongTermForLack[i].numberOfPeople;
        }
        var con01 = numberOfPeople + $('#ShortTermForLack .ShortTermForLackObj').length > 0;
        Helper.LogHandler(con00 && con01, BaseFarmerHelper.Alert11, null, log01);
        //
        Helper.LogHandler(!con00 && !con01, BaseFarmerHelper.Alert11, null, log02);
    },
    ShowOrHideLack: function (input) {
        //show or hide lack tables
        var hasLack = input.data('has-lack');
        if (hasLack == 'Y') {
            $('#LongTermForLack').closest('.container').show();
            $('#ShortTermForLack').closest('.container').show();
        } else {
            $('#LongTermForLack').closest('.container').hide();
            $('#ShortTermForLack').closest('.container').hide();
        }
    },
    ShowOrHideIsHire: function (input) {
        //show or hide ishire tables
        var isHire = input.data('ishire');
        if (isHire == 'Y') {
            $('#LongTermForHire').closest('.container').show();
            $('#ShortTermForHire').closest('.container').show();
            $('#NoSalaryForHire').closest('.container').show();
        } else {
            $('#LongTermForHire').closest('.container').hide();
            $('#ShortTermForHire').closest('.container').hide();
            $('#NoSalaryForHire').closest('.container').hide();
        }
    },
    CheckExperienceYear: function () {
        var log = '貴戶從事農牧業經營年數不得漏填。' + '<br>'
        var con = $('#ExperienceYears input[data-experienceYearsId]:checked').length == 0;
        var target = $('#ExperienceYears');
        Helper.LogHandler(con, BaseFarmerHelper.Alert01, target, log, 'bg-danger');
    },
    CheckPhone: function (obj) {
        var log = '電話號碼不得大於10碼或小於7碼。' + '<br>';
        var con = BaseFarmerHelper.PhoneNumberValidate(obj.val());
        var target = obj.parent();
        Helper.LogHandler(con, BaseFarmerHelper.Alert00, target, log, 'bg-danger');
    },
    CheckBusiness: function () {
        var log = '是否兼營農業相關事業不得漏填；無兼營與有兼營不得重複勾選。' + '<br>';
        var con = !BaseFarmerHelper.BusinessValidate();
        var target = $('#Business');
        Helper.LogHandler(con, BaseFarmerHelper.Alert01, target, log, 'bg-danger');
    },
    CheckIsHire: function () {
        var target = $('#isHire');
        var log00 = '是否有自家農牧業工作外僱人力不得漏填。' + '<br>';
        var log01 = '若【問項5.1.1】無外僱人力，則【問項5.1.2及5.1.3及5.1.4】應為空白。' + '<br>';
        var log02 = '若【問項5.1.1】有外僱人力，則【問項5.1.2及5.1.3及5.1.4】不應為空白。' + '<br>';
        //
        var con = $('#isHire input[name="isHire"]:checked').length == 0;
        Helper.LogHandler(con, BaseFarmerHelper.Alert14, target, log00, 'bg-danger');
        //
        var con00 = $('#isHire input[name="isHire"]:checked').data('ishire') == 'N';
        var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
        var numberOfPeopleLongTerm = 0;
        for (var i in baseFarmer.LongTermForHire) {
            for (var j in baseFarmer.LongTermForHire[i].NumberWorkers) {
                numberOfPeopleLongTerm += parseInt(baseFarmer.LongTermForHire[i].NumberWorkers[j].value);
            }
        }
        var numberOfPeopleShortTerm = 0;
        for (var i in baseFarmer.ShortTermForHire) {
            for (var j in baseFarmer.ShortTermForHire[i].NumberWorkers) {
                numberOfPeopleShortTerm += parseInt(baseFarmer.ShortTermForHire[i].NumberWorkers[j].value);
            }
        }
        var numberOfPeopleNoSalary = 0;
        for (var i in baseFarmer.NoSalaryForHire) {
            numberOfPeopleNoSalary += parseInt(baseFarmer.NoSalaryForHire[i].numberOfPeople);
        }
        var con01 = numberOfPeopleLongTerm + numberOfPeopleShortTerm + numberOfPeopleNoSalary > 0

        Helper.LogHandler(con00 && con01, BaseFarmerHelper.Alert14, null, log01);
        Helper.LogHandler(!con00 && !con01, BaseFarmerHelper.Alert14, null, log02);

    },
    BindEvent: function () {
        /* phone*/
        $('#phone').change(function () {
            BaseFarmerHelper.CheckPhone($(this));
            var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
            baseFarmer.phone = $(this).val();
        });
        /* ExperienceYear */
        $('#ExperienceYears input').change(function () {
            BaseFarmerHelper.CheckExperienceYear();
            var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
            if ($('#ExperienceYears input:checked').length > 0) {
                baseFarmer.experienceYearsId = $('#ExperienceYears input:checked').data('experienceyearsid');
            }
        });
        /* Business*/
        $('#Business input').change(function () {
            BaseFarmerHelper.CheckBusiness();
            MultiTableExamine.CheckBusiness_Marketing();
            MultiTableExamine.CheckCrop_Animal_Business();
            // update...
            var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
            baseFarmer.Business = [];
            $('#Business input:checked').each(function () {
                var business = {
                    baseFarmerId: baseFarmer.id,
                    farmRelatedBusinessId: $(this).data('farmrelatedbusinessid')
                };
                baseFarmer.Business.push(business);
            });
        });
        /* Lack*/
        $('#Lack input').change(function () {
            BaseFarmerHelper.CheckLack();
            BaseFarmerHelper.ShowOrHideLack($(this));
            //update...
            var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
            baseFarmer.lackId = $('#Lack input:checked').data('lackid');
        });
        /* isHire*/
        $('#isHire input').change(function () {
            BaseFarmerHelper.CheckIsHire();
            BaseFarmerHelper.ShowOrHideIsHire($(this));
            //update...
            var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;           
            baseFarmer.isHire = $('#isHire input:checked').data('ishire');
        });
        /* note*/
        $('#note').change(function () {
            //update...
            var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
            baseFarmer.note = $(this).val().trim();
        });
    },
    PhoneNumberValidate: function (phone) {
        return phone.length > 10 || phone.length < 7
    },
    BusinessValidate: function () {
        var firstChecked = $('#Business input[data-farmRelatedBusinessId=1]:checked').length > 0;
        if (firstChecked && $('#Business input:checked').length > 1) {
            return false;
        }
        return $('#Business input:checked').length > 0;
    }
}
var FarmerLandAreaHelper = {
    Reset: function () {
        if (this.Alert02) { this.Alert02.reset(); }
        if (this.Alert16) { this.Alert16.reset(); }
        $('#FarmerLandArea input[data-source="FarmerLandArea"]').remove();
    },
    Init: function (obj) {
        if (!this.Alert02) {
            this.Alert02 = new Helper.Alert($('#Alert02'));
        }
        if (!this.Alert16) {
            this.Alert16 = new Helper.Alert($('#Alert16'));
        }
        $('#FarmerLandArea tr:not(:first) td').each(function () {
            $(this).html($(InputUI));
        });
        this.InitFarmerLandArea(obj);
        this.BindEvent();
    },
    InitFarmerLandArea: function (obj) {
        for (var i in obj) {
            var td = $('#FarmerLandArea td[data-farmerlandtypeid="' + obj[i].farmerLandTypeId + '"][data-farmerproductiontypeid="' + obj[i].farmerProductionTypeId + '"]');

            td.find('input')
                .val(obj[i].value)
                .attr('data-source', 'FarmerLandArea')
                .attr('data-index', i)
                .attr('data-farmerlandtypeid', obj[i].farmerLandTypeId)
                .attr('data-farmerproductiontypeid', obj[i].farmerProductionTypeId);

            FarmerLandAreaHelper.CheckInput(td.find('input'));
        }
        for (var i in Components.FarmerLandType) {
            FarmerLandAreaHelper.CheckSum(Components.FarmerLandType[i].id);
        }
        FarmerLandAreaHelper.Alert02.autocall();
        FarmerLandAreaHelper.Alert16.autocall();
    },
    GetSum: function (farmerLandTypeId) {
        var sum = 0;
        /* 加列： 自有 + 租用 + 委託經營 */
        $('#FarmerLandArea td[data-farmerlandtypeid="' + farmerLandTypeId + '"]:not(:eq(1)):not(:last) input').each(function () {
            sum += parseInt($(this).val());
        });
        /* 減列：租出 */
        sum -= $('#FarmerLandArea td[data-farmerlandtypeid="' + farmerLandTypeId + '"]:eq(1) input').val();
        return sum;
    },
    BindEvent: function () {
        $('#FarmerLandArea').on('change', 'input', function () {
            var value = $(this).val();
            var index = $(this).data('index');
            var farmerLandTypeId = $(this).data('farmerlandtypeid');
            var isValid = FarmerLandAreaHelper.CheckInput($(this));

            FarmerLandAreaHelper.CheckSum(farmerLandTypeId);
            FarmerLandAreaHelper.CheckOwnMinusRentOut(farmerLandTypeId);


            if ($(this).data('farmerlandtypeid') == '2' || $(this).data('farmerlandtypeid') == '1') {
                MultiTableExamine.CheckCrop_Animal_FarmerLandArea.Check_Crop();
            }

            if ($(this).data('farmerlandtypeid') == '3') {
                MultiTableExamine.CheckCrop_Animal_FarmerLandArea.Check_Animal();
            }
            FarmerLandAreaHelper.Alert02.autocall();

            // update...
            if (isValid) {
                var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
                baseFarmer.FarmerLandArea[index].value = parseInt(value);
            }

        });
    },
    CheckInput: function (obj) {
        var log = Helper.GetProductionTypeName(obj.data('farmerproductiontypeid')) + Helper.GetFarmerLandTypeName(obj.data('farmerlandtypeid')) + '面積請輸入不小於0的整數。' + '<br>';
        var con = !Helper.NumberValidate(obj.val());
        var target = obj.closest('td');
        Helper.LogHandler(con, FarmerLandAreaHelper.Alert02, target, log, 'bg-danger');
        return !con;
    },
    CheckSum: function (farmerLandTypeId) {
        var input_sum = $('#FarmerLandArea td[data-farmerlandtypeid=' + farmerLandTypeId + '][data-farmerproductiontypeid=6] input');
        var sum = FarmerLandAreaHelper.GetSum(farmerLandTypeId);
        var log = Helper.GetFarmerLandTypeName(farmerLandTypeId) + '可經營面積與計算結果不符。' + '<br>';
        var con = sum != parseInt(input_sum.val());
        var target = input_sum.closest('tr');
        Helper.LogHandler(con, FarmerLandAreaHelper.Alert02, target, log, 'bg-danger');
    },
    CheckOwnMinusRentOut: function (farmerLandTypeId) {
        var input_own = $('#FarmerLandArea td[data-farmerlandtypeid=' + farmerLandTypeId + '][data-farmerproductiontypeid=1] input');
        var input_rent = $('#FarmerLandArea td[data-farmerlandtypeid=' + farmerLandTypeId + '][data-farmerproductiontypeid=2] input');
        var input_own_value = input_own.val();
        var input_rent_value = input_rent.val();
        var log = Helper.GetFarmerLandTypeName(farmerLandTypeId) + '自有土地面積應大於租(借)出面積。' + '<br>';
        if (!Helper.NumberValidate(input_own_value) || !Helper.NumberValidate(input_rent_value)) {
            return;
        }
        var con = parseInt(input_own_value) < parseInt(input_rent_value);
        var target = input_own.closest('tr');
        Helper.LogHandler(con, FarmerLandAreaHelper.Alert02, null, log);
    },
    Alert02: null,
    Alert16: null
}
var CropSituationHelper = {
    Init: function (obj, index) {
        if (!this.Alert03) {
            this.Alert03 = new Helper.Alert($('#Alert03'));
        }
        if (!this.Alert17) {
            this.Alert17 = new Helper.Alert($('#Alert17'));
        }
        for (var i in obj) {
            /* rownum */
            var rownum = $('#CropSituation .CropSituationObj').length + 1;

            var tr = $(CropSituationHelper.UI)
                .addClass('CropSituationObj')
                .attr('data-basefarmerindex', index)
                .attr('data-source', 'CropSituation')
                .attr('data-rownum', rownum)
                .attr('data-index', i);

            tr.find('th').text(rownum);
            /* ProductCode */
            tr.find('td:eq(0)')
                .addClass('productCodeId')
                .html(CropProductCodeUI.clone()).find('option[value="' + obj[i].productCodeId + '"]').prop('selected', true);
            /* SalesRatio */
            tr.find('td:eq(1)')
                .addClass('salesRatio')
                .find('input')
                    .val(obj[i].salesRatio);
            /* FacilityCode */
            tr.find('td:eq(2)')
                .addClass('facilityCodeId')
                .html(FacilityCodeUI.clone()).find('option[value="' + obj[i].facilityCodeId + '"]').prop('selected', true);
            /* Delete */
            tr.find('td:eq(3)')
                .addClass('deleteCropSituation')
                .html($(DeleteButtonUI));

            this.CheckProductCodeId(tr);
            this.CheckFacilityCodeId(tr);
            this.CheckRatio(tr);

            tr = CropSituationHelper.BindEvent(tr);
            $('#CropSituation').append(tr);
        }
        if (obj.length > 0) {
            MultiTableExamine.CheckCrop_Animal_Marketing.Check_Crop();
            this.CheckRatioSum();
            this.Alert03.autocall();
        }
    },
    CheckProductCodeId: function (tr) {
        var select = tr.find('select[data-name="CropProductCodeUI"]');
        var rownum = tr.data('rownum');
        var productCodeId = select.val();
        var log = '第' + rownum + '列：請重新選擇作物代碼。' + '<br>';
        var con = productCodeId == -1;
        var target = select.closest('td');
        Helper.LogHandler(con, CropSituationHelper.Alert03, target, log, 'bg-danger');
    },
    CheckFacilityCodeId: function (tr) {
        var select = tr.find('select[data-name="FacilityCodeUI"]');
        var rownum = tr.data('rownum');
        var facilityCodeId = select.val();
        var log = '第' + rownum + '列：請重新選擇農業設施種類代號。' + '<br>';
        var con = facilityCodeId == -1;
        var target = select.closest('td');
        Helper.LogHandler(con, CropSituationHelper.Alert03, target, log, 'bg-danger');
    },
    CheckRatio: function (tr) {
        var input = tr.find('.salesRatio input');
        var rownum = tr.data('rownum');
        var value = input.val();
        var log = '第' + rownum + '列：占銷售額比例請輸入介於0至100之間的整數。' + '<br>';
        var con = !Helper.NumberValidate(value);
        var target = input.closest('td');
        Helper.LogHandler(con, CropSituationHelper.Alert03, target, log, 'bg-danger');
        return !con;
    },
    CheckRatioSum: function () {
        var log = '銷售額比例加總應為100。' + '<br>';
        var sum = CropSituationHelper.GetRatioSum();
        var con = $.inArray(sum, [0, 100]) == -1;
        Helper.LogHandler(con, CropSituationHelper.Alert03, null, log);
    },
    GetRatioSum: function () {
        var sum = 0;
        var inputs = $('#CropSituation .salesRatio input');
        inputs.each(function () {
            sum += parseInt($(this).val());
        });
        return sum;
    },
    CheckMushroomsProduct: function (obj) {
        var tr = obj.closest('tr');
        var rownum = tr.data('rownum');
        var target = tr;
        var code_array = [601, 602, 603, 604, 605, 606];
        var facility_array = ['3', '4', '5', '6', '7'];
        var product_code = tr.find('.productCodeId option:selected').data('code');
        var facility_code = tr.find('.facilityCodeId option:selected').val();
        var con = $.inArray(product_code, code_array) != -1 && $.inArray(facility_code, facility_array) == -1;
        var log = '第' + rownum + '列：食用菇蕈之農業設施種類限填代號3~7。' + '<br>';
        Helper.LogHandler(con, CropSituationHelper.Alert03, target, log, 'bg-danger');
    },
    BindEvent: function (tr) {
        tr.find('select[data-name="CropProductCodeUI"]').change(function () {
            //update...
            var index = $(this).closest('tr').data('index');
            var value = $(this).val() == '-1' ? null : $(this).val();
            var baseFarmerIndex = $(this).closest('tr').data('basefarmerindex');
            var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
            baseFarmer.CropSituation[index].productCodeId = value;

            CropSituationHelper.CheckProductCodeId(tr)
            CropSituationHelper.CheckMushroomsProduct($(this));
            CropSituationHelper.Alert03.autocall();
            MultiTableExamine.CheckCrop_Population();
        });
        tr.find('select[data-name="FacilityCodeUI"]').change(function () {
            //update...
            var index = $(this).closest('tr').data('index');
            MultiTableExamine.CheckCrop_Animal_FarmerLandArea.Check_Crop();
            var index = $(this).closest('tr').data('index');
            var value = $(this).val() == '-1' ? null : $(this).val();
            var baseFarmerIndex = $(this).closest('tr').data('basefarmerindex');
            var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
            baseFarmer.CropSituation[index].facilityCodeId = value;

            CropSituationHelper.CheckFacilityCodeId(tr)
            CropSituationHelper.CheckMushroomsProduct($(this));
            CropSituationHelper.Alert03.autocall();
        });
        tr.find('.salesRatio input').change(function () {
            if (CropSituationHelper.CheckRatio(tr)) {
                var index = $(this).closest('tr').data('index');
                var baseFarmerIndex = $(this).closest('tr').data('basefarmerindex');
                var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
                baseFarmer.CropSituation[index].salesRatio = $(this).val();
            };
            MultiTableExamine.CheckCrop_Animal_Marketing.Check_Crop();
            CropSituationHelper.CheckRatioSum();
            CropSituationHelper.Alert03.autocall();
        });
        tr.find('.deleteCropSituation button').click(function () {
            var index = $(this).closest('tr').data('index');
            var baseFarmerIndex = $(this).closest('tr').data('basefarmerindex');
            var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
            baseFarmer.CropSituation.splice(index, 1);

            CropSituationHelper.Reset();

            for (var i in DataCopy.FarmerList) {
                CropSituationHelper.Init(DataCopy.FarmerList[i].BaseFarmer.CropSituation, i);
            }
            // log correlate table also re-init
            FarmerLandAreaHelper.Init(DataCopy.FarmerList[FirstPageIndex].BaseFarmer.FarmerLandArea);
            AllMarketingHelper.Init(DataCopy.FarmerList[FirstPageIndex].BaseFarmer.AllMarketing);


            PopulationHelper.Reset();
            for (var i in DataCopy.FarmerList) {
                PopulationHelper.Init(DataCopy.FarmerList[i].BaseFarmer.Population, i);
            }

            MultiTableExamine.Direct();
        });
        return tr;
    },
    Reset: function () {
        $('#CropSituation').html('');
        if (this.Alert03) { this.Alert03.reset(); }
        if (this.Alert17) { this.Alert17.reset(); }
    },
    Alert03: null,
    Alert17: null,
    UI: '\
        <tr>\
            <th scope="row"></th>\
            <td></td>\
            <td><div class="float-label-control"><input type="text" style="max-width:100px;" class="form-control empty"></div></td>\
            <td></td>\
            <td></td>\
        </tr>\
        ',
    AdderUI: '\
            <form>\
                <div class="form-group">\
                  <label class="col-form-label">農產品代碼</label>\
                  <div class="productCodeId"></div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">銷售額比例</label>\
                  <div class="salesRatio">\
                    <input class="form-control" type="text">\
                  </div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">農業設施種類</label>\
                  <div class="facilityCodeId"></div>\
                </div>\
            </form>\
        '
}
var AnimalMarketingHelper = {
    Init: function (obj, index) {
        if (!this.Alert04) {
            this.Alert04 = new Helper.Alert($('#Alert04'));
        }
        if (!this.Alert18) {
            this.Alert18 = new Helper.Alert($('#Alert18'));
        }
        for (var i in obj) {
            var rownum = $('#AnimalMarketing .AnimalMarketingObj').length + 1;

            var tr = $(AnimalMarketingHelper.UI)
                .addClass('AnimalMarketingObj')
                .attr('data-basefarmerindex', index)
                .attr('data-source', 'AnimalMarketing')
                .attr('data-rownum', rownum)
                .attr('data-index', i);

            /* rownum */
            tr.find('th').text(rownum);
            /* ProductCode */
            tr.find('td:eq(0)')
                .addClass('productCodeId')
                .html(AnimalProductCodeUI.clone()).find('option[value="' + obj[i].productCodeId + '"]').prop('selected', true);
            /* MarketingRatio */
            tr.find('td:eq(1)')
                .addClass('marketingRatio')
                .find('input')
                    .val(obj[i].marketingRatio);

            tr.find('td:eq(2)')
                .addClass('deleteAnimalMarketing')
                .html($(DeleteButtonUI));

            AnimalMarketingHelper.CheckProductCodeId(tr);
            AnimalMarketingHelper.CheckRatio(tr);

            tr = AnimalMarketingHelper.BindEvent(tr);
            $('#AnimalMarketing').append(tr);
        }
        if (obj.length > 0) {
            MultiTableExamine.CheckCrop_Animal_Marketing.Check_Animal();
            this.CheckRatioSum();
            this.Alert04.autocall();
        }
    },
    BindEvent: function (tr) {
        tr.find('select[data-name="AnimalProductCodeUI"]').change(function () {
            //update...
            MultiTableExamine.CheckCrop_Animal_FarmerLandArea.Check_Crop();
            var index = $(this).closest('tr').data('index');
            var value = $(this).val == '-1' ? null : $(this).val();
            var baseFarmerIndex = $(this).closest('tr').data('basefarmerindex');
            var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
            baseFarmer.AnimalMarketing[index].productCodeId = value;
            AnimalMarketingHelper.CheckProductCodeId(tr)
            AnimalMarketingHelper.Alert04.autocall();
        });
        tr.find('.marketingRatio input').change(function () {
            if (AnimalMarketingHelper.CheckRatio(tr)) {
                var index = $(this).closest('tr').data('index');
                var baseFarmerIndex = $(this).closest('tr').data('basefarmerindex');
                var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
                baseFarmer.AnimalMarketing[index].marketingRatio = parseInt($(this).val());
            }
            MultiTableExamine.CheckCrop_Animal_Marketing.Check_Animal();
            AnimalMarketingHelper.CheckRatioSum();
            AnimalMarketingHelper.Alert04.autocall();
        });
        tr.find('.deleteAnimalMarketing button').click(function () {
            var index = $(this).closest('tr').data('index');
            var baseFarmerIndex = $(this).closest('tr').data('basefarmerindex');
            var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
            baseFarmer.AnimalMarketing.splice(index, 1);

            AnimalMarketingHelper.Reset();
            for (var i in DataCopy.FarmerList) {
                AnimalMarketingHelper.Init(DataCopy.FarmerList[i].BaseFarmer.AnimalMarketing, i);
            }
            // log correlate table also re-init
            FarmerLandAreaHelper.Init(DataCopy.FarmerList[FirstPageIndex].BaseFarmer.FarmerLandArea);
            AllMarketingHelper.Init(DataCopy.FarmerList[FirstPageIndex].BaseFarmer.AllMarketing);

            MultiTableExamine.Direct();
        });
        return tr;
    },
    CheckProductCodeId: function (tr) {
        var select = tr.find('select[data-name="AnimalProductCodeUI"]');
        var rownum = tr.data('rownum');
        var productCodeId = select.val();
        var log1 = '第' + rownum + '列：請重新選擇畜禽代碼。' + '<br>';
        var con1 = productCodeId == -1;
        var target = select.closest('td');
        Helper.LogHandler(con1, AnimalMarketingHelper.Alert04, target, log1, 'bg-danger');

        var productCode = select.find('option:selected').data('code');
        var con2 = $.inArray(productCode, ['J01', 'J03', 'H02']) != -1;
        var log2 = '第' + rownum + '列：畜禽產品為「泌乳牛」、「不泌乳牛」或「泌乳羊」者，請詳加確認販售之產品是否為牛乳或羊乳，因而造成錯填產品之情形。' + '<br>';
        Helper.LogHandler(con2, AnimalMarketingHelper.Alert18, target, log2, 'bg-info');
    },
    CheckRatio: function (tr) {
        var input = tr.find('.marketingRatio input');
        var rownum = tr.data('rownum');
        var value = input.val();
        var log = '第' + rownum + '列：占銷售額比例請輸入介於0至100之間的整數。' + '<br>';
        var con = !Helper.NumberValidate(value);
        var target = input.closest('td');
        Helper.LogHandler(con, AnimalMarketingHelper.Alert04, target, log, 'bg-danger');
        return !con;
    },
    CheckRatioSum: function () {
        var log = '銷售額比例加總應為100。' + '<br>';
        var sum = AnimalMarketingHelper.GetRatioSum();
        var con = $.inArray(sum, [0, 100]) == -1;
        Helper.LogHandler(con, AnimalMarketingHelper.Alert04, null, log);
    },
    GetRatioSum: function () {
        var sum = 0;
        var inputs = $('#AnimalMarketing .marketingRatio input');
        inputs.each(function () {
            sum += parseInt($(this).val());
        });
        return sum;
    },
    Reset: function () {
        $('#AnimalMarketing').html('');
        if (this.Alert04) { this.Alert04.reset(); }
        if (this.Alert18) { this.Alert18.reset(); }
    },
    Alert04: null,
    Alert18: null,
    UI: '\
        <tr>\
            <th scope="row"></th>\
            <td></div></td>\
            <td><div class="float-label-control"><input type="text" style="max-width:100px;" class="form-control empty"></div></td>\
            <td></td>\
        </tr>\
        ',
    AdderUI: '\
            <form>\
                <div class="form-group">\
                  <label class="col-form-label">畜禽產品代碼</label>\
                  <div class="productCodeId"></div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">銷售額比例</label>\
                  <div class="marketingRatio">\
                    <input class="form-control" type="text">\
                  </div>\
                </div>\
            </form>\
        '
}
var AllMarketingHelper = {
    Init: function (obj) {
        if (!this.Alert05) {
            this.Alert05 = new Helper.Alert($('#Alert05'));
        }
        if (!this.Alert15) {
            this.Alert15 = new Helper.Alert($('#Alert15'));
        }
        for (var i in obj) {
            $('#AllMarketing input[data-markettypeid="' + obj[i].marketTypeId + '"][data-incomerangecodeid="' + obj[i].incomeRangeCodeId + '"]')
                .attr('data-source', 'AllMarketing')
                .attr('data-index', i)
                .prop('checked', true);
        }
        if (obj.length > 0) {
            this.CheckInput();
            this.CheckCropOver300();            
            this.Alert05.autocall();
            this.Alert15.autocall();
        }
        this.BindEvent();
    }
    , BindEvent: function () {
        $('#AllMarketing input').click(function () {
            var $box = $(this);
            var name = $box.data('name');
            if ($box.is(":checked")) {
                var group = "input[data-name='" + name + "']";
                $(group).prop("checked", false);
                $box.prop("checked", true);
            } else {
                $box.prop("checked", false);
            }

            AllMarketingHelper.CheckInput();
            if ($(this).data('name') == '農產品(含生產及加工)') {
                AllMarketingHelper.CheckCropOver300();
                MultiTableExamine.CheckCrop_Animal_Marketing.Check_Crop();
                MultiTableExamine.CheckCrop_Animal_Business();
            }
            if ($(this).data('name') == '畜禽產品(含生產及加工)') {
                MultiTableExamine.CheckCrop_Animal_Marketing.Check_Animal();
                MultiTableExamine.CheckCrop_Animal_Business();
            }
            if ($(this).data('name') == '休閒、餐飲及相關事業') {
                MultiTableExamine.CheckBusiness_Marketing();
            }
            if ($(this).data('name') == '受託提供農事及畜牧服務') {
                MultiTableExamine.CheckMarketing_Popuation();
            }

            AllMarketingHelper.Alert05.autocall();
            //update...
            var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
            baseFarmer.AllMarketing = [];
            $('#AllMarketing input').each(function () {
                if ($(this).is(':checked')) {
                    var allMarketing = {
                        baseFarmerId: baseFarmer.id,
                        incomeRangeCodeId: $(this).data('incomerangecodeid'),
                        marketTypeId: $(this).data('markettypeid')
                    }
                    baseFarmer.AllMarketing.push(allMarketing);
                }
            });
        });
    },
    CheckInput: function () {
        var all_marketing_checked = $('#AllMarketing input[data-name="銷售總金額"]:checked').length > 0;
        var other_checked = $('#AllMarketing input[data-name!="銷售總金額"]:checked').length > 0;

        var con00 = (all_marketing_checked && !other_checked) || (!all_marketing_checked && other_checked);
        var log00 = '銷售額總計與多項產品銷售收入不得漏填任一項。' + '<br>';

        var con01 = !all_marketing_checked && !other_checked;
        var log01 = '全年銷售額不得漏填。' + '<br>';

        var con02 = $('#AllMarketing input[data-name="銷售總金額"][data-incomerangecodeid="1"]').prop('checked');
        var log02 = '銷售額總計未滿20萬元者，應於附記欄加註原因。' + '<br>';

        Helper.LogHandler(con00, AllMarketingHelper.Alert05, null, log00);
        Helper.LogHandler(con01, AllMarketingHelper.Alert05, null, log01);
        Helper.LogHandler(con02, AllMarketingHelper.Alert15, null, log02);

        var allowPass = con00 || con01;
        AllMarketingHelper.CheckIncomeSum(allowPass);
    },
    CheckCropOver300: function () {
        $('#AllMarketing input').closest('td').removeClass('bg-info');
        var checkedCropInput = $('#AllMarketing input[data-name="農產品(含生產及加工)"]:checked');
        var log = '農產品全年銷售額300萬元以上，請再次確認。' + '<br>';
        var con = checkedCropInput.length > 0 && parseInt(checkedCropInput.data('incomerangecodemin')) >= 300;
        if (con) {
            checkedCropInput.closest('td').addClass('bg-info');
        }
        Helper.LogHandler(con, AllMarketingHelper.Alert15, null, log);
    },
    CheckIncomeSum: function (allowPass) {
        var log = '銷售額總計勾選之區間，應與各類別區間加總相對應。' + '<br>';
        var input_sum = $('#AllMarketing input[data-markettypeid=5]:checked');
        var input_sum_min = input_sum.data('incomerangecodemin');
        var input_sum_max = input_sum.data('incomerangecodemax');
        var input_counted_min = 0;
        var input_counted_max = 0;
        for (var i in Components.MarketType) {
            if (Components.MarketType[i].id != 5) {
                var input_checked = $('#AllMarketing input[data-markettypeid=' + Components.MarketType[i].id + ']:checked');
                if (input_checked.length > 0) {
                    input_counted_min += parseInt(input_checked.data('incomerangecodemin'));
                    input_counted_max += parseInt(input_checked.data('incomerangecodemax'));
                }
            }
        }
        var con = input_counted_max <= input_sum_min || input_counted_min > input_sum_max;
        var target = $('#AllMarketing input[data-markettypeid=5]:eq(0)').closest('tr');
        if (allowPass) {
            con = false;
        }
        Helper.LogHandler(con, AllMarketingHelper.Alert05, target, log, 'bg-danger');
    },
    Alert05: null,
    Alert15: null,
    Reset: function () {
        $('#AllMarketing input').each(function () {
            $(this).prop('checked', false);
        });
        if (this.Alert05) { this.Alert05.reset(); }
        if (this.Alert15) { this.Alert15.reset(); }
    }
}
var PopulationNumberHelper = {
    Init: function (obj) {
        this.Alert = new Helper.Alert($('#Alert06'));

        tr_under15 = $('#PopulationNumber #PopulationNumber_under15');
        tr_under15.find('td:eq(0)').html($(InputUI)).find('input').val(obj[0].under15Men + obj[0].under15Women).attr('disabled', true);
        tr_under15.find('td:eq(1)').html($(InputUI)).find('input')
            .attr('data-source', 'PopulationNumber')
            .attr('data-key', 'under15Men')
            .attr('data-name', '未滿15歲男性')
            .val(obj[0].under15Men);
        tr_under15.find('td:eq(2)').html($(InputUI)).find('input')
            .attr('data-source', 'PopulationNumber')
            .attr('data-key', 'under15Women')
            .attr('data-name', '未滿15歲女性')
            .val(obj[0].under15Women);

        tr_over15 = $('#PopulationNumber #PopulationNumber_over15');
        tr_over15.find('td:eq(0)').html($(InputUI)).find('input').val(obj[0].over15Men + obj[0].over15Women).attr('disabled', true);
        tr_over15.find('td:eq(1)').html($(InputUI)).find('input')
            .attr('data-source', 'PopulationNumber')
            .attr('data-key', 'over15Men')
            .attr('data-name', '滿15歲以上男性')
            .val(obj[0].over15Men);
        tr_over15.find('td:eq(2)').html($(InputUI)).find('input')
            .attr('data-source', 'PopulationNumber')
            .attr('data-key', 'over15Women')
            .attr('data-name', '滿15歲以上女性')
            .val(obj[0].over15Women);

        $('#PopulationNumber input[data-source="PopulationNumber"]').each(function () {
            PopulationNumberHelper.CheckInput($(this));
            PopulationNumberHelper.BindInput($(this));
        });

        this.Alert.autocall();
    },
    BindInput: function (input) {
        input.change(function () {
            var tr = $(this).closest('tr');
            var key = input.data('key');
            var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
            tr.find('td:eq(0) input').val(parseInt(tr.find('td:eq(1) input').val()) + parseInt(tr.find('td:eq(2) input').val()));
            if (PopulationNumberHelper.CheckInput(input)) {
                baseFarmer.PopulationNumber[0][key] = parseInt(input.val());
            }
            if (key == 'over15Men' || key == 'over15Women') {
                MultiTableExamine.CheckPopulationNumber_Population();
            }
            PopulationNumberHelper.Alert.autocall();
        });
    },
    CheckInput: function (input) {
        var log = input.data('name') + '請輸入不小於0的整數。' + '<br>';
        var con = !Helper.NumberValidate(input.val());
        var target = input.closest('td');
        Helper.LogHandler(con, PopulationNumberHelper.Alert, target, log, 'bg-danger');
        return !con;
    },
    Reset: function () {
        if (this.Alert) { this.Alert.reset(); }
        $('#PopulationNumber input').remove();
    },
    Alert: null
}
var PopulationHelper = {
    Init: function (obj, index) {
        if (!this.Alert07) {
            this.Alert07 = new Helper.Alert($('#Alert07'));
        }
        if (!this.Alert19) {
            this.Alert19 = new Helper.Alert($('#Alert19'));
            this.Alert19.message += '請檢視「全年從事自家農牧業工作日數」是否有換算，並確認工作日數與產品及規模之合理性。' + '<br>';
        }
        for (var i in obj) {
            var rownum = $('#Population .PopulationObj').length + 1;
            tr = $('<tr class="PopulationObj">')
                .attr('data-id', obj[i].id)
                .attr('data-basefarmerindex', index).attr('data-index', i);
            /* rownum */
            var td_rownum = $('<td>');
            td_rownum
                .addClass('rownum')
                .html(rownum)
            tr.append(td_rownum);
            /* relationshipCodeId */
            var td_relationship = $('<td>');
            td_relationship
                .addClass('relationshipCodeId')
                .attr('data-name', '與戶長關係')
                .attr('data-source', 'Population')
                .attr('data-id', obj[i].id)
                .attr('data-key', 'relationshipCodeId')
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-basefarmerindex', index)
                .html(RelationshipCodeUI.clone()).find('option[value="' + obj[i].relationshipCodeId + '"]').attr('selected', true);
            this.CheckSelect(td_relationship.find('select'));
            this.BindEvent.BindSelect(td_relationship.find('select'));
            tr.append(td_relationship);

            /* sex */
            var td_sex = $('<td>');
            td_sex
                .addClass('sex')
                .attr('data-source', 'Population')
                .attr('data-name', '性別')
                .attr('data-id', obj[i].id)
                .attr('data-key', 'sex')
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-basefarmerindex', index)
                .html($(PopulationHelper.SexUI)).find('option[value="' + obj[i].sex + '"]').attr('selected', true);
            this.CheckSelect(td_sex.find('select'));
            this.BindEvent.BindSelect(td_sex.find('select'));
            tr.append(td_sex);

            /* birthyear */
            var td_birthyear = $('<td>');
            td_birthyear
                .addClass('birthYear')
                .attr('data-source', 'Population')
                .attr('data-id', obj[i].id)
                .attr('data-key', 'birthYear')
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-basefarmerindex', index)
                .html($(InputUI)).find('input')
                    .val(obj[i].birthYear)
                    .attr('style', 'max-width:60px;');

            this.BindEvent.BindInput(td_birthyear.find('input'));
            this.CheckInput(td_birthyear.find('input'));
            this.CheckAge(td_birthyear.find('input'));
            tr.append(td_birthyear);

            /* education */
            var td_education = $('<td>');
            td_education
                .addClass('educationLevelCodeId')
                .attr('data-name', '教育程度')
                .attr('data-source', 'Population')
                .attr('data-id', obj[i].id)
                .attr('data-key', 'educationLevelCodeId')
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-basefarmerindex', index)
                .html(EducationLevelCodeUI.clone()).find('option[value="' + obj[i].educationLevelCodeId + '"]').attr('selected', true);
            this.CheckSelect(td_education.find('select'));
            this.BindEvent.BindSelect(td_education.find('select'));
            tr.append(td_education);

            /* workday */
            var td_workday = $('<td>');
            td_workday
                .addClass('farmerWorkDayId')
                .attr('data-name', '從事自家農牧業工作日數')
                .attr('data-source', 'Population')
                .attr('data-id', obj[i].id)
                .attr('data-key', 'farmerWorkDayId')
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-basefarmerindex', index)
                .html(FarmerWorkDayUI.clone()).find('option[value="' + obj[i].farmerWorkDayId + '"]').attr('selected', true);
            this.CheckSelect(td_workday.find('select'));
            this.BindEvent.BindSelect(td_workday.find('select'));
            tr.append(td_workday);

            /* lifestyle */
            var td_lifestyle = $('<td>');
            td_lifestyle
                .addClass('lifeStyleCodeId')
                .attr('data-name', '主要生活型態')
                .attr('data-source', 'Population')
                .attr('data-id', obj[i].id)
                .attr('data-key', 'lifeStyleCodeId')
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-basefarmerindex', index)
                .html(LifeStyleCodeUI.clone()).find('option[value="' + obj[i].lifeStyleCodeId + '"]').attr('selected', true);
            this.CheckSelect(td_lifestyle.find('select'));
            this.BindEvent.BindSelect(td_lifestyle.find('select'));
            tr.append(td_lifestyle);

            /* otherwork */
            var td_otherwork = $('<td>');
            td_otherwork.addClass('otherFarmWorkCodeId')
                .attr('data-name', '從事農牧業外工作')
                .attr('data-source', 'Population')
                .attr('data-id', obj[i].id)
                .attr('data-key', 'otherFarmWorkCodeId')
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-basefarmerindex', index)
                .html(OtherFarmWorkCodeUI.clone()).find('option[value="' + obj[i].otherFarmWorkCodeId + '"]').attr('selected', true);
            this.CheckSelect(td_otherwork.find('select'));
            this.BindEvent.BindSelect(td_otherwork.find('select'));
            tr.append(td_otherwork);

            /* delete */
            var td_delete = $('<td>');
            td_delete
                .addClass('deletePopulation')
                .html($(DeleteButtonUI));
            this.BindEvent.BindButton(td_delete.find('button'));
            tr.append(td_delete);

            $('#Population tbody').append(tr);

            this.CheckAgeOrder(td_relationship.find('select'));
            this.CheckAgeOrder(td_birthyear.find('input'));
            this.CheckEducation(td_education.find('select'));
            this.CheckEducation(td_birthyear.find('input'));
            this.CheckLifestyle_FarmerWorkDay(td_workday.find('select'));
            this.CheckFarmerWorkDay(td_workday.find('select'));
            this.CheckLifestyle_FarmerWorkDay(td_lifestyle.find('select'));
            this.CheckOtherFarmerWork(td_otherwork.find('select'));
            this.CheckOtherFarmerWork(td_lifestyle.find('select'));
            this.CheckLifestyle_OtherFarmerWork(td_lifestyle.find('select'));
            this.CheckLifestyle_OtherFarmerWork(td_otherwork.find('select'));

        }
        if (obj.length > 0) {
            this.CheckDuplicate();
            this.CheckAtLeastOneFarmer();
            this.CheckWorkDayOver150();
            MultiTableExamine.CheckPopulationNumber_Population();
            MultiTableExamine.CheckCrop_Population();
        }
    },
    BindEvent: {
        BindInput: function (input) {
            input.change(function () {
                if (PopulationHelper.CheckInput(input)) {
                    var td = input.closest('td');
                    var index = td.data('index');
                    var key = td.data('key');
                    var baseFarmerIndex = td.data('basefarmerindex');
                    var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
                    baseFarmer.Population[index][key] = input.val();
                }
                PopulationHelper.CheckAge(input);
                PopulationHelper.CheckAgeOrder(input);
                PopulationHelper.CheckEducation(input);
            });
        },
        BindSelect: function (select) {
            select.change(function (event) {
                //update...
                var td = select.closest('td');
                var index = td.data('index');
                var value = select.val() == '-1' ? null : select.val();
                var key = td.data('key');
                var baseFarmerIndex = td.data('basefarmerindex');
                var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
                baseFarmer.Population[index][key] = value;

                PopulationHelper.CheckSelect(select);
                switch (select.data('name')) {
                    case "RelationshipCodeUI":
                        PopulationHelper.CheckDuplicate();
                        PopulationHelper.CheckAgeOrder(select);
                        break;
                    case "EducationLevelCodeUI":
                        PopulationHelper.CheckEducation(select);
                        break;
                    case "FarmerWorkDayUI":
                        PopulationHelper.CheckLifestyle_FarmerWorkDay(select);
                        PopulationHelper.CheckFarmerWorkDay(select);
                        PopulationHelper.CheckWorkDayOver150();
                        PopulationHelper.CheckAtLeastOneFarmer();
                        MultiTableExamine.CheckCrop_Population();
                        break;
                    case "LifeStyleCodeUI":
                        PopulationHelper.CheckLifestyle_FarmerWorkDay(select);
                        PopulationHelper.CheckFarmerWorkDay(select);
                        PopulationHelper.CheckOtherFarmerWork(select);
                        PopulationHelper.CheckLifestyle_OtherFarmerWork(select);
                        MultiTableExamine.CheckCrop_Population();
                        MultiTableExamine.CheckMarketing_Popuation();                        
                        break;
                    case "OtherFarmWorkCodeUI":
                        PopulationHelper.CheckOtherFarmerWork(select);
                        PopulationHelper.CheckLifestyle_OtherFarmerWork(select);
                        break;
                    case "SexUI":
                        MultiTableExamine.CheckPopulationNumber_Population();
                }
            });
        },
        BindButton: function (button) {
            button.click(function () {
                var tr = button.closest('tr');
                var index = tr.data('index');
                var baseFarmerIndex = tr.data('basefarmerindex');
                var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
                baseFarmer.Population.splice(index, 1);
                PopulationHelper.Reset();
                for (var i in DataCopy.FarmerList) {
                    PopulationHelper.Init(DataCopy.FarmerList[i].BaseFarmer.Population, i);
                }
                // log correlate table also re-init
                PopulationNumberHelper.Init(DataCopy.FarmerList[FirstPageIndex].BaseFarmer.PopulationNumber);

                MultiTableExamine.Direct();
            });
        }
    },
    Reset: function () {
        if (this.Alert07) { this.Alert07.reset(); }
        $('#Population .PopulationObj').remove();
    },
    CheckInput: function (input) {
        var target = input.closest('td');
        var log = '戶內人口代號' + target.data('rownum') + '：出生年次請輸入不小於0的整數。' + '<br>';
        var con = !Helper.NumberValidate(input.val());
        Helper.LogHandler(con, PopulationHelper.Alert07, target, log, 'bg-danger');
        return !con;
    },
    CheckSelect: function (select) {
        var target = select.closest('td');
        var log = '戶內人口代號' + target.data('rownum') + '：' + target.data('name') + '請重新選擇。' + '<br>';
        var con = select.val() == -1;
        Helper.LogHandler(con, PopulationHelper.Alert07, target, log, 'bg-danger');
    },
    CheckDuplicate: function () {
        var log_household = '戶長至少為1個且僅能1個。' + '<br>';
        var log_wife = '戶長配偶(與戶長關係代號2)僅能1個或無。' + '<br>';
        var count_household = 0;
        var count_wife = 0
        var target = [];
        $('#Population .relationshipCodeId select').each(function () {
            if ($(this).val() == '1') { count_household++; }
            if ($(this).val() == '2') { count_wife++; }
        });

        if (count_household > 1 || count_household == 0) {
            Helper.LogHandler(true, PopulationHelper.Alert07, null, log_household);
        }
        else if (count_wife > 1) {
            Helper.LogHandler(true, PopulationHelper.Alert07, null, log_wife);
        } else {
            Helper.LogHandler(false, PopulationHelper.Alert07, null, log_household);
            Helper.LogHandler(false, PopulationHelper.Alert07, null, log_wife);
        }
    },
    CheckAge: function (input) {
        var target = input.closest('td');
        var year = new Date().getFullYear() - 1911;
        var log = '戶內人口代號' + target.data('rownum') + '：出生年次應早於民國' + (year - 15 - 1) + '年(實足年齡滿15歲)。' + '<br>';
        var con = parseInt(input.val()) > (year - 15 - 1);
        Helper.LogHandler(con, PopulationHelper.Alert07, null, log);

        var log
    },
    CheckAgeOrder: function (obj) {
        var target = obj.closest('td');

        var this_id = target.data('id');
        var this_obj = PopulationHelper.GetPopulation(this_id);
        //this
        var this_relation_value = this_obj.RelationshipCodeUI.val();
        var this_birth_value = this_obj.BirthYearUI.val();
        var household_relation = '1';
        var children_relation_array = ['5', '6'];
        var grandparents_relation_array = ['3', '7'];
        var type;
        var log = '戶內人口代號' + target.data('rownum') + '：出生年次應與戶長相稱。' + '<br>';
        // see which: household vs children or household vs elder

        if (this_relation_value == household_relation) {
            type = 'check-both';
        } else if ($.inArray(this_relation_value, children_relation_array) != -1) {
            type = 'check-younger';
        } else if ($.inArray(this_relation_value, grandparents_relation_array) != -1) {
            type = 'check-order';
        } else {
            Helper.LogHandler(false, PopulationHelper.Alert07, null, log);
        }
        //household                   
        var household_relation = $.grep($('#Population .relationshipCodeId select'), function (e) {
            return ($(e).val() == '1')
        });
        //if household not selected, clear all related log
        if (household_relation.length < 1) {
            Helper.LogHandler(false, PopulationHelper.Alert07, null, /戶內人口代號\d：出生年次應與戶長相稱。<\/br>/);
            return;
        }
        var household_id = $(household_relation).closest('td').data('id');
        var household_birth_value = $('td.birthYear[data-id=' + household_id + '] input').val();

        switch (type) {
            case 'check-younger':
                var con = parseInt(this_birth_value) < parseInt(household_birth_value);
                Helper.LogHandler(con, PopulationHelper.Alert07, null, log);
                break;
            case 'check-order':
                var con = parseInt(this_birth_value) > parseInt(household_birth_value);
                Helper.LogHandler(con, PopulationHelper.Alert07, null, log);
                break;
            case 'check-both':
                var children_relation = $.grep($('#Population .relationshipCodeId select'), function (e) {
                    return ($.inArray($(e).val(), children_relation_array) != -1)
                });
                for (var i = 0; i < children_relation.length; i++) {
                    PopulationHelper.CheckAgeOrder($(children_relation[i]));
                }
                var grandparents_relation = $.grep($('#Population .relationshipCodeId select'), function (e) {
                    return ($.inArray($(e).val(), grandparents_relation_array) != -1)
                });
                for (var i = 0; i < grandparents_relation.length; i++) {
                    PopulationHelper.CheckAgeOrder($(grandparents_relation[i]));
                }
        }
    },
    CheckEducation: function (obj) {
        var target = obj.closest('td');
        var log = '戶內人口代號' + target.data('rownum') + '：教育程度與出生年次不符。' + '<br>';
        var this_id = target.data('id');
        var this_obj = PopulationHelper.GetPopulation(this_id);

        var this_education_value = this_obj.EducationLevelCodeUI.val();
        if (this_education_value == -1) {
            Helper.LogHandler(false, PopulationHelper.Alert07, null, log);
            return;
        }
        var this_birth = $('td.birthYear[data-id=' + this_id + '] input');
        var this_education_age = this_obj.EducationLevelCodeUI.find('option:selected').data('age');
        var year = new Date().getFullYear() - 1911;
        var birth_year = parseInt(this_birth.val());
        var con = (birth_year > (year - this_education_age)) && (birth_year < year);
        Helper.LogHandler(con, PopulationHelper.Alert07, null, log);
    },
    CheckLifestyle_FarmerWorkDay: function (select) {
        var target = select.closest('td');
        var log00 = '戶內人口代號' + target.data('rownum') + '：主要生活型態勾選「料理家務、育兒、學生或其他」，則其全年從事自家農牧工作日數應小於「180日」。' + '<br>';
        var log01 = '戶內人口代號' + target.data('rownum') + '：自營農牧業工作日數勾選「無」，則主要生活型態不能勾選自營農牧業工作。' + '<br>';
        var this_id = target.data('id');
        var this_obj = PopulationHelper.GetPopulation(this_id);

        var lifestyle_array = ['6', '7', '8'];
        var con0 = parseInt(this_obj.FarmerWorkDayUI.val()) > 6 && $.inArray(this_obj.LifeStyleCodeUI.val(), lifestyle_array) != -1;
        var con1 = this_obj.FarmerWorkDayUI.val() == '1' && this_obj.LifeStyleCodeUI.val() == '1';

        Helper.LogHandler(con0, PopulationHelper.Alert07, null, log00);
        Helper.LogHandler(con1, PopulationHelper.Alert07, null, log01);
    },
    CheckLifestyle_OtherFarmerWork: function (obj) {
        var tr = obj.closest('tr');
        var lifestyle_array = ['1', '2', '3'];
        var lifestyle = tr.find('.lifeStyleCodeId select');
        var otherfarmerwork = tr.find('.otherFarmWorkCodeId select');
        var con = $.inArray(lifestyle.val(), lifestyle_array) != -1 && otherfarmerwork.val() == '3';
        var log = '戶內人口代號' + obj.closest('td').data('rownum') + '：若主要生活型態勾選「自營農牧業工作」、「受僱農牧業工作」或「受託提供農事及畜牧服務」，請確認勾選「農牧以外時間為多」之合理性。' + '<br>';
        Helper.LogHandler(con, PopulationHelper.Alert19, null, log);
    },
    CheckAtLeastOneFarmer: function () {
        var log = '至少應有1人從事自家農牧工作日數。' + '<br>';
        var options = $.grep($('#Population .farmerWorkDayId select'), function (e) {
            return ($(e).val() != '1')
        });
        con = options.length == 0;
        Helper.LogHandler(con, PopulationHelper.Alert07, null, log);
    },
    CheckFarmerWorkDay: function (select) {
        var target = select.closest('td');
        var log = '戶內人口代號' + target.data('rownum') + '：「全年從事自家農牧業工作日數」大於或等於「180日」，則生活型態應勾選「自營農牧業工作」。' + '<br>';
        var this_id = target.data('id');
        var this_obj = PopulationHelper.GetPopulation(this_id);
        var con = parseInt(this_obj.FarmerWorkDayUI.val()) > 6 && this_obj.LifeStyleCodeUI.val() != '1';
        Helper.LogHandler(con, PopulationHelper.Alert07, null, log);
    },
    CheckOtherFarmerWork: function (obj) {
        var tr = obj.closest('tr');
        var target = obj.closest('td');
        var con00 = $.inArray(tr.find('.lifeStyleCodeId select').val(), ['4', '5']) != -1;
        var con01 = tr.find('.otherFarmWorkCodeId select').val() == '1';
        var log = '戶內人口代號' + target.data('rownum') + '：主要生活型態勾選「自營農牧業外工作」或「受僱農牧業外工作」，則應有從事農牧業外工作。' + '<br>';
        var con = con00 && con01;
        Helper.LogHandler(con, PopulationHelper.Alert07, null, log);
    },
    CheckWorkDayOver150: function (select) {
        var con = false;
        var log = '全年從事自家農牧業工作日數達150日以上，請確認經營類型及規模之合理性。' + '<br>';
        var target = $('#Population .farmerWorkDayId select');
        target.closest('td').removeClass('bg-info');
        target.each(function () {
            var select = $(this);
            var value = select.val();
            if (parseInt(value) >= 6) {
                con = true;
                $(this).closest('td').addClass('bg-info');
            }
        });
        Helper.LogHandler(con, PopulationHelper.Alert19, null, log);
    },
    GetPopulation: function (id) {
        var population = {
            RelationshipCodeUI: $('td.relationshipCodeId[data-id=' + id + '] select'),
            EducationLevelCodeUI: $('td.educationLevelCodeId[data-id=' + id + '] select'),
            SexUI: $('td.sex[data-id=' + id + '] select'),
            FarmerWorkDayUI: $('td.farmerWorkDayId[data-id=' + id + '] select'),
            LifeStyleCodeUI: $('td.lifeStyleCodeId[data-id=' + id + '] select'),
            OtherFarmWorkCodeUI: $('td.otherFarmWorkCodeId[data-id=' + id + '] select'),
            BirthYearUI: $('td.birthYear[data-id=' + id + '] input')
        }
        return population;
    },
    Alert07: null,
    Alert19: null,
    SexUI: '\
            <select class="form-control" data-name="SexUI">\
                <option value="-1">--請選擇--</option>\
                <option value="男">1.男</option>\
                <option value="女">2.女</option>\
            </select>\
        ',
    AdderUI: '\
            <form>\
                <div class="form-group">\
                  <label class="col-form-label">與戶長之關係</label>\
                  <div class="relationshipCodeId"></div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">性別</label>\
                  <div class="sex"></div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">出生年次(民國)</label>\
                  <div class="birthYear">\
                    <input class="form-control" type="text">\
                  </div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">教育程度別</label>\
                  <div class="educationLevelCodeId"></div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">全年從事自家農牧業工作日數</label>\
                  <div class="farmerWorkDayId"></div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">全年主要生活型態</label>\
                  <div class="lifeStyleCodeId"></div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">是否有從事農牧業外工作</label>\
                  <div class="otherFarmWorkCodeId"></div>\
                </div>\
            </form>\
        '
}
var LongTermForHireHelper = {
    Alert: null,
    Init: function (obj, index) {
        this.Alert = new Helper.Alert($('#Alert08'));
        for (var i in obj) {
            var tr = $('<tr class="LongTermForHireObj">')
                .attr('data-id', obj[i].id)
                .attr('data-index', i)
                .attr('data-basefarmerindex', index);

            var rownum = $('#LongTermForHire .LongTermForHireObj').length + 1;

            /*rownum*/
            var td_rownum = $('<td>');
            td_rownum
                .addClass('rownum')
                .html(rownum)
            tr.append(td_rownum);
            /* workerTypeCodeId */
            var td_workertype = $('<td>');
            var worktype = $.grep(Components.WorkerTypeCode, function (e) {
                return (e.id == obj[i].workerTypeCodeId)
            });
            td_workertype
                .attr('data-source', 'WorkerTypeCodeId')
                .attr('data-id', obj[i].id)
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-name', '受僱農牧業工作類型')
                .attr('data-basefarmerindex', index)
                .html(WorkerTypeCodeUI.clone())
                .find('option[value="' + obj[i].workerTypeCodeId + '"]').prop('selected', true);
            this.CheckSelect(td_workertype.find('select'));
            this.BindEvent.BindSelect(td_workertype.find('select'));
            tr.append(td_workertype);

            /* count */
            var count = 0;
            for (var j in obj[i].NumberWorkers) {
                count += parseInt(obj[i].NumberWorkers[j].value);
            }
            var td_count = $('<td>');
            td_count
                .addClass('count')
                .attr('data-source', 'LongTermForHire')
                .attr('data-id', obj[i].id)
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-basefarmerindex', index)
                .html($(InputUI))
                .find('input').attr('disabled', true).val(count);
            tr.append(td_count);

            /* avgSalary */
            var td_salary = $('<td>');
            td_salary.addClass('avgSalary')
                .attr('data-source', 'LongTermForHire')
                .attr('data-id', obj[i].id)
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-basefarmerindex', index)
                .html($(InputUI))
                .find('input')
                .attr('data-name', '平均月薪')
                .val(obj[i].avgSalary);
            LongTermForHireHelper.CheckInput(td_salary.find('input'));
            LongTermForHireHelper.BindEvent.BindInput(td_salary.find('input'));
            tr.append(td_salary);

            /* ageScopeId */
            for (var j in obj[i].NumberWorkers) {
                var ageScope = $.grep(Components.AgeScope, function (e) {
                    return e.id == obj[i].NumberWorkers[j].ageScopeId
                });

                var td_age = $('<td>');
                td_age
                    .addClass('ageScopeId')
                    .attr('data-source', 'LongTermForHire')
                    .attr('data-id', obj[i].id)
                    .attr('data-index', i)
                    .attr('data-rownum', rownum)
                    .attr('data-basefarmerindex', index)
                    .html($(InputUI)).find('input')
                        .attr('data-source', 'NumberWorkers')
                        .attr('data-name', '平均年齡' + ageScope[0].name)
                        .attr('data-numberworkersindex', j)
                        .val(obj[i].NumberWorkers[j].value);
                LongTermForHireHelper.CheckInput(td_age.find('input'));
                LongTermForHireHelper.BindEvent.BindInput(td_age.find('input'));
                tr.append(td_age);
            }

            /* delete */
            var td_delete = $('<td>');
            td_delete
                .addClass('deleteLongTermForHire')
                .html($(DeleteButtonUI));
            this.BindEvent.BindButton(td_delete.find('button'));
            tr.append(td_delete);

            $('#ShortTermForLack tbody').append(tr);

            $('#LongTermForHire tbody').append(tr);
        }
    },
    Reset: function () {
        $('#LongTermForHire .LongTermForHireObj').remove();
        if (this.Alert) { this.Alert.reset(); }
    },
    BindEvent: {
        BindInput: function (input) {
            input.change(function () {

                if (LongTermForHireHelper.CheckInput(input)) {
                    var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
                    var index = input.closest('td').data('index');
                    var td = input.closest('td');
                    if (td.hasClass('ageScopeId')) {
                        var numberWorkersIndex = input.data('numberworkersindex');
                        baseFarmer.LongTermForHire[index].NumberWorkers[numberWorkersIndex].value = parseInt(input.val());
                    }
                    if (td.hasClass('avgSalary')) {
                        baseFarmer.LongTermForHire[index].avgSalary = parseInt(input.val());
                    }
                }
                if (input.data('source') == 'NumberWorkers') {
                    LongTermForHireHelper.GetAgeScopeSum(input);
                    BaseFarmerHelper.CheckIsHire();
                }
            });
        },
        BindSelect: function (select) {
            select.change(function (event) {
                //update...
                var td = select.closest('td');
                var index = td.data('index');
                var value = select.val() == '-1' ? null : select.val();
                var baseFarmerIndex = td.data('basefarmerindex');
                var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
                baseFarmer.LongTermForHire[index].workerTypeCodeId = value;

                LongTermForHireHelper.CheckSelect(select);
            });
        },
        BindButton: function (button) {
            button.click(function () {
                var tr = button.closest('tr');
                var index = tr.data('index');
                var baseFarmerIndex = tr.data('basefarmerindex');
                var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
                baseFarmer.LongTermForHire.splice(index, 1);
                LongTermForHireHelper.Reset();
                for (var i in DataCopy.FarmerList) {
                    LongTermForHireHelper.Init(DataCopy.FarmerList[i].BaseFarmer.LongTermForHire, i);
                }
            });
        }
    },
    CheckInput: function (input) {
        var target = input.closest('td');
        var log = '第' + target.data('rownum') + '列：' + input.data('name') + '請輸入不小於0的整數。' + '<br>';
        var con = !Helper.NumberValidate(input.val());
        Helper.LogHandler(con, LongTermForHireHelper.Alert, target, log, 'bg-danger');
        return !con;
    },
    CheckSelect: function (select) {
        var target = select.closest('td');
        var log = '第' + target.data('rownum') + '列：' + target.data('name') + '請重新選擇。' + '<br>';
        var con = select.val() == -1;
        Helper.LogHandler(con, LongTermForHireHelper.Alert, target, log, 'bg-danger');
    },
    GetAgeScopeSum: function (input) {
        var tr = input.closest('.LongTermForHireObj');
        var count = 0;
        var inputs = tr.find('.ageScopeId input');
        for (var i = 0; i < inputs.length; i++) {
            count += parseInt(inputs[i].value);
        }
        input.closest('tr').find('.count input').val(count);
    },
    ResetObject: function (obj) {
        for (var i in obj) {
            obj[i].avgSalary = 0;
            for (var j in obj[i].NumberWorkers) {
                obj[i].NumberWorkers[j].value = 0;
            }
        }
    },
    AdderUI: '\
            <form>\
                <div class="form-group">\
                  <label class="col-form-label">受僱農牧業工作類型</label>\
                  <div class="workerTypeCodeId"></div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">平均月薪</label>\
                  <div class="avgSalary">\
                    <input class="form-control" type="text">\
                  </div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">44歲以下人數</label>\
                  <div class="ageScopeId" data-id="1">\
                    <input class="form-control" type="text">\
                  </div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">45~64歲人數</label>\
                  <div class="ageScopeId" data-id="1">\
                    <input class="form-control" type="text">\
                  </div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">65歲以上人數</label>\
                  <div class="ageScopeId" data-id="2">\
                    <input class="form-control" type="text">\
                  </div>\
                </div>\
            </form>\
        '
}
var ShortTermForHireHelper = {
    Alert09: null,
    Alert21: null,
    Init: function (obj) {
        this.Alert09 = new Helper.Alert($('#Alert09'));
        this.Alert21 = new Helper.Alert($('#Alert21'));
        //obj.sort(function (a, b) { return a.month - b.month });
        for (var i in obj) {

            var tr = $('<tr class="ShortTermForHireObj">')
                .attr('data-id', obj[i].id)
                .attr('data-index', i)
                .attr('data-month', obj[i].month);

            /* month */
            var month = obj[i].month;
            td_month = $('<td>').text(month);
            tr.append(td_month);

            /* count */
            var count = 0;
            for (var j in obj[i].NumberWorkers) {
                count += obj[i].NumberWorkers[j].value;
            }
            var td_count = $('<td>')
                .addClass('count')
                .attr('data-source', 'ShortTermForHire')
                .attr('data-id', obj[i].id)
                .html($(InputUI));
            td_count.find('input').attr('disabled', true).val(count);
            tr.append(td_count);

            /* ageScopeId */
            for (var j in obj[i].NumberWorkers) {
                var td_age = $('<td>');
                td_age
                    .addClass('ageScopeId')
                    .attr('data-source', 'ShortTermForHire')
                    .attr('data-id', obj[i].id)
                    .attr('data-index', i)
                    .html($(InputUI)).find('input')
                        .attr('data-source', 'NumberWorkers')
                        .attr('data-numberworkersindex', j)
                        .attr('data-name', '平均年齡')
                        .val(obj[i].NumberWorkers[j].value);
                ShortTermForHireHelper.CheckInput(td_age.find('input'));
                ShortTermForHireHelper.BindEvent.BindInput(td_age.find('input'));
                tr.append(td_age);
            }

            /* WorkType */
            var td_worktype = $('<td>');
            td_worktype
                .addClass('WorkType')
                .attr('data-source', 'ShortTermForHire')
                .attr('data-id', obj[i].id)
                .attr('data-index', i)
                .html(WorkerTypeCodeUI_Multi.clone());
            for (var j in obj[i].WorkType) {
                td_worktype.find('option[value="' + obj[i].WorkType[j].workerTypeCodeId + '"]').attr('selected', true);
            }
            td_worktype.find('.selectpicker').selectpicker('refresh');
            ShortTermForHireHelper.BindEvent.BindSelect(td_worktype.find('.selectpicker'));
            tr.append(td_worktype);


            /* avgSalaryForEveryDay */
            var td_salary = $('<td>');
            td_salary
                .addClass('avgSalaryForEveryday')
                .attr('data-source', 'ShortTermForHire')
                .attr('data-id', obj[i].id)
                .attr('data-index', i)
                .attr('data-name', '平均日薪')
                .html($(InputUI))
                .find('input').val(obj[i].avgSalaryForEveryday);
            ShortTermForHireHelper.CheckInput(td_salary.find('input'));
            ShortTermForHireHelper.BindEvent.BindInput(td_salary.find('input'));
            tr.append(td_salary);

            $('#ShortTermForHire tbody').append(tr);

            ShortTermForHireHelper.CheckWorkType_NumberWorker(td_age.find('input'));
            ShortTermForHireHelper.CheckWorkType_NumberWorker(td_worktype.find('.selectpicker'));
        }
        if (obj.length > 0) {
            this.CheckMoreThan6Months();
        }
    },
    BindEvent: {
        BindInput: function (input) {
            input.change(function () {
                if (ShortTermForHireHelper.CheckInput(input)) {
                    var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
                    var td = input.closest('td');
                    var index = td.data('index');
                    if (td.hasClass('ageScopeId')) {
                        var numberWorkersIndex = input.data('numberworkersindex');
                        baseFarmer.ShortTermForHire[index].NumberWorkers[numberWorkersIndex].value = parseInt(input.val());
                    }
                    if (td.hasClass('avgSalaryForEveryday')) {
                        baseFarmer.ShortTermForHire[index].avgSalaryForEveryday = parseInt(input.val());
                    }
                }
                if (input.data('source') == 'NumberWorkers') {
                    ShortTermForHireHelper.GetAgeScopeSum(input);
                    ShortTermForHireHelper.CheckWorkType_NumberWorker(input);
                    BaseFarmerHelper.CheckIsHire();
                }
                ShortTermForHireHelper.CheckMoreThan6Months();
            });
        },
        BindSelect: function (select) {
            select.change(function () {
                ShortTermForHireHelper.CheckWorkType_NumberWorker(select);
                ShortTermForHireHelper.CheckMoreThan6Months();
                //update WorkType
                var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
                var index = select.closest('td').data('index');
                var selected = select.find('option:selected');
                if (selected.length > 0) {
                    baseFarmer.ShortTermForHire[index].WorkType = []
                    selected.each(function () {
                        var worktype = {
                            shortTermForHireId: select.closest('tr').data('id'),
                            workerTypeCodeId: $(this).val()
                        }
                        baseFarmer.ShortTermForHire[index].WorkType.push(worktype);
                    });
                } else {
                    baseFarmer.ShortTermForHire[index].WorkType = [];
                }
            });
        }
    },
    GetAgeScopeSum: function (input) {
        var id = input.closest('.ageScopeId').data('id');
        var count = 0;
        var inputs = $('#ShortTermForHire').find('.ageScopeId[data-id="' + id + '"]').find('input');
        for (var i = 0; i < inputs.length; i++) {
            count += parseInt(inputs[i].value);
        }
        input.closest('tr').find('.count input').val(count);
    },
    CheckInput: function (input) {
        var target = input.closest('td');
        var log = input.closest('tr').data('month') + '月份之' + input.data('name') + '請輸入不小於0的整數。' + '<br>';
        var con = !Helper.NumberValidate(input.val());
        Helper.LogHandler(con, ShortTermForHireHelper.Alert09, target, log, 'bg-danger');
        return !con;
    },
    CheckWorkType_NumberWorker: function (obj) {
        var target = obj.closest('tr');
        var log = target.data('month') + '月份之平均年齡之人數及主要工作類型不得漏填任一列。' + '<br>';
        var count = target.find('.count input');
        var select = target.find('.WorkType select');
        var con00 = parseInt(count.val()) > 0 && select.find('option:selected').length == 0;
        var con01 = parseInt(count.val()) == 0 && select.find('option:selected').length > 0;
        Helper.LogHandler(con00 || con01, ShortTermForHireHelper.Alert09, target, log, 'bg-danger');
    },
    CheckMoreThan6Months: function () {
        var count = 0;
        $('#ShortTermForHire .ShortTermForHireObj').each(function () {
            var numberOfPeople = parseInt($(this).find('.count input').val());
            var workType = $(this).find('.WorkType option:selected');
            if (numberOfPeople > 0 && workType.length > 0) {
                count += 1;
            }
        });
        var con = count >= 6;
        var log = '若填列之月份超過6個月，應於附記欄加註臨時或季節性員工之僱用頻率。' + '<br>';
        Helper.LogHandler(con, ShortTermForHireHelper.Alert21, null, log);
    },
    Reset: function () {
        if (this.Alert09) { this.Alert09.reset(); }
        if (this.Alert21) { this.Alert21.reset(); }
        $('#ShortTermForHire .ShortTermForHireObj').remove();
    },
    ResetObject: function (obj) {
        for (var i in obj) {
            obj[i].avgSalaryForEveryday = 0;
            obj[i].WorkType = [];
            for (var j in obj[i].NumberWorkers) {
                obj[i].NumberWorkers[j].value = 0;
            }
        }
    }
}
var NoSalaryForHireHelper = {
    Init: function (obj) {
        this.Alert = new Helper.Alert($('#Alert10'));
        for (var i in obj) {
            var month = obj[i].month;
            /* numberOfPeople */
            td_number = $('#NoSalaryForHire_numberOfPeople').find('td[data-month="' + month + '"]:eq(0)');
            td_number
                .addClass('numberOfPeople')
                .attr('data-source', 'NoSalaryForHire')
                .attr('data-id', obj[i].id)
                .attr('data-index', i)
                .html($(InputUI))
                .find('input').val(obj[i].numberOfPeople);
            NoSalaryForHireHelper.CheckInput(td_number.find('input'));
            NoSalaryForHireHelper.BindInput(td_number.find('input'));
        }
    },
    BindInput: function (input) {
        input.change(function () {
            if (NoSalaryForHireHelper.CheckInput(input)) {
                var index = input.closest('td').data('index');
                var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
                baseFarmer.NoSalaryForHire[index].numberOfPeople = parseInt(input.val());
            }
            BaseFarmerHelper.CheckIsHire();
        });
    },
    CheckInput: function (input) {
        var target = input.closest('td');
        var log = target.data('month') + '月份之人數請輸入不小於0的整數。' + '<br>';
        var con = !Helper.NumberValidate(input.val());
        Helper.LogHandler(con, NoSalaryForHireHelper.Alert, target, log, 'bg-danger');
        return !con;
    },
    Reset: function () {
        $('#NoSalaryForHire .numberOfPeople input').remove();
        if (this.Alert) { this.Alert.reset(); }
    },
    ResetObject: function (obj) {
        for (var i in obj) {
            obj[i].numberOfPeople = 0;
        }
    },
    Alert: null
}
var LongTermForLackHelper = {
    Init: function (obj) {
        this.Alert = new Helper.Alert($('#Alert12'));
        for (var i in obj) {
            /* workerTypeCodeId */
            var workerTypeCodeArray = $.grep(Components.WorkerTypeCode, function (e) {
                return (e.id == obj[i].workerTypeCodeId);
            })
            var td_workertype = $('<td>');
            td_workertype
                .addClass('workerTypeCodeId')
                .attr('data-source', 'LongTermForLack')
                .attr('data-id', obj[i].id)
                .html(workerTypeCodeArray[0].code + '.' + workerTypeCodeArray[0].name);
            $('#LongTermForLack_workerTypeCodeId').append(td_workertype);

            /* numberOfPeople */
            var td_number = $('<td>');
            td_number
                .addClass('numberOfPeople')
                .attr('data-source', 'LongTermForLack')
                .attr('data-id', obj[i].id)
                .attr('data-name', workerTypeCodeArray[0].name)
                .attr('data-index', i)
                .html($(InputUI))
                .find('input').val(obj[i].numberOfPeople);

            LongTermForLackHelper.CheckInput(td_number.find('input'));
            LongTermForLackHelper.BindInput(td_number.find('input'));
            $('#LongTermForLack_numberOfPeople').append(td_number);
        }
    },
    BindInput: function (input) {
        input.change(function () {
            if (LongTermForLackHelper.CheckInput(input)) {
                var index = input.closest('td').data('index');
                var baseFarmer = DataCopy.FarmerList[FirstPageIndex].BaseFarmer;
                baseFarmer.LongTermForLack[index].numberOfPeople = parseInt(input.val());
            }
            BaseFarmerHelper.CheckLack();
        });
    },
    CheckInput: function (input) {
        var target = input.closest('td');
        var log = target.data('name') + '之人數請輸入不小於0的整數。' + '<br>';
        var con = !Helper.NumberValidate(input.val());
        Helper.LogHandler(con, LongTermForLackHelper.Alert, target, log, 'bg-danger');
        return !con;
    },
    Reset: function () {
        $('#LongTermForLack').find('[data-source="LongTermForLack"]').remove();
        if (this.Alert) { this.Alert.reset(); }
    },
    ResetObject: function (obj) {
        for (var i in obj) {
            obj[i].numberOfPeople = 0;
        }
    },
    Alert: null
}
var ShortTermForLackHelper = {
    Init: function (obj, index) {
        if (this.Alert13 == null) {
            this.Alert13 = new Helper.Alert($('#Alert13'));
        }
        if (this.Alert22 == null) {
            this.Alert22 = new Helper.Alert($('#Alert22'));
        }
        for (var i in obj) {
            var tr = $('<tr class="ShortTermForLackObj">')
                .attr('data-id', obj[i].id)
                .attr('data-index', i)
                .attr('data-basefarmerindex', index);
            /* index*/
            var rownum = $('#ShortTermForLack .ShortTermForLackObj').length + 1;
            var td_rownum = $('<td>');
            td_rownum.text(rownum);
            tr.append(td_rownum);

            /* productCodeId */
            var td_productcode = $('<td>');
            td_productcode
                .addClass('productCodeId')
                .attr('data-basefarmerindex', index)
                .attr('data-source', 'ShortTermForLack')
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-id', obj[i].id)
                .attr('data-name', '產品名稱')
                .html(ProductCodeUI.clone()).find('option[value="' + obj[i].productCodeId + '"]').prop('selected', true);
            this.CheckSelect(td_productcode.find('select'));
            this.CheckProductRice(td_productcode.find('select'));
            this.BindEvent.BindSelect(td_productcode.find('select'));
            tr.append(td_productcode);

            /* workerTypeCodeId */
            var td_workertype = $('<td>');
            td_workertype
                .addClass('workerTypeCodeId')
                .attr('data-basefarmerindex', index)
                .attr('data-source', 'ShortTermForLack')
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-id', obj[i].id)
                .attr('data-name', '受僱農牧業工作類型')
                .html(WorkerTypeCodeUI.clone()).find('option[value="' + obj[i].workerTypeCodeId + '"]').prop('selected', true);
            this.CheckSelect(td_workertype.find('select'));
            this.BindEvent.BindSelect(td_workertype.find('select'));
            tr.append(td_workertype);

            /* numberOfPeople */
            var td_number = $('<td>');
            td_number
                .addClass('numberOfPeople')
                .attr('data-basefarmerindex', index)
                .attr('data-source', 'ShortTermForLack')
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-id', obj[i].id)
                .html($(InputUI))
                .find('input').val(obj[i].numberOfPeople);
            this.CheckInput(td_number.find('input'));
            this.BindEvent.BindInput(td_number.find('input'));
            tr.append(td_number);

            /* LackMonths */
            var td_lackmonth = $('<td>');
            td_lackmonth
                .addClass('LackMonths')
                .attr('data-basefarmerindex', index)
                .attr('data-source', 'ShortTermForLack')
                .attr('data-index', i)
                .attr('data-rownum', rownum)
                .attr('data-name', '缺工月份')
                .attr('data-id', obj[i].id)
                .html(MonthPickerUI_Multi.clone())
            for (var j in obj[i].LackMonths) {
                td_lackmonth.find('option[value="' + obj[i].LackMonths[j].month + '"]').attr('selected', true);
            }
            td_lackmonth.find('.selectpicker').selectpicker('refresh');
            this.CheckSelect(td_lackmonth.find('select'));
            this.BindEvent.BindSelect(td_lackmonth.find('select'));
            tr.append(td_lackmonth);

            /* delete */
            var td_delete = $('<td>');
            td_delete
                .addClass('deleteshortTermForLack')
                .html($(DeleteButtonUI));
            this.BindEvent.BindButton(td_delete.find('button'));
            tr.append(td_delete);

            $('#ShortTermForLack tbody').append(tr);
        }
        BaseFarmerHelper.CheckLack();
    },
    BindEvent: {
        BindInput: function (input) {
            input.change(function () {
                if (ShortTermForLackHelper.CheckInput(input)) {
                    var index = input.closest('td').data('index');
                    var baseFarmerIndex = input.closest('td').data('basefarmerindex');
                    var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
                    baseFarmer.ShortTermForLack[index].numberOfPeople = parseInt(input.val());
                }
                BaseFarmerHelper.CheckLack();
            });
        },
        BindSelect: function (select) {
            select.change(function () {
                if (select.data('name') == 'ProductCodeUI') {
                    ShortTermForLackHelper.CheckProductRice(select);
                    MultiTableExamine.CheckCrop_Animal_ShortTermForLack();
                }
                if (ShortTermForLackHelper.CheckSelect(select)) {
                    var td = select.closest('td');
                    var index = td.data('index');
                    var baseFarmerIndex = td.data('basefarmerindex');
                    var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
                    if (td.hasClass('productCodeId')) {
                        baseFarmer.ShortTermForLack[index].productCodeId = select.val();
                    }
                    if (td.hasClass('workerTypeCodeId')) {
                        baseFarmer.ShortTermForLack[index].workerTypeCodeId = select.val();
                    }
                    if (td.hasClass('LackMonths')) {
                        baseFarmer.ShortTermForLack[index].LackMonths = [];
                        selected = select.find('option:selected');
                        selected.each(function () {
                            lackMonth = {
                                month: $(this).val(),
                                shortTermForLackId: select.closest('tr').data('id')
                            }
                            baseFarmer.ShortTermForLack[index].LackMonths.push(lackMonth);
                        });
                    }
                }
            });
        },
        BindButton: function (button) {
            button.click(function () {
                var tr = button.closest('tr');
                var index = tr.data('index');
                var baseFarmerIndex = tr.data('basefarmerindex');
                var baseFarmer = DataCopy.FarmerList[baseFarmerIndex].BaseFarmer;
                baseFarmer.ShortTermForLack.splice(index, 1);
                ShortTermForLackHelper.Reset();
                for (var i in DataCopy.FarmerList) {
                    ShortTermForLackHelper.Init(DataCopy.FarmerList[i].BaseFarmer.ShortTermForLack, i);
                }
            });
        }
    },
    CheckInput: function (input) {
        var target = input.closest('td');
        var log = '第' + target.data('rownum') + '列之人次請輸入大於0的整數。' + '<br>';
        var con = !Helper.NumberValidate(input.val()) || parseInt(input.val()) <= 0;
        Helper.LogHandler(con, ShortTermForLackHelper.Alert13, target, log, 'bg-danger');
        return !con;
    },
    CheckSelect: function (select) {
        var target = select.closest('td');
        var log = '第' + target.data('rownum') + '列之' + target.data('name') + '請重新選擇。' + '<br>';
        var con = select.val() == -1 || select.find('option:selected').length == 0;
        Helper.LogHandler(con, ShortTermForLackHelper.Alert13, target, log, 'bg-danger');
        return !con;
    },
    CheckProductRice: function (select) {
        var selected = select.find('option:selected');
        var log = '稻作於實務上屬較不缺工之作物，請再次確認。' + '<br>';
        var con = selected.data('code') == '101';
        Helper.LogHandler(con, ShortTermForLackHelper.Alert22, null, log);
    },
    Reset: function () {
        $('#ShortTermForLack .ShortTermForLackObj').remove();
        if (this.Alert13) { this.Alert13.reset(); }
    },
    Alert13: null,
    Alert22: null,
    AdderUI: '\
            <form>\
                <div class="form-group">\
                  <label class="col-form-label">產品代碼</label>\
                  <div class="productCodeId"></div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">受僱農牧業工作類型</label>\
                  <div class="workerTypeCodeId"></div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">人次（人）</label>\
                  <div class="numberOfPeople">\
                    <input class="form-control" type="text">\
                  </div>\
                </div>\
                <div class="form-group">\
                  <label class="col-form-label">缺工月份</label>\
                  <div class="LackMonths"></div>\
                </div>\
            </form>\
        '
}

/* Float Label Pattern Plugin for Bootstrap 3.1.0 by Travis Wilson
**************************************************/
$.fn.floatLabels = function (options) {

    // Settings
    var self = this;
    var settings = $.extend({}, options);


    // Event Handlers
    function registerEventHandlers() {
        self.on('input keyup change', 'input, textarea', function () {
            actions.swapLabels(this);
        });
    }


    // Actions
    var actions = {
        initialize: function () {
            self.each(function () {
                var $this = $(this);
                var $label = $this.children('label');
                var $field = $this.find('input,textarea').first();

                if ($this.children().first().is('label')) {
                    $this.children().first().remove();
                    $this.append($label);
                }

                var placeholderText = ($field.attr('placeholder') && $field.attr('placeholder') != $label.text()) ? $field.attr('placeholder') : $label.text();

                $label.data('placeholder-text', placeholderText);
                $label.data('original-text', $label.text());

                if ($field.val() == '') {
                    $field.addClass('empty')
                }
            });
        },
        swapLabels: function (field) {
            var $field = $(field);
            var $label = $(field).siblings('label').first();
            var isEmpty = Boolean($field.val());

            if (isEmpty) {
                $field.removeClass('empty');
                $label.text($label.data('original-text'));
            }
            else {
                $field.addClass('empty');
                $label.text($label.data('placeholder-text'));
            }
        }
    }


    // Initialization
    function init() {
        registerEventHandlers();

        actions.initialize();
        self.each(function () {
            actions.swapLabels($(this).find('input,textarea').first());
        });
    }
    init();


    return this;
};
$(function () {
    $('.float-label-control').floatLabels();
});