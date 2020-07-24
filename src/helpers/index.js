export const getFormattedString = (text) => {
    let formattedString = text;
    formattedString = formattedString.replace(/&quot;/g, '"');
    formattedString = formattedString.replace(/&amp;/g, '&');
    formattedString = formattedString.replace(/&lt;/g, '<');
    formattedString = formattedString.replace(/&gt;/g, '>');
    formattedString = formattedString.replace(/&#039;/g, "'");
    formattedString = formattedString.replace(/<[^>]+>/g, '');
    return formattedString;
}