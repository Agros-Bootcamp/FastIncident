import twilio from 'twilio'
import sgMail from '@sendgrid/mail';
//
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const readHookPush = async (req, res) => {
    try {
        const { head_commit } = req.body;
        if (!head_commit) return res.status(200).end();

        const { timestamp, url, committer } = head_commit;
        const formattedDate = new Date(timestamp).toLocaleString('es-PE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });

        const messageBody = `${committer?.name ?? ''} realizó un push al repositorio de FastIncident el ${formattedDate}, puedes revisarlo en el siguiente enlace: ${url}`;

        const client = twilio();
        const msgOpts = { body: messageBody, from: '+15076046986', to: '+51918635054' };
        await client.messages.create(msgOpts);
        console.log({ timestamp, url, committer });

        const msg = {
            to: ['cristhianperezroncal@gmail.com', 'dariof_0504@hotmail.com'],
            from: 'suarezmontezacristhian@gmail.com',
            subject: 'Notificación de Webhook de Github',
            text: messageBody,
            html: `<p>${messageBody}</p>`
        };
        await sgMail.send(msg);
        console.log('Mensaje enviado correctamente.');
        return res.status(200).json(req.body).end();
    } catch (error) {
        console.error('Ocurrió un error al enviar el mensaje:', error);
        return res.status(500).end();
    }
};







//Revisar eso
//comentario
/*export const readHookPush = async (req, res) => {
    //const { head_commit } = req.body; // obtener solo el objeto head_commit del body
    //const { id, message, timestamp, url, author, committer, added, removed, modified } = head_commit; // desestructurar los datos del objeto head_commit

    console.log("Conectado"); // imprimir los datos filtrados

    res.status(200).json({ success: true }).end();
};*/



export const readHookIssues = async (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body).end();
};


/*
import sgMail from '@sendgrid/mail';

export const msg = async (req, res) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'cristhianperezroncal@gmail.com', // Change to your recipient
        from: 'suarezmontezacristhian@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    res.status(200).json(JSON.stringify(req.body, null, 2)).end();
}

*/


/*
import sgMail from '@sendgrid/mail';

export const readHookPush = async (req, res) => {
    console.log(req.body);

    // enviar correo electrónico usando SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'suarezmontezacristhian@gmail.com',
        from: 'suarezmontezacristhian@gmail.com',
        subject: 'Notificación de lectura de hooks',
        text: JSON.stringify(req.body, null, 2),
    };
    await sgMail.send(msg)
                .then(() => {
                        console.log('Email sent')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
    // enviar respuesta HTTP al cliente
    res.status(200).json(JSON.stringify(req.body, null, 2)).end();
};
*/

