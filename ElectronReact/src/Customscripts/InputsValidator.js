class InputsValidator{
    static isRutValid(value){
        if(!value) return true
        try {
            let rut = value 
            let valor = rut.replace('.','');
            // // Despejar Guión
            valor = valor.replace('-','');
            console.log(valor)
            // // Aislar Cuerpo y Dígito Verificador
            let cuerpo = valor.slice(0,-1);
           
            let dv = valor.slice(-1).toUpperCase();
            console.log(dv)
            // Formatear RUN
            rut = cuerpo + '-'+ dv
            console.log(rut)
            // Si no cumple con el mínimo ej. (n.nnn.nnn)
            if(cuerpo.length < 7) return false;

            // Calcular Dígito Verificador
            let suma = 0;
            let multiplo = 2;
            let i=1;
                // Para cada dígito del Cuerpo
            for(i=1;i<=cuerpo.length;i++) {

            // Obtener su Producto con el Múltiplo Correspondiente
            let index = multiplo * valor.charAt(cuerpo.length - i);
            
            // Sumar al Contador General
            suma = suma + index;
            
            // Consolidar Múltiplo dentro del rango [2,7]
            if(multiplo < 7) { multiplo = multiplo + 1;
                } else { 
            multiplo = 2; }
            }

            // Calcular Dígito Verificador en base al Módulo 11
            let dvEsperado = 11 - (suma % 11);
            console.log(dvEsperado)
            console.log(dv)
            // Casos Especiales (0 y K)
            dv = (dv == 'K')?10:dv;
            dv = (dv == 0)?11:dv;

            // Validar que el Cuerpo coincide con su Dígito Verificador
            if(dvEsperado != dv) { 
                
                rut.setCustomValidity("RUT Inválido"); 
                return false; 
            }
            else{
            return true
            }
        } catch (error) {
            console.log(error)
            return false
        }
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
