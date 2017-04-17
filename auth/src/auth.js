$(document).ready(function(){
    $('#auth-to').change(function(){
        if($(this).val() == 'http'){
            if($('input:radio[name="type"]:checked').val() == 'panda'){
                $('#req-auth').prop('checked','checked');
            }
            $('#label-panda').hide();
            $('#auth-url-note').html('填写完整的请求URL, 如: http://xc.cdnpe.com/file/auth.html');
        }else if($(this).val() == 'rtmp'){
            $('#label-panda').show();
            $('#auth-url-note').html('填写:&lt;host&gt;/&lt;app&gt;/&lt;name&gt;, 不要加.flv和.m3u8后缀');
        }
    });
    var checkEmpty = function(that){
        if(that.val().length == 0){
            that.addClass('invalid');
        }else{
            that.removeClass('invalid');
        }
    };
    $('#auth-url').blur(function(){
        var that = $(this);
        checkEmpty(that);
    });
    $('#auth-key').blur(function(){
        var that = $(this);
        checkEmpty(that);
    });
    $('#auth-exp').blur(function(){
        var that = $(this);
        checkEmpty(that);
    });
    $('#auth-button').click(function(){
        var apiUrl;
        if($('#auth-to').val() == 'http'){
            apiUrl = '/api/auth.go';
        }else if($('#auth-to').val() == 'rtmp'){
            apiUrl = '/api/auth_rtmp.go';
        }
        var type = $('input:radio[name="type"]:checked').val();
        var url = $('#auth-url').val();
        var key = $('#auth-key').val();
        var exp = $('#auth-exp').val();
        if (url.length == 0) {$('#auth-url').addClass('invalid');}
        if (key.length == 0) {$('#auth-key').addClass('invalid');}
        if (exp.length == 0) {$('#auth-exp').addClass('invalid');}
        if (url.length == 0 || key.length == 0 || exp.length == 0){
            return;
        };
        url = encodeURIComponent(url);
        key = encodeURIComponent(key);
        // console.log(apiUrl);
        // console.log(type);
        // console.log(url);
        // console.log(key);
        // console.log(exp);
        $('#loading-gif').show();
        $('#loading-result').hide();
        sendParams(apiUrl, type, url, key, exp, callbackNote);
        // callbackNote();
        // setTimeout(function(){callbackNote()}, 2000);
    });
    var callbackNote = function (data) {
        // console.log(data);
        $('#result-data').val(data);
        // var string = 'http://v3.bootcss.com/css/#forms?auth_key=1492242363-0-0-95d3b2898fe80bf65ac498b1409ec522';
        // $('#result-data').val(string);

        $('#loading-gif').hide();
        $('#loading-result').show();
    };
    var sendParams = function (apiUrl, type, url, key, exp, callback) {
        $.ajax({
            url: apiUrl,
            type: 'POST',
            data: {typ:type, url: url, key: key, exp: exp},
            success: function(data){
                callback(data)
            }
        })
    };
    $('#result-paste').hover(function(){
        $(this).attr('aria-label','click to clipboard')
    });
    $('#result-paste').click(function(){
        if($('#result-data').val().length == 0){return}
        $('#result-data').focus();
        $('#result-data').select();
        document.execCommand('Copy');
        $(this).attr('aria-label','copied!')
    });
});



