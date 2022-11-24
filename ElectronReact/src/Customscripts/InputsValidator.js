class InputsValidator{
    static isRutValid(value){
        if(!value) return true
        if(value.length === 12 || value.length === 11) return true;
        return false;
    }

        
    static isNameValid(value){
        if(!value) return true
        try {
        // if (value.length > 30 ) {
        //    return false;
            
        // } else if (!/^([a-zA-ZñÑáéíóúÁÉÍÓÚ])+$/i.test(value) ) {
        //     return false;
        
        // } else{
        //     return true
        // }
        return true
        } catch (error) {
            console.log(error)
            return false
        }
        
    }

    static isPasswordValid(value){
        if(!value) return true
        try{

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static isUsernameValid(value){
        if(!value) return true
        try{
            // let user = value.length;
            // let userSinSpace = value.replace(/\s+/g, "");
            // userSinSpace = userSinSpace.length;
            // if(user != userSinSpace){
            //     return false
            // }
            // else{
            //     return true
            // }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static isEmailValid(value){
        if(!value) return true
        try{
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static isPhoneNumberValid(value){
        if(!value) return true
        try{
            if(value.length==0 || (value.length>=8&&value.length<=9)){
            return true
            }else{
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

module.exports = InputsValidator;
