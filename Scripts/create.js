var Sending = false;

$(document).ready(function () {

    if (Components.EmptyFarmerListBuilder) {

        var data = Components.EmptyFarmerListBuilder;
        /* deep copy */
        DataCopy = $.extend(true, {}, data);

        /* init BaseFarmer */
        Init(data.FarmerList[0].BaseFarmer, 0);
        MultiTableExamine.Direct();

        /* adjust editor-tabs*/
        $('input[name="tab-control"]:first-child').prop('checked', true);
        $('.editor-tabs').show();

        var new_ui = $(InputUI);

        new_ui.find('input')
            .attr('id', 'farmerId')
            .change(function () {
                CheckFarmerId();
                DataCopy.FarmerList[0].BaseFarmer.farmerId = $(this).val();
            });        

        $('#farmerId').parent().html(new_ui);

        CheckFarmerId();

    }

    $('#btnSubmit').click(function () {
        if (CheckFarmerId()) {
            CreateFarmerData();
        } else {
            Alert.setMessage('農戶編號格式不符！').open();
        }       
    });
});

var CreateFarmerData = function () {
    if (Sending) {
        return;
    }
    $.ajax({
        url: '/Ajax/SetNewFarmerData.ashx',
        async: true,
        cache: false,
        type: 'POST',
        data: { 'data': JSON.stringify(DataCopy) },
        success: function (result) {
            SetSending = false;
            if (!result) {
                Info.setMessage('成功新增調查表！').open();
            } else {
                Alert.setMessage(result).open();
            }
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

var IdValidate = function (id) {
    
    return /\D/.test(id);

};

var CheckFarmerId = function () {

    var value = $('#farmerId').val();
    var con = IdValidate(value) || value.length != 12;
    var log = '農戶編號格式不得漏填，且需由12碼數字組成。' + '<br>';
    var target = $('#farmerId').parent();
    Helper.LogHandler(con, BaseFarmerHelper.Alert00, target, log, 'bg-warning');
    return !con;

}