//const BdManager = require('./bd_manager');


class BdValidation {

    static async is_key_valid(BdManager, sessionKey, accepted_users){
        //console.log(BdManager)
        const accountID = await BdManager.get_accountID_by_sessionKey(sessionKey)
        const userData = await BdManager.getUserDataById(accountID);

        if(accepted_users.includes(userData["ID_TIPO"])) return true;
        return false;
    }

}

module.exports = BdValidation