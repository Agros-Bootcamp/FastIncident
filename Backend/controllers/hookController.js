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

        const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
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





export const readHookIssues = async (req, res) => {

    const { action, comment, issue, repository, sender } = req.body;

    const issueLabelString = issue.labels.map(label => label.name).join("   ");

    const assigneeString = issue.assignees.map(assignee => assignee.login).join("   ");

    const message = `El usuario ${sender.login} ${action === 'opened' ? 'creó un nuevo' : action === 'closed' ? 'cerró el' : action === 'created' ? 'realizó un comentario en el' : 'realizó una acción en el'} Issue llamado ${issue.title}, lo puede ver en el siguiente enlace ${issue.html_url}: \n` +
        `Repositorio: ${repository.name}\n` +
        `Asignado a: ${assigneeString}\n` +
        `Etiqueta(s): ${issueLabelString}\n` +
        `Comentario: ${action === 'created' ? comment.body : issue.body}\n` +
        `Creado por: ${issue.user.login}\n` +
        `Issue número: ${issue.number}\n` +
        `Número de comentarios: ${issue.comments}\n` +
        `Issues abiertos: ${repository.open_issues}\n`;

    console.log(message);

    /*const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

    await client.messages.create({
        body: message,
        from: '+15076046986',
        to: '+51918635054'
    });*/

    res.status(200).json(req.body);

};



/*export const readHookIssues = async (req, res) => {

    //Extraemos los apartados que nos interesan de la peticion
    /*const { issue, repository } = req.body

    // Creamos un objeto 'Date' a partir del timestamp del commit
    const date = new Date(timestamp);

    // Configuramos las opciones para dar formato a la fecha y hora
    const options = {
        weekday: 'long', // El nombre completo del día de la semana (por ejemplo, "domingo")
        year: 'numeric', // El año con 4 dígitos (por ejemplo, "2023")
        month: 'long', // El nombre completo del mes (por ejemplo, "abril")
        day: 'numeric', // El número del día del mes (por ejemplo, "09")
        hour: 'numeric', // La hora en formato de 12 horas (por ejemplo, "03" o "11")
        minute: 'numeric' // Los minutos (por ejemplo, "05" o "37")
    };

    // Convertimos la fecha a un string con el formato configurado
    const formattedDate = date.toLocaleString('es-PE', options);

    const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

    await client.messages.create({
        body: `Ha aparecido un nuevo issue en el repositorio ${repository.name} llamado ${issue.title}, reportado por ${issue.user.login}, con fecha de ${formattedDate}`,
        from: '+15076046986',
        to: '+51918635054'
    });

    // console.log(issue.user.login)
    // console.log(issue.title)
    // console.log(repository.name)
    // console.log(issue.created_at)
const { action, comment, issue, repository, sender } = req.body



console.log(req.body)

issue.labels.forEach(label => console.log(label.name));
//issue.assignees.forEach(assignee => assignee.login);

const issueLabelNames = issue.labels.map(label => label.name);
const issueLabelString = issueLabelNames.join("   ");

//console.log(issue.assignees)
const assigneeLogins = issue.assignees.map(assignee => assignee.login);
const assigneeString = assigneeLogins.join("   ");

if (action === 'created')
    console.log(`El usuario ${sender.login} realizo un comentario en el Issue llamado ${issue.title}, lo puede ver en el siguiente enlace ${issue.html_url}: \n` +
        `Repositorio: ${repository.name}\n` +
        `Asignado a: ${assigneeString}\n` +
        `Etiqueta(s): ${issueLabelString}\n` +
        `Comentario: ${comment.body}\n` +
        `Creado por: ${issue.user.login}\n` +
        `Issue número: ${issue.number}\n` +
        `Estado del Issue: ${issue.state}\n` +
        `Número de comentarios: ${issue.comments}\n` +
        `Issues abiertos: ${repository.open_issues}\n`)
if (action === 'opened')
    console.log(`El usuario ${sender.login} creó un nuevo Issue llamado ${issue.title}, lo puede ver en el siguiente enlace ${issue.html_url}: \n` +
        `Repositorio: ${repository.name}\n` +
        `Asignado a: ${assigneeString}\n` +
        `Etiqueta(s): ${issueLabelString}\n` +
        `Comentario: ${issue.body}\n` +
        `Creado por: ${issue.user.login}\n` +
        `Issue número: ${issue.number}\n` +
        `Número de comentarios: ${issue.number}\n` +
        `Issues abiertos: ${repository.open_issues}\n`)
if (action === 'closed')
    console.log(`El usuario ${sender.login} cerró el Issue llamado ${issue.title}, lo puede ver en el siguiente enlace ${issue.html_url}: \n` +
        `Repositorio: ${repository.name}\n` +
        `Asignado a: ${assigneeString}\n` +
        `Etiqueta(s): ${issueLabelString}\n` +
        `Comentario: ${issue.body}\n` +
        `Creado por: ${issue.user.login}\n` +
        `Issue número: ${issue.number}\n` +
        `Número de comentarios: ${issue.number}\n` +
        `Issues abiertos: ${repository.open_issues}\n`)

res.status(200).json(req.body)
};*/


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

