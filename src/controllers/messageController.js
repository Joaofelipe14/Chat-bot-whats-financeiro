const { messageSet } = require('./messageSetController')
const { interpretMessageAndResponse } = require('./messageIntertrepretController')
const { authUser } = require('./authUserController')


async function handleUserMessage(userNumber, message, historyMessage) {
    const lowerCaseMessage = message.body.toLowerCase();

    // /*Responder mensagem setadas*/
    // const isMessageHandledBySet = await messageSet(userNumber, lowerCaseMessage);

    // if (isMessageHandledBySet) {
    //     return;
    // }

    /*Autenticação*/
    const isLogged = await authUser(message)

    if (!isLogged) {
        return;
    }else{
          /*Responder mensagem com auxilio do Gemine*/
    await interpretMessageAndResponse(userNumber, message.body, historyMessage)
    }

  

};

module.exports = { handleUserMessage };
