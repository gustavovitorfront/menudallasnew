export default (req, res) => {
    const { subdomain } = req.query;

    if (subdomain) {
        res.status(200).json({ subdomain });
    } else {
        res.status(200).json({ subdomain: 123 });
    }
};
