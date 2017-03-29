(function(window){
    function Alert(){
        var config = {};
        this.get = function(v){
            return config[v];
        };
        this.set = function(k,v){
            config[k] = v;
        };
        this.init();
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
            this.set('box',box);
            this.set('btn',btn);
        },
        show:function(str){
            this.get('content').innerHTML = str;
            document.body.appendChild(this.get('box'));
            document.body.style.position = "fixed";
            document.body.style.width = "90%";
        },
        hide:function(){
            document.body.removeChild(this.get('box'));
        },
        alert:function(str){
            this.show(str);
        },
        bindEvent:function(){
            var that = this;
            this.get('btn').onclick = function(){
                that.hide();
            }
        }
    };
    var o = new Alert();
    window.alert = function(str){
        return o.alert.call(o,str);
    }
})(window);