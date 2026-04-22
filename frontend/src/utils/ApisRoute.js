const ApiRoutes = {
    AUTHS: {
        LOGIN: "/auth/login",
        SIGNUP: "/auth/signup",
        LOGOUT: "/auth/logout",
        CHECKAUTH: "/auth/check",
    },
    Canididate: {
        PROFILE: "/candidate/profile",
    },
    Manifesto: {
        create: "/manifesto/create",
        my: "/manifesto/my-manifesto",
        update: "/manifesto/update",
        delete: "/manifesto/delete",
    },
    Application: {
        APPLY: "/application/apply",
        MY_APPLICATIONS: "/application/my-applications",
    },
    Election:{
        ALL_ELECTION:"/election/all-election",
        ALL_ELECTIONBYId:(adminId)=>`/election/all-election/${adminId}`
    }

};

export default ApiRoutes;