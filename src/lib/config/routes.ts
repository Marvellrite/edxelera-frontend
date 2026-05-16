const ROUTES = {
    public: [
        '/',
        '/auth',
        '/auth/sign-up',
        '/auth/forgetten-password',
        '/auth/',
        '/terms-of-service',
        '/privacy-policy',



    ],

    protectedPrefixes:[
        '/home',
        '/instructor',
        '/admin',
    ],

    auth:{
        signUp: '/auth/sign-up',
        signIn: '/auth/sign-in',
        verifyEmail: '/auth/verfy-email',
        forgottenPassword: '/auth/forgotten-password',
        onboarding: '/auth/onboarding',
    },

    authRedirect: '/auth/login',

    unauthorized: '/unauthorized',

    onboardingRedirect: '/auth/onboarding',

    roleHome: {
        student: '/home',
        instructor: '/instructor',
        admin: '/admin'
    }

} as const

export default ROUTES;