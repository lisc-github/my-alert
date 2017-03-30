(function(window){
    function Alert(){
        var config = {};
        this.get = function(v){
            return config[v];
        };
        this.set = function(k,v){
            config[k] = v;
        };
    }
    Alert.prototype = {
        init:function(){
            this.createBox();
            this.bindEvent();
        },
        createBox:function(){
            var box = document.createElement("div");
            box.style.position = 'fixed';
            box.style.width = '440px';
            box.style.left = '50%';
            box.style.top = '30%';
            box.style.marginLeft = '-230px';
            box.style.backgroundColor = '#eee';
            box.style.border = "1px solid #ccc";
            box.style.padding = '0 20px';
            box.style.zIndex = '99999';
            var head = document.createElement("div");
            head.style.height = '40px';
            head.innerHTML = '温馨提示：';
            head.style.lineHeight = '40px';
            var content = document.createElement("div");
            this.set('content',content);
            content.style.padding = '20px 0';
            var btnBox = document.createElement("div");
            btnBox.style.height= '60px';
            var btn = document.createElement("input");
            btn.setAttribute("type",'button');
            btn.setAttribute("value",'确定');
            btn.style.float = 'right';
            btn.style.width = '80px';
            btn.style.height = '30px';
            btn.style.marginTop = '15px';
            btnBox.appendChild(btn);
            box.appendChild(head);
            box.appendChild(content);
            box.appendChild(btnBox);
            var cover = document.createElement("div");
            cover.style.position = "fixed";
            cover.style.top = 0;
            cover.style.bottom = 0;
            cover.style.left = 0;
            cover.style.right = 0;
            cover.style.zIndex = "9999";
            if (!document.getElementsByClassName) {
                cover.style.background = "#000";
                cover.style.filter = "alpha(opacity=0)";
            }
            else
                cover.style.background = "rgba(0,0,0,0)";
            cover.setAttribute("id",'my_alert');
            this.set("cover",cover);
            this.set('box',box);
            this.set('btn',btn);
        },
        show:function(str){
            this.get('content').innerHTML = str;
            document.body.appendChild(this.get('cover'));
            document.body.appendChild(this.get('box'));
            document.body.style.position = 'fixed';
            document.body.style.right = '17px';
            document.body.style.left = '0';
            this.createOverflow();
            document.body.appendChild(this.get("overflowBox"));
        },
        hide:function(){
            document.body.removeChild(this.get('cover'));
            document.body.removeChild(this.get('box'));
            document.body.style.position = 'relative';
            document.body.style.right = '17px';
            document.body.style.left = '0';
            document.body.removeChild(this.get('overflowBox'));
        },
        alert:function(str){
            this.init();
            this.show(str);
        },
        bindEvent:function(){
            var that = this;
            this.get('btn').onclick = function(){
                that.hide();
            };


            this.get("box").onclick = function(event){
                if(event.stopPropagation){
                    event.stopPropagation();
                }
                else{
                    window.event.cancelBubble = true;
                }
            };

            this.get('cover').onclick = function(){
                var flag = true;
                var index = 0;
                var timer;
                if(document.getElementById("my_alert")){
                    timer = setInterval(function(){
                        if(!flag){
                            that.get("box" ).style.borderColor = "#fff";
                            index++;
                            flag = !flag;
                        }
                        else{
                            that.get("box" ).style.borderColor = "#ccc";
                            index++;
                            flag = !flag;
                        }
                        if(index>10){
                            clearInterval(timer);
                        }
                    },100);
                }
            };
        },
        createOverflow:function(){
            var h = document.documentElement.clientHeight;
            var h2 = document.body.clientHeight;
            var box = document.createElement("div");
            var content = document.createElement("div");
            box.style.position = 'absolute';
            if (navigator.userAgent.indexOf("Firefox") > -1) {
                box.style.height = h + 'px';
            }
            else
                box.style.height = h+17 + 'px';
            box.style.right = '-17px';
            box.style.top = 0;
            box.style.width = '17px';
            content.style.height = h2 + "px";
            content.style.width = "17px";
            box.style.overflowY = 'scroll';
            box.appendChild(content);
            this.set('overflowBox',box);
        }
    };

    var o = new Alert();
    if(document.documentMode>7){
        window.alert = function(str){
            return o.alert.call(o,str);
        }
    }

})(window);