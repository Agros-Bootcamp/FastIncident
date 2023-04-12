import twilio from 'twilio'
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//hola
export const readHookPush = async (req, res) => {
    try {
        console.log(req.body)
        const { head_commit } = req.body;
        if (!head_commit) {
            console.log('Conexión Exitosa')
            return res.status(200).end()
        };

        const { timestamp, url, committer } = head_commit;
        const formattedDate = new Date(timestamp).toLocaleString('es-PE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });

        const messageBody = `${committer?.name ?? ''} realizó un push al repositorio de ${repository.name} el ${formattedDate}, puedes revisarlo en el siguiente enlace: ${url} , detalles:\n` +
            `${commitsBody}`;

        const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
        const msgOpts = { body: messageBody, from: '+15076046986', to: '+51918635054' };
        //await client.messages.create(msgOpts);
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





export const readHookIssues = async (req, res) => {
    //
    try {



        const { action, comment, issue, repository, sender } = req.body;

        console.log(req.body)

        if (!action) {
            console.log('Conexion exitosa')
            return res.status(200).end()
        }

        console.log(action)

        const issueLabelString = issue.labels.map(label => label.name).join("   ");

        const assigneeString = issue.assignees.map(assignee => assignee.login).join("   ");

        const messageBody = `El usuario ${sender.login} ${action === 'opened' ? 'creó un nuevo' : action === 'closed' ? 'cerró el' : action === 'created' ? 'realizó un comentario en el' : 'realizó una acción en el'} Issue llamado ${issue.title}, lo puede ver en el siguiente enlace ${issue.html_url}: \n` +
            `Repositorio: ${repository.name}\n` +
            `Asignado a: ${assigneeString}\n` +
            `Etiqueta(s): ${issueLabelString}\n` +
            `Comentario: ${action === 'created' ? comment.body : issue.body}\n` +
            `Creado por: ${issue.user.login}\n` +
            `Issue número: ${issue.number}\n` +
            `Número de comentarios: ${issue.comments}\n` +
            `Issues abiertos: ${repository.open_issues}\n`;

        console.log(messageBody);

        const msg = {
            to: ['cristhianperezroncal@gmail.com', 'dariof_0504@hotmail.com'],
            from: 'suarezmontezacristhian@gmail.com',
            subject: 'Notificación de Webhook de Github',
            text: messageBody,
            html: `<p>${messageBody}</p>`
        };
        await sgMail.send(msg);
        console.log('Mensaje enviado correctamente.');
        /*const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
    
        await client.messages.create({
            body: message,
            from: '+15076046986',
            to: '+51918635054'
        });*/

        res.status(200).json(req.body).end();

    } catch (error) {
        console.error('Ocurrió un error al enviar el mensaje:', error);
        return res.status(500).end();
    }



};

//comentario