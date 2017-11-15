/* ajax request lock */
var GetSending = false;
var SetSending = false;

$(document).ready(function () {

    /* set autocompelete*/
    $("#inputFarmerId").typeahead({
        source: Components.FarmerIdList,
        autoSelect: true
    }); 
   
    /* get farmer data*/
    $('#btnSearch').click(function () {        
        var farmerid = $('#inputFarmerId').val().trim();
        if (farmerid) {
            $('.index-info').hide();
            $('.editor-tabs').hide();
            GetFarmerData(farmerid, '/Ajax/GetFarmerData.ashx');
            $('.editor-tabs li[title="Page 4"]').show();
            $('.editor-tabs .slider').css('width', '25%');
        } else {
            Alert.setMessage('請輸入農戶編號！').open();
        }
        $('#inputFarmerId').val('');

    });

    /* get farmer data*/
    $('#btnSearchReadOnly').click(function () {
        var farmerid = $('#inputFarmerId').val().trim();
        $('.editor-tabs').hide();
        if (farmerid) {
            $('.index-info').hide();
            GetFarmerData(farmerid, '/Ajax/GetReadOnlyFarmerData.ashx');
            $('.editor-tabs li[title="Page 4"]').hide();
            $('.editor-tabs div.slider').css('width', '33.33%');
        } else {
            Alert.setMessage('請輸入農戶編號！').open();
        }
        $('#inputFarmerId').val('');

    });

    /* set farmer data*/
    $('#btnSubmit').click(function () {

        /* create one log object */
        ExaminLogger.WriteErrorArray = Helper.CountError();
        var log = {
            baseFarmerId: DataCopy.FarmerList[FirstPageIndex].BaseFarmer.id,
            readErrorLength: ExaminLogger.ReadErrorArray.length,
            writeErrorLength: ExaminLogger.WriteErrorArray.length
        }
        DataCopy.FarmerList[FirstPageIndex].BaseFarmer.Log.push(log);

        /*check if need to reset table*/
        Helper.CheckIsHireAndIsLackToReset(DataCopy.FarmerList, FirstPageIndex);

        SetFarmerData();

    });
})

var GetFarmerData = function (farmerid, url) {
    if (GetSending) {
        return;
    }
    $.ajax({
        url: url,
        async: true,
        cache: false,
        type: 'POST',
        data: { 'farmerid': farmerid },
        success: function (result) {
            GetSending = false;
            if (result) {
                data = $.parseJSON(result);
                if (data.FarmerList.length > 0) {

                    var firstPageObj = $.grep(data.FarmerList, function (e) {
                        return e.BaseFarmer.page == 1
                    });

                    if (firstPageObj.length > 0) {
                        Reset();
                        /* deep copy */
                        DataCopy = $.extend(true, {}, data);

                        /* init BaseFarmer */
                        for (var i in data.FarmerList) {
                            Init(data.FarmerList[i].BaseFarmer, i);
                        }
                        MultiTableExamine.Direct();

                        /* adjust editor-tabs*/
                        $('input[name="tab-control"]:first-child').prop('checked', true);
                        $('.editor-tabs').show();

                        /* count error */
                        ExaminLogger.ReadErrorArray = Helper.CountError();
                    } else {
                        Info.setMessage('查無農戶資料！').open();
                    }
                } else {
                    Info.setMessage('查無農戶資料！').open();
                }
            }
            Loading.close();
        },
        error: function () {
            GetSending = false;
            Loading.close();
            Alert.setMessage('很抱歉，當筆資料查詢錯誤，請稍後再試。').open();
        },
        beforeSend: function () {
            GetSending = true;
            Loading.open();
        }
    });
}
var SetFarmerData = function () {
    if (SetSending) {
        return;
    }
    $.ajax({
        url: 'Ajax/SetFarmerData.ashx',
        async: true,
        cache: false,
        type: 'POST',
        data: { 'data': JSON.stringify(DataCopy) },
        success: function (result) {
            SetSending = false;
            if (!result) {
                Info.setMessage('成功更新調查表！').open();
            } else {
                Alert.setMessage(result).open();
            }
            //get updated data
            GetFarmerData(DataCopy.FarmerId, 'Ajax/GetFarmerData.ashx');
            Loading.close();
        },
        error: function () {
            SetSending = false;
            Loading.close();
            Alert.setMessage('很抱歉，儲存當筆資料時發生錯誤，請稍後再試。').open();
        },
        beforeSend: function () {
            SetSending = true;
            Loading.open();
        }
    });
}