import twilio from 'twilio'

export const readHookPush = async (req, res) => {
    try {
        // Obtenemos el objeto 'head_commit' del cuerpo de la petición
        const { head_commit } = req.body;

        // Extraemos los datos relevantes del objeto 'head_commit'
        const { id, message, timestamp, url, author, committer, added, removed, modified } = head_commit;

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

        // Mostramos los datos relevantes por consola para verificar que todo funciona correctamente
        console.log({ id, message, formattedDate, url, author, committer, added, removed, modified });

        // Enviamos el mensaje de texto con Twilio
        const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

        await client.messages.create({
            body: `${committer.name} realizó un push al repositorio de FastIncident el ${formattedDate}, puedes revisarlo en el siguiente enlace: ${url}`,
            from: '+15076046986',
            to: '+51918635054'
        });

        // Mostramos un mensaje por consola para indicar que se ha enviado el mensaje de texto correctamente
        console.log('Mensaje enviado correctamente.');

        // Respondemos con un estado 200 (OK) y el cuerpo de la petición recibida
        res.status(200).json(req.body).end();
    } catch (error) {
        // En caso de error, mostramos un mensaje por consola y respondemos con un estado 500 (Internal Server Error)
        console.error('Ocurrió un error al enviar el mensaje:', error);
        res.status(500).end();
    }
};



//Revisar eso
//comentario
/*export const readHookPush = async (req, res) => {
    const { head_commit } = req.body; // obtener solo el objeto head_commit del body
    const { id, message, timestamp, url, author, committer, added, removed, modified } = head_commit; // desestructurar los datos del objeto head_commit

    console.log({ id, message, timestamp, url, author, committer, added, removed, modified }); // imprimir los datos filtrados

    res.status(200).json({ success: true }).end();
};*/



export const readHookIssues = async (req, res) => {

    //Extraemos los apartados que nos interesan de la peticion
    const {issue, repository} = req.body

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

    res.status(200).json(req.body)
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

