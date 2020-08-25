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

export const getFormattedError = (text) => {
    let formattedString = text;
    formattedString = formattedString.replace(/&quot;/g, '"');
    formattedString = formattedString.replace(/&amp;/g, '&');
    formattedString = formattedString.replace(/&lt;/g, '<');
    formattedString = formattedString.replace(/&gt;/g, '>');
    formattedString = formattedString.replace(/&#039;/g, "'");
    formattedString = formattedString.replace(/<[^>]+>/g, '');
    formattedString = formattedString.replace(/{[^>]+}/g, '');
    return formattedString;
}

export const formatList = (list) => {
    return list.map((item) => {
      return ({
        ...item,
        label: item.name,
        value: item.sortname
      })
    })
  }

  export const validateEmail = (text) => {
    let pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    if (pattern.test(text)) {
        return false;
    } else {
        return true;
    }
  }

export const validateFormField = ( value, field, type, errorObject, extras ) => {
    if(!field || !type){
        return
    }
    let changeLabel = true

    if(extras.password) {
        // temp disabled
/*        extras.regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{1,}$/
        extras.label = 'enter_valid_password'*/
    }
    if(extras.email) {
        extras.regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        extras.label = 'Please Enter a valid Email Id'
    }

    switch(type) {
        case 'number': {
            if(Number.isNaN(value)){
                errorObject[field] = {
                    error: true,
                    label: 'not_a_number'
                }
                changeLabel = false
            } else if(extras && extras.minValue && Number(value) < extras.minValue) {
                errorObject[field] = {
                    error: true,
                    label: 'less_than_min'
                }
            } else if(extras && extras.maxValue && Number(value) > extras.maxValue) {
                errorObject[field] = {
                    error: true,
                    label: 'greater_than_max'
                }
            } else {
                delete errorObject[field]
            }
            break
        }
        case 'string': {
            if(!value.toString().length) {
                errorObject[field] = {
                    error: true,
                    label: '*required'
                }
                changeLabel = false
            } else if(extras && extras.regEx && !value.toString().match(extras.regEx)) {
                errorObject[field] = {
                    error: true,
                    label: 'not_valid'
                }
            } else if(extras && extras.maxLength && value.toString().length > extras.maxLength) {
                errorObject[field] = {
                    error: true,
                    label: 'exceeded_max_length'
                }
                if(extras.password){
                    errorObject[field].label = 'too_long_password'
                    extras.label = null
                }
            } else if(extras && extras.minLength && value.toString().length < extras.minLength) {
                errorObject[field] = {
                    error: true,
                    label: 'too_short'
                }
                if(extras.password){
                    errorObject[field].label = 'too_short_password'
                    extras.label = null
                }
            } else {
                delete errorObject[field]
            }
            break
        }
        default:
    }

    if(extras.label && errorObject[field] && changeLabel){
        errorObject[field].label = extras.label
    }

    if(extras.confirmPassword && !errorObject[field] && extras.passwordValue.length){
        if(extras.passwordValue.toString() !== value.toString()){
            errorObject[field] = {
                error: true,
                label: '*Your entered password doesnot match'
            }
        }
    }
    if(extras.confirmPassword && !value){
            errorObject[field] = {
                error: true,
                label: '*Please Re Enter your Password'
            }
    }
}