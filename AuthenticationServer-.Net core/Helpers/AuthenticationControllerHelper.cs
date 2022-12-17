namespace AuthenticationServer_.Net_core.Helpers
{
    public class ControllerHelper
    {
        public bool CheckPasswordConfirm(string passwordDto, string passwordConfirm)
        {
            if (passwordDto != passwordConfirm) return false;
            return true;
        }

        public CookieOptions SetCookieOptionsHttpOnlyToTrue()
        {
            return new CookieOptions { HttpOnly = true };
        }
    }
}
