const WebPay = require('transbank-sdk').WebpayPlus;
const BdManager = require('./bd_manager')


const axios = require('axios')
const { v4 : uuidv4 } = require('uuid');

const TransactionDetail = require('transbank-sdk').TransactionDetail;
WebPay.configureWebpayPlusMallForTesting(); // <= Esto para hacer transacciones a multiples codigos de comercio

let transactions = [];
let transactionsByToken = [];
let paying_user_info = [];

class TransbankController {
    static async doPayment(req, res) {
        try {
            const { makers, totalAmount, userID } = req.body;
            console.log("userID: ", userID)

            let url = 'http://' + req.get('host');
            let returnURL = url + '/verificar';

            let details = [ ];

            for(let maker of makers){
                details.push(
                    new TransactionDetail(
                        maker.amount, maker.code, Date.now()
                    )
                )
            }

            const session_id = uuidv4()
            paying_user_info.push({
                session_id: session_id,
                userID: userID
            })

            WebPay.MallTransaction.create(
                totalAmount,
                session_id,
                returnURL,
                details
            ).then((d) => {
                console.log('hola');

                const link = d.url + '?token_ws=' + d.token;

                console.log(link);

                res.json({
                    data: link
                });
            }).catch((error) => new Error(error));


        } catch (error) {
            console.log(error);

            res.json({
                error: error,
                data: {  } 
            });
        }
    }

    static async verifyPayment(req, res) {
        try {
            console.log(req.body)
            let token = req.body.token_ws;
            let returnURL = 'http://localhost:3002/dashboard/dashboardOption3'
    
            console.log('pre token', token);
            WebPay.MallTransaction.commit(token).then((transactionResult) => {
                
                transactions.push( transactionResult );
                transactionsByToken.push( { token: token, transaction: transactionResult  } );
                

                return WebPay.MallTransaction.status(token);

            }).then(async (result2) => {
                // console.log('pos acknowledgeTransaction', result2);
                // Si llegas aquí, entonces la transacción fue confirmada.
                // Este es un buen momento para guardar la información y actualizar tus registros (disminuir stock, etc).
    
                const transactionIndex = transactionsByToken.findIndex( transactionToken => transactionToken.token == req.body.token_ws);
                const transaction = transactionsByToken[transactionIndex].transaction;
                

                
                const userID = paying_user_info.find((user) => user.session_id == transaction.session_id)

                let html;
    
                if (transaction) {
                    console.log(transaction)
                    let authorized_status = 0;
    
                    html = '';
    
                    html = `
                        <h1>Comprobante</h1>
                        ${JSON.stringify(transaction)}
    
                        <hr>
    
                        <form action="/anular" method="post">
                            <input type="hidden" name="session_id" value="${transaction.session_id}">
                            <input type="hidden" name="token" value="${token}">
                        </form>
    
                        <form action="${returnURL}" method="get">
                            <input type="submit" value="Volver a inicio">
                        </form>
                    `;
                
                    for(let detail of transaction.details){
                        if(detail.status == 'AUTHORIZED') authorized_status++;
                    }
    
                    if(transaction.details.length == authorized_status) console.log('All Correct');
                    if(transaction.details.length != authorized_status) {
                        console.log('Unauthorized pay');
                        res.redirect('/pago');
                        // await axios.post('http://' + req.get('host') + '/transbank/anular', { session_id: transaction.session_id, token: token } );
                    }
    
                } else {
                    // La transacción fue cancelada
                    html = 'Transacción ' + req.body.TBK_ORDEN_COMPRA + ' cancelada';
                }
                //BdManager.owo
                const data = {
                    estado: transaction.details[0].status,
                    monto: transaction.details[0].amount,
                    tipo_recibo: transaction.details[0].payment_type_code,
                    userID: userID.userID
                }
                console.log(data)
                await BdManager.db_payment(data.userID, data.estado, data.monto, data.tipo_recibo)
                const id_pago = await BdManager.getPaymentID(data.userID)

                return res.redirect("http://localhost:3002/boleta?id_pago="+id_pago);
            }).catch(err => new Error(err));

        } catch (error) {
            console.log(error);
        }
    }

    static async refundPayment(req, res) {
        try {
            const transactionIndex = transactions.findIndex( transaction => transaction.session_id == req.body.session_id );
            const transaction = transactions[transactionIndex]
    
            if(!transaction) new Error('Not Found');

            for(let detail of transaction.details){
                WebPay.MallTransaction.refund(req.body.token, detail.buy_order, detail.commerce_code, detail.amount)
                .then((result) => {
                    console.log('anulación:', result);
                    return res.send({hmm: "reembolsado"});
                }).catch(err => new Error(err));
            }
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = TransbankController;