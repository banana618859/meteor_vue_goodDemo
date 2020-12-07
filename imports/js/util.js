/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-04-15 14:10:29
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-04 21:58:24
 */
export var util = {
    dragLine(){
        console.log('--dragLine')
    },
    getNewName(arr,keyName,fileName,extraName) {
        let count = 1;
        while (true) {
        var newAlias;
            if(extraName){
            newAlias = fileName + extraName + count
            }else{
            newAlias = fileName + count
            }
            var isExist = false
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][keyName] === newAlias) {
                    count++
                    isExist = true
                    break
                }
                console.log('count:',count)
            }
            if (!isExist) {
                return newAlias
            }
        }
    }
}