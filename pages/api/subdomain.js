export default (req, res) => {
    const host = req.headers.host;
    const parts = host.split('.');

    if (parts.length > 1) {
        const subdomain = parts[0];
        res.status(200).json({ subdomain });
    } else {
        res.status(200).json({ subdomain: null });
    }
};