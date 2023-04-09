
/*export const readHooks = async (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body).end();
};*/

export const readHooks = async (req, res) => {
    const { head_commit } = req.body; // obtener solo el objeto head_commit del body
    const { id, message, timestamp, url, author, committer, added, removed, modified } = head_commit; // desestructurar los datos del objeto head_commit

    console.log({ id, message, timestamp, url, author, committer, added, removed, modified }); // imprimir los datos filtrados

    res.status(200).json({ success: true }).end();
};






/*
import sgMail from '@sendgrid/mail';

export const readHooks = async (req, res) => {
    console.log(req.body);

    // enviar correo electrónico usando SendGrid
    sgMail.setApiKey('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');
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