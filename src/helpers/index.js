export const getFormattedString = (text) => {
    let formattedString = text;
    let regex = /(http|ftp|https):\/\/([\w\-_]+(?:(?:\.[\w\-_]+)+))([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
    let url = formattedString.match(regex);
    if(url) {
        formattedString = url[0]
        formattedString = formattedString.replace(/&quot;/g, '');
    }
    formattedString = formattedString.replace(/&quot;/g, '"');
    formattedString = formattedString.replace(/&amp;/g, '&');
    formattedString = formattedString.replace(/&lt;/g, '<');
    formattedString = formattedString.replace(/&gt;/g, '>');
    formattedString = formattedString.replace(/&#039;/g, "'");
    formattedString = formattedString.replace(/<[^>]+>/g, '');
    return formattedString;
}