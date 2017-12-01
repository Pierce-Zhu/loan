class ToolsUtil {
    static delay = (time=1000)=>{
        return new Promise((resolve,reject)=>{
            this.timer = setTimeout(()=>{
                clearTimeout(this.timer);
                resolve();
            } ,time);
        });
    }
}

export default ToolsUtil;