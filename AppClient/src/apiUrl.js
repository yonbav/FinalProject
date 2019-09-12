

export default {

    //Server url
    SERVER_URL: 'http://185.56.74.46:3000',
    //pdf folder
    PDF_FOLDER_NAME: "/information/",
    // login
    LOGIN: `/Auth/login`,
    // logout
    LOGOUT: `/Auth/logout`,
    // check token
    CHECK_TOKEN: `/user/token`,

    /// user ///
    // Get all users
    GET_ALL_USERS: `/user`,

    /// important message ///
    // Get all important messages
    GET_ALL_IMPORTANT_MESSAGES: `/message/`,

    /// link item ///
    // Get all link items
    GET_ALL_LINK_ITEMS: `/link/`,

    /// important info ///
    // Get all important info files
    GET_ALL_IMPORTANT_INFO: `/info/`,

    /// daily briefing ///
    // Get all daily briefing
    GET_ALL_DAILY_BRIEFINGS: `/daily/`,

    /// minhals ///

    // Get all minhals
    GET_ALL_MINHALS: `/minhal/`,

    /// guidances ///

    // Get all guidances
    GET_ALL_GUIDANCES: `/guidance/`,

    /// jobs ///
    // Get all jobs
    GET_ALL_JOBS: `/jobs/`,
}