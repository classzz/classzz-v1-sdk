export const czzAsync = () => {
    const state = {
        stat: "idle",
        data: null,
        error: null,
    };

    const setData = (data) => {
        state.data = data
        state.stat = "success"
        state.error = null
    }

    const setError = (error) => {
        state.data = null
        state.stat = "error"
        state.error = error
    }

    const run = (promise) => {
        if (!promise || !promise.then) {
            throw new Error("Must be Promise Type");
        }
        return promise
            .then((data) => {
                setData(data);
                return {
                    isIdle: state.stat === "idle",
                    isLoading: state.stat === "loading",
                    isError: state.stat === "error",
                    isSuccess: state.stat === "success",
                    ...state,
                };
            })
            .catch((error) => {
                setError(error);
                return {
                    isIdle: state.stat === "idle",
                    isLoading: state.stat === "loading",
                    isError: state.stat === "error",
                    isSuccess: state.stat === "success",
                    ...state,
                };
            });
    };

    return { run };
};
