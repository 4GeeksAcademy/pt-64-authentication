const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      token: sessionStorage.getItem("token"),
      user: "",
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      signup: async (user_email, user_password) => {
        let response = await fetch(process.env.BACKEND_URL + "/api/signup", {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user_email,
            password: user_password,
          }),
          method: "POST",
        });
        let data = await response.json();
        console.log(data);
      },
      // [{}.{},{}] <--- json
      userLogin: async (user_email, user_password) => {
        let response = await fetch(process.env.BACKEND_URL + "/api/login", {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user_email,
            password: user_password,
          }),
          method: "POST",
        });
        let data = await response.json();
        sessionStorage.setItem("token", data);
      },
      getUser: async () => {
        let store = getStore();
        let response = await fetch(process.env.BACKEND_URL + "/api/get-user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + store.token,
          },
          method: "GET",
        });
        let data = await response.json();

        setStore({ user: data });
      },
    },
  };
};

export default getState;
