export class Cookies {
    //Checks if cookies have been accepted
    public static areAccepted() {
        if (localStorage.getItem("cookies") == "accepted") {
            //Check validity of cookies
            if (!localStorage.getItem("cookies-date")) return false;
            const date = Number.parseInt(localStorage.getItem("cookies-date"));
            const now = new Date().getTime();
            if ((now - date)>15552000000)  return false; //1000*60*60*24*180 = 6 months
            return true;
        }
        return false;
    }
    public static accept() {
        localStorage.setItem('cookies','accepted');
        localStorage.setItem('cookies-date', new Date().getTime().toString())
    }

    public static refuse() {
        localStorage.clear();
    }
}