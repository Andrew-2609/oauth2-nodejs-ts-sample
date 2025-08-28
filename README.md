# OAuth 2.0 + Open ID Connect Sample using Auth0

This project puts in practice the core concepts of [OAuth 2.0](https://oauth.net/2/) to handle access control with external authorization services, and [Open ID Connect (OIDC)](https://openid.net/developers/how-connect-works/) for authentication and seamless interoperability.

This is a very simple version, and as the authorization server I picked [Auth0](https://auth0.com/) due to its simplicity and straightforward hands-on (and it's for free! At least for small projects like this).

---

## How to test it

Wait! Before continuing, pay attention to these **prerequisites**!

- This project requires NodeJS `22.x`
- Not a prerequisite, but I haven't tested it on Windows, so please let me know if anything bad happens in case you're using it!

You'll need to perform the following steps if you wanna run this test on your own:

### 1. Set Up Your Auth0 Account

1. Sign up for a free Auth0 account: Go to the Auth0 website and create a free account. No credit card is needed.

2. Create an Application: Once you're in your Auth0 dashboard, navigate to "Applications" on the left sidebar and click "Create Application."

3. Choose Application Type: Select "Single Page Application." This is the most common use case for web apps. Give it a name like "My OAuth App" and click "Create."

4. Configure Application Settings: In the settings for your new application, you'll see your Domain, Client ID, and Client Secret. These are your credentials.

5. Set Callback URL: This is the most crucial step. Under "Application URIs," find "Allowed Callback URLs." Enter the URL where Auth0 will redirect the user after they log in. For a local project, this will be http://localhost:3000/callback (or whatever port you are using). This must match the URL you use in your code.

### 2. Setup this project's environment variables and run it!!

1. Pick up the `.env.example` file as an... example, and populate it with the correct information. It's pretty intuitive! Here's how it should look like:

```plaintext
AUTH0_SECRET=A_RANDOM_LONG_STRING_AS_YOUR_SESSION_SECRET
AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
AUTH0_BASE_URL=http://localhost:5000
```

The project uses other environment variables but they are all optional. You can check them out in `.env.ts`.

2. Run `yarn` to install the dependencies
3. Run `yarn dev` and be happy!

---

## Endpoints

This project has two simple endpoints, a root one (`/`) that centralizes the login logic and automatic logout, and a `/profiles` one to check your raw user data incoming from OIDC. Both are `GET` requests and have no parameters, so there's really not much to say about it.

The `/` is also the target of the logout workflow, but currently logout is automatically done/managed by Auth0.

---

## Final Considerations

Thanks a lot for reading so far. I really hope that this project is useful to you somehow. As final considerations, you probably noticed I tried to put some DDD concepts on top of the core point of this PR, just for the sake of practicing I guess. Naturally, a presentation layer with controllers, a data layer with use cases, and an actual persistent (or at least distributed in-memory) database would also be required, but you probably figured that already!

As for the next steps, I'd probably add some tests with Jest.

Anyway, thanks!!!
