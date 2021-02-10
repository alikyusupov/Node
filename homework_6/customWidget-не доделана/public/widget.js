const WIDGET = {
    cssLink:"//localhost/widget.css",
    widgetDataLink:"//localhost/getWidgetData",
    id:"wdgt",
    init:function(){
        if(!document.getElementById(this.id)){
            console.log("Неверный ID")
        }else{
            //this.addStyle();
            let self = this;
            fetch(this.widgetDataLink)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}