
export const readHooks = async (req, res) => {
    console.log(req.body);
    res.status(200).json(JSON.stringify(req.body, null, 2)).end();
};
