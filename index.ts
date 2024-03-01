import moment from 'moment';
import notie from 'notie';

export const getLocalStorage = (name: string) =>
    localStorage.getItem(name)

export const setLocalStorage = (name: string, data: string) =>
    localStorage.setItem(name, data);

export const removeLocalStorage = (name: string) =>
    localStorage.removeItem(name);

export const clearLocalStorage = () => localStorage.clear();

export const isValidArray = <T>(data: T[]): boolean =>
    data && data?.length > 0 && Array.isArray(data);

export const isValidObject = (data: object) =>
    data && Object.keys(data)?.length > 0;

export const convertJsonToParse = <T>(data: string): T => JSON.parse(data) as T;

export const convertJsonToStringify = <T>(data: T): string =>
    JSON.stringify(data);

export const PAGINATION_LIMIT_PAGE = 30

export const PAGINATION_LIMIT_PAGE_100 = 100

export const EMAIL_REGX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
export const NAME_REGX = /^(?=.*[a-z])[a-z\s.'-]+$/i
export const PASSWORD_REGX = /^.{6,}$/

export const PROVIDER = "PROVIDER"

export const setCookie = (name: string, value: string, days: number): void => {
    const expires: Date = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const cookie: string = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    document.cookie = cookie;
}

export const getCookie = (name: string): string | null => {
    const cookies: string[] = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie: string = cookies[i].trim();
        const cookieParts: string[] = cookie.split('=');
        if (cookieParts[0] === name) {
            return cookieParts[1];
        }
    }
    return null;
}

export const removeCookie = (name: string): void => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

export const DATE_DAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]



export const getWatchTime = (courses: any, total_time = false) => {
    let seconds = 0;
    let totalTime;
    if (Array.isArray(courses)) {
        //for Array values
        courses.forEach((element: any) => {
            seconds = seconds + element.lesson_duration_seconds
        });
    } else {
        //for Single value
        seconds = seconds + courses
    }

    if (seconds < 3600) {
        const a = Math.floor(seconds / 60); //minutes
        const b = seconds % 60; //seconds

        if (Array.isArray(courses)) {
            return `${a}m`
        } else {
            const min = a < 10 ? `0${a}` : `${a}`
            const sec = b < 10 ? `0${b}` : `${b}`
            return `${min}:${sec}`
        }
    } else {
        const a = Math.floor(seconds / 3600); //hours
        const x = seconds % 3600;
        const b = Math.floor(x / 60); //minutes
        const c = seconds % 60; //seconds

        if (Array.isArray(courses)) {
            const houre = a < 10 ? `0${a}h` : `${a}h`
            const min = b < 10 ? `0${b}m` : `${b}m`
            return `${houre} ${min}`
        } else {
            if (total_time === true) {
                const houre = a < 10 ? `0${a}` : `${a}`
                const min = b < 10 ? `0${b}` : `${b}`
                const sec = c < 10 ? `0${c}` : `${c}`
                return `${houre}h ${min}m`
            } else {

                const houre = a < 10 ? `0${a}` : `${a}`
                const min = b < 10 ? `0${b}` : `${b}`
                const sec = c < 10 ? `0${c}` : `${c}`
                return `${houre}:${min}:${sec}`
            }
        }

    }
}


export const getCustomDate = (date: Date): string => {
    const event = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate: string = event.toLocaleDateString('en-US', options);
    return formattedDate;
};

export const nFormatter = (num: number) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}


export const getReviewPercentage = (review: number, totlaReview: number) => {
    return (review / totlaReview) * 100
}


export const getReviewRecommend = (reviews: any) => {
    let isYes = 0
    let isNo = 0

    reviews.forEach((item: any) => {
        if (item.review_recommend === "Yes") {
            isYes = isYes + 1
        }

        if (item.review_recommend === "No") {
            isNo = isNo + 1
        }
    })
    return { yes: isYes, no: isNo, yesPercentage: getReviewPercentage(+isYes, +reviews?.length), noPercentage: getReviewPercentage(+isNo, +reviews?.length) }
}

export const getFileTypeSVG = (title: string) => {

    const data = title.split(".")
    const type = data[data.length - 1]
    // if (true) {
    //     return <>
    //         <Documents_pdf/><>
    // }
    return type

}

export const getWidth = (data: any, per: number = 0) => {
    if (Object.keys(data).length > 0) {
        if ((data.start) && (data.completed_lessons) && (!data.uploaded_project) && (!data.certificate)) {
            const percentage = (33.33 * per) / 100
            console.log("per==>", percentage)
            return `${parseInt(`${percentage}`)}%`
        } if ((data.start) && (data.completed_lessons) && (data.uploaded_project) && (!data.certificate)) {
            return "66.66%"
        } else if ((data.start) && (data.completed_lessons) && (data.uploaded_project) && (data.certificate)) {
            return "100%"
        }
    } else {
        return "0%"
    }
}

export const convertToFaqData = (data: object[], valueKey: string, titleKey: string) =>
    data?.map((d) => {
        return {
            title: d[titleKey as keyof typeof d],
            value: d[valueKey as keyof typeof d]
        };
    });


export const convertToSelectOptions = (data: object[], valueKey: string, titleKey: string) =>
    data?.map((d) => {
        return {
            value: d[valueKey as keyof typeof d],
            label: d[titleKey as keyof typeof d]
        };
    });


export const getQueryData = (name: string): string => window.location.search?.split("&").filter((d: string) => d?.includes(name))[0]?.split(`${name}=`)?.find((d: string) => d?.length > 2) + ""

export const isWithin15Days = (dateToCheck: string): boolean => {
    const currentDate = moment()
    const checkDate = moment(dateToCheck)
    const daysDifference = currentDate.diff(checkDate, 'days')
    return daysDifference <= 15
}

export const getErrorData = (error: any, filedName: string): any => (error?.response?.data.message || [])?.find((d: any) => d?.field === filedName)

export const getParams = (obj: { [key: string]: string | number | null }): string => {
    const queryParams = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (value !== null && value !== undefined) {
                queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        }
    }

    return queryParams.join('&');
}

export const getNotieMessage = (type: "success" | "warning" | "error" | "info" | "neutral", message: string, time?: number) => {
    notie.alert({
        type: type,
        text: message,
        time: time || 5
    });

    const notificationContainer: any = document.querySelector('.notie-container');
    if (notificationContainer) {
        notificationContainer.style.height = '20px';
        notificationContainer.style.height = '20px';
    }

    const notificationText: any = document.querySelector('.notie-text');
    if (notificationText) {
        notificationText.style.fontSize = '18px';
    }

    const textboxInner: any = document.querySelector('.notie-textbox-inner');
    if (textboxInner) {
        textboxInner.style.margin = '-13px auto';
        textboxInner.style.fontSize = '17px';
        textboxInner.style.maxWidth = '900px';
    }
}

export const getNotieMessageWithBtn = (type: "success" | "warning" | "error" | "info" | "neutral", message: string, handleChange: () => void, cancelCallbackOptional: () => void) => {
    notie.confirm({
        text: message,
        submitText: "Verify Account", // optional, default = 'Yes'
        cancelText: "Cancel", // optional, default = 'Cancel'
        position: "top", // optional, default = 'top', enum: ['top', 'bottom']
        submitCallback: handleChange, // optional
        cancelCallback: cancelCallbackOptional // optional
    }, handleChange, cancelCallbackOptional)

}

export const timeSince = (date: any) => {
    var a = moment(); //now
    var b = moment.utc(date);
    const sec = a.diff(b, 'seconds');
    const minuts = a.diff(b, 'minutes');
    const hours = a.diff(b, 'hours');
    const days = a.diff(b, 'days');
    const months = a.diff(b, 'months');
    const years = a.diff(b, 'year');
    return years === 0 ?
        months == 0
            ? days == 0
                ? hours == 0
                    ? minuts == 0
                        ? sec >= 0 && `${sec}s ago`
                        : `${minuts}m ago`
                    : `${hours}h ago`
                : `${days}d ago`
            : `${months}months ago`
        : `${years} year ago`
}


