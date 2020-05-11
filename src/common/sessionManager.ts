export default class SessionManager {

    private static session: string = null;

    static getSession() {
        return this.session ? this.session : 'Guest'
    }

    static setSession(data) {
        this.session=data;
    }
}
