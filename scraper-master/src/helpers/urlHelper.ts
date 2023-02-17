const urlHelper = {
    urlDetail: (url: string) => {
        return (new URL(url));
    },
    isValidURL: (url: string) => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
        return !!urlPattern.test(url);
    },
    isNpDomain: (url: string) => {
        if (urlHelper.isValidURL(url)) {
            let details = urlHelper.urlDetail(url);
            let ext = details.hostname.substring(details.hostname.length - 3);
            if (ext === ".np") return details;
        }
        return false;
    }
}
export default urlHelper;