
/*export const readHookPush = async (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body).end();
};*/

export const readHookPush = async (req, res) => {
    const { head_commit } = req.body; // obtener solo el objeto head_commit del body
    const { id, message, timestamp, url, author, committer, added, removed, modified } = head_commit; // desestructurar los datos del objeto head_commit

    console.log({ id, message, timestamp, url, author, committer, added, removed, modified }); // imprimir los datos filtrados

    res.status(200).json({ success: true }).end();
};

export const readHookIssues = async (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body).end();
};




/*
import sgMail from '@sendgrid/mail';

export const readHookPush = async (req, res) => {
    console.log(req.body);

    // enviar correo electrónico usando SendGrid
    sgMail.setApiKey('');
    const msg = {
        to: 'suarezmontezacristhian@gmail.com',
        from: 'suarezmontezacristhian@gmail.com',
        subject: 'Notificación de lectura de hooks',
        text: JSON.stringify(req.body, null, 2),
    };
    await sgMail.send(msg);
    // enviar respuesta HTTP al cliente
    res.status(200).json(JSON.stringify(req.body, null, 2)).end();
};
*/