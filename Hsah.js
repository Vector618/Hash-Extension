(function(Scratch){
    "use strict"
    class VectorHash{
    getInfo(){
        return{
            id:"VectorHash",
            name:"哈希拓展",
            color1:"#960000",
            blocks:[
                
                {
                    opcode:"power",
                    blockType:Scratch.BlockType.REPORTER,
                    text:"[TEXT]的[SHA]多少",
                    arguments:{
                        TEXT:{
                            type:Scratch.ArgumentType.STRING,
                            defaultValue:"a"
                        },
                        SHA:{
                            type:Scratch.ArgumentType.STRING,
                            menu:"Select",
                            defaultValue:"512"
                        }
                    }
                    
                },

                {
                    opcode:"shift",
                    blockType:Scratch.BlockType.REPORTER,
                    text:"将[NUM]从[OLD]进制转换为[NEW]进制",
                    arguments:{
                        NUM:{
                            type:Scratch.ArgumentType.STRING,
                            defaultValue:"0"
                        },
                        OLD:{
                            type:Scratch.ArgumentType.NUMBER,
                            defaultValue:16
                        },
                        NEW:{
                            type:Scratch.ArgumentType.NUMBER,
                            defaultValue:10
                        }

                    }
                },

                {
                    opcode:"copyText",
                    blockType:Scratch.BlockType.COMMAND,
                    text:"将[COPYTEXT]复制到剪切板",
                    arguments:{
                        COPYTEXT:{
                            type:Scratch.ArgumentType.STRING,
                            defaultValue:"加入了空气喵~"
                        }
                    }
                },

                {
                    opcode: "newline",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "换行"
                },


            ],
//------------------------------------------menus-----------------------------------
            menus:{
                Select:{
                    items:[
                        {text:"SHA-256",value:"256"},
                        {text:"SHA-384",value:"384"},
                        {text:"SHA-512",value:"512"}
                    ]
                }
            }
        }
    }
//----------------------------------------function-----------------------------------
    
    async power(args){
        const encoder = new TextEncoder()
        const text = encoder.encode(args.TEXT)
        const select =args.SHA
        let hashRaw
        if (select == "256" ){
            hashRaw = await window.crypto.subtle.digest("SHA-256",text)
        } else if(select == "384"){
            hashRaw = await window.crypto.subtle.digest("SHA-384",text)
        } else if(select == "512"){
            hashRaw = await window.crypto.subtle.digest("SHA-512",text)
        }
        const finkey = Array.from(new Uint8Array(hashRaw))
        .map(n => n.toString(16).padStart(2,"0")).join("")
        return finkey
    }

    shift(args){
        const num = args.NUM
        const oldRadix = args.OLD
        const newRadix = args.NEW
        if (oldRadix < 2 || oldRadix >36 || newRadix < 2 || newRadix >36){
            return "输入的进制不在2-36之间"
        }
        const decimalNum = parseInt(num , oldRadix)
        if (isNaN(decimalNum)){
            return "输入的数字不合法"
        }
        const targetStr = decimalNum.toString(newRadix).toLowerCase()
        return targetStr


    }

    copyText(args){
        const text = args.COPYTEXT
        navigator.clipboard.writeText(text);
    }

    newline() {
      return "\n";
    }


}
Scratch.extensions.register(new VectorHash())
})(Scratch);


