
(function($){
    $.fn.extend({
        generateCityPicker:function(){
            var _self = this;
            //检测this后的第一个input节点是否含有class city-selector-text
            var domId = this.attr("id");
            if(!$("#"+domId+">input").hasClass(".city-selector-text")){
                    $("#"+domId+">input").addClass("city-selector-text")
            }

            if(!this.hasClass("city-selector")){
                    this.addClass("city-selector");
            }
            //生成节点
            this.find(".city-selector-text").after(_self._getProvincesDom());
            $("#stock_province_item .area-list").append(_self._getProvincesList());

            //事件绑定
            this._bindEvent();

            this.setWidth();
        },
        _bindEvent:function(){
            var _self = this;

            var areaTabContainer = $("#JD-stock .tab li");
            var provinceContainer = $("#stock_province_item");
            var cityContainer = $("#stock_city_item");
            var areaContainer = $("#stock_area_item");
            var townaContainer = $("#stock_town_item");
            var currentAreaInfo;

            this.find(".city-selector-text").bind("click",function (event){
                _self.toggleClass('hover');
                _self.find(".content").toggle();
            })

            $("#stock_province_item a").click(function(){
                _self.unbind("mouseout");
                _self._chooseProvince(this);
            })
            var ci = _self;
            areaTabContainer.find(".J_province").off().bind("click",function(){
                areaTabContainer.removeClass("curr");
                $(this).parent().addClass("curr").show();
                provinceContainer.show();
                cityContainer.hide();
                areaTabContainer.find(".J_city").parent().hide();
            });
            areaTabContainer.find(".J_city").click(function () {
                areaTabContainer.removeClass("curr");
                $(this).parent().addClass("curr").show();
                provinceContainer.hide();
                cityContainer.show();
            })

            //点击文档其他地方，隐藏下拉选择
            document.onmousedown = function(){
                    if(_self.find(".content").is(":visible") == true) {
                        _self.find(".content").hide();
                    }
            }

            _self.mousedown(function(event){
                event.stopPropagation();
            });
        },
        setWidth:function(){
            var _width = this.find(".city-selector-text").outerWidth();
            _width = _width < 500 ? 500 : _width; 
            this.find(".content").width(_width);
        },
        _getProvincesList:function(){
            var domArr = [];
            $.each(iplocation,function(key,value){
                var node = '<li><a href="javascript:void(0);" data-type="'+value["id"]+'" data-value="'+key+'">'+key+'</a></li>';
                domArr.push(node);
            })

            return domArr.join("");
        },
        _getAreaList:function(result){
            var html = ["<ul class='area-list'>"];
            var longhtml = [];
            var longerhtml = [];
            if (result && result.length > 0) {
                for (var i = 0, j = result.length; i < j; i++) {
                    result[i].name = result[i].name.replace(" ", "");
                    if (result[i].name.length > 12) {
                        longerhtml.push("<li class='longer-area'><a href='javascript:void(0);' data-type='1'  >" + result[i].name + "</a></li>");
                    }
                    else if (result[i].name.length > 5) {
                        longhtml.push("<li class='long-area'><a href='javascript:void(0);' data-type='1' >" + result[i].name + "</a></li>");
                    }
                    else {
                        html.push("<li><a href='javascript:void(0);' data-type='1'>" + result[i].name + "</a></li>");
                    }
                }
            }
            else {
                html.push("<li><a href='javascript:void(0);'> </a></li>");
            }
            html.push(longhtml.join(""));
            html.push(longerhtml.join(""));
            html.push("</ul>");
            return html.join("");
        },
         _chooseProvince:function(obj) {
             var _self = this;
             var provinceContainer = $("#stock_province_item");
             var cityContainer = $("#stock_city_item");
             var areaTabContainer = $("#JD-stock .tab li");
            var provinceName = $(obj).attr("data-value");
            var provinceId = $(obj).attr("data-type");

            if (provinceCityJson["" + provinceId]) {
                //provinceContainer.hide();
                cityContainer.html(_self._getAreaList(provinceCityJson["" + provinceId]));

                areaTabContainer.removeClass("curr");
                areaTabContainer.find(".J_province span").text(provinceName);
                areaTabContainer.eq(1).addClass("curr").show();
                provinceContainer.hide();
                cityContainer.show();
                cityContainer.find("a").bind("click",function () {
                    _self._getCityText(this);
                });
            }else{
                _self._getCityText(obj);
            }
        },
         _getCityText:function(obj){
            this.find(".city-selector-text").val($(obj).text());
             //解决选中城市时验证提示不会消失的问题，jquery验证为失焦验证
             this.find(".city-selector-text").blur();
             this.removeClass('hover');
             this.find(".content").hide();
        },
        _getProvincesDom:function(){
            var provinceHtml = '<div class="content" style="display:none;"><div data-widget="tabs" class="m JD-stock" id="JD-stock">'
                + '<div class="mt">'
                + '    <ul class="tab">'
                + '        <li class="curr"><a href="javascript:void(0);" class="hover J_province"><span>请选择</span><i></i></a></li>'
                + '        <li style="display:none;"><a href="javascript:void(0);" class="J_city"><span>请选择</span><i></i></a></li>'
                + '    </ul>'
                + '    <div class="stock-line"></div>'
                + '</div>'
                + '<div class="mc" id="stock_province_item">'
                + '    <ul class="area-list">'
                    // + '       <li><a href="javascript:void(0);" data-type="1">北京</a></li><li><a href="javascript:void(0);" data-type="1">上海</a></li><li><a href="javascript:void(0);" data-type="1">天津</a></li><li><a href="javascript:void(0);" data-type="1">重庆</a></li><li><a href="javascript:void(0);" data-value="5">河北</a></li><li><a href="javascript:void(0);" data-value="6">山西</a></li><li><a href="javascript:void(0);" data-value="7">河南</a></li><li><a href="javascript:void(0);" data-value="8">辽宁</a></li><li><a href="javascript:void(0);" data-value="9">吉林</a></li><li><a href="javascript:void(0);" data-value="10">黑龙江</a></li><li><a href="javascript:void(0);" data-value="11">内蒙古</a></li><li><a href="javascript:void(0);" data-value="12">江苏</a></li><li><a href="javascript:void(0);" data-value="13">山东</a></li><li><a href="javascript:void(0);" data-value="14">安徽</a></li><li><a href="javascript:void(0);" data-value="15">浙江</a></li><li><a href="javascript:void(0);" data-value="16">福建</a></li><li><a href="javascript:void(0);" data-value="17">湖北</a></li><li><a href="javascript:void(0);" data-value="18">湖南</a></li><li><a href="javascript:void(0);" data-value="19">广东</a></li><li><a href="javascript:void(0);" data-value="20">广西</a></li><li><a href="javascript:void(0);" data-value="21">江西</a></li><li><a href="javascript:void(0);" data-value="22">四川</a></li><li><a href="javascript:void(0);" data-value="23">海南</a></li><li><a href="javascript:void(0);" data-value="24">贵州</a></li><li><a href="javascript:void(0);" data-value="25">云南</a></li><li><a href="javascript:void(0);" data-value="26">西藏</a></li><li><a href="javascript:void(0);" data-value="27">陕西</a></li><li><a href="javascript:void(0);" data-value="28">甘肃</a></li><li><a href="javascript:void(0);" data-value="29">青海</a></li><li><a href="javascript:void(0);" data-value="30">宁夏</a></li><li><a href="javascript:void(0);" data-value="31">新疆</a></li><li><a href="javascript:void(0);" data-type="1">台湾</a></li><li><a href="javascript:void(0);" data-type="1">香港</a></li><li><a href="javascript:void(0);" data-type="1">澳门</a></li>'
                + '    </ul>'
                + '</div>'
                + '<div class="mc" id="stock_city_item"></div>'
                + '</div></div>';
            return provinceHtml;
        }
    })
})(jQuery);





