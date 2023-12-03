export default (req, res) => {
    const subdomain = req.headers.host.split('.')[0];
    
    if (subdomain) {
        res.status(200).json({ subdomain });
    } else {
        res.status(200).json({ subdomain: null });
    }
};
